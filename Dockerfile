FROM node:18-slim AS frontend-build

WORKDIR /app/frontend
COPY frontend/package.json frontend/yarn.lock* ./

# Remove emergent-specific dev dependency that's not available outside Emergent
RUN sed -i '/@emergentbase/d' package.json

RUN npm install --legacy-peer-deps --ignore-scripts 2>/dev/null || npm install --legacy-peer-deps --force

COPY frontend/ .

# Remove emergent visual-edits reference in craco config for production
RUN sed -i '/@emergentbase/d' craco.config.js 2>/dev/null || true

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
