FROM node:18 AS frontend-build

WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock ./

# Remove emergent-specific dependency
RUN sed -i '/@emergentbase/d' package.json
RUN yarn install --network-timeout 100000 && yarn add ajv@8.12.0

COPY frontend/ .

# Clean craco config for production
RUN echo 'const path = require("path"); module.exports = { webpack: { alias: { "@": path.resolve(__dirname, "src") } } };' > craco.config.js

ENV REACT_APP_BACKEND_URL=""
RUN yarn build

FROM python:3.11-slim

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/build ./frontend/build

EXPOSE 8000
CMD ["python", "-m", "uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8000"]
