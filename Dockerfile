FROM node:18-slim AS frontend-build

WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock* ./
RUN npm install --legacy-peer-deps
COPY frontend/ .
ENV REACT_APP_BACKEND_URL=""
RUN npm run build

FROM python:3.11-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/build ./frontend/build

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "backend.server:app", "--host", "0.0.0.0", "--port", "8000"]
