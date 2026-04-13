#!/bin/bash
set -e

echo "=== Installing backend dependencies ==="
cd backend
pip install -r requirements.txt
cd ..

echo "=== Installing frontend dependencies ==="
cd frontend
npm install --legacy-peer-deps
REACT_APP_BACKEND_URL="" npm run build
cd ..

echo "=== Starting server ==="
cd backend
python -m uvicorn server:app --host 0.0.0.0 --port ${PORT:-8000}
