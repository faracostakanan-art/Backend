FROM node:18 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json ./

RUN sed -i '/@emergentbase/d' package.json && \
    npm install --legacy-peer-deps && \
    npm install ajv@8.17.1 --legacy-peer-deps

COPY frontend/ .

RUN echo 'const path = require("path"); module.exports = { webpack: { alias: { "@": path.resolve(__dirname, "src") } } };' > craco.config.js

ENV REACT_APP_BACKEND_URL=""
RUN npx craco build

FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/build ./frontend/build

EXPOSE 8000
CMD ["python", "-m", "uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8000"]
