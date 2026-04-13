FROM node:18-slim AS frontend-build

WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock* ./

# Remove emergent-specific dependency not available outside Emergent
RUN sed -i '/@emergentbase/d' package.json

RUN npm install --legacy-peer-deps --ignore-scripts 2>/dev/null || npm install --legacy-peer-deps --force

COPY frontend/ .

# Replace craco config to remove emergent-only visual-edits plugin
RUN echo 'const path = require("path");\n\
module.exports = {\n\
  webpack: {\n\
    alias: { "@": path.resolve(__dirname, "src") },\n\
  },\n\
};' > craco.config.js

ENV REACT_APP_BACKEND_URL=""
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN npm run build

FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/build ./frontend/build

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8000"]
