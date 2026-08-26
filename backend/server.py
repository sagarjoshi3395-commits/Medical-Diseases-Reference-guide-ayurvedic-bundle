from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import FileResponse, JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import asyncio

import razorpay

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from email_service import send_purchase_email  # noqa: E402

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Product / payment configuration
PRODUCT_NAME = os.environ.get('PRODUCT_NAME', 'Medical Reference Guide Bundle')
PRODUCT_PRICE = int(os.environ.get('PRODUCT_PRICE', '299'))  # INR rupees (flash-sale price)
PRODUCT_PRICE_REGULAR = int(os.environ.get('PRODUCT_PRICE_REGULAR', '1999'))  # INR rupees (regular price)
COUNTDOWN_SECONDS = int(os.environ.get('COUNTDOWN_SECONDS', '600'))  # 10 minutes
CURRENCY = os.environ.get('CURRENCY', 'INR')
RAZORPAY_KEY_ID = os.environ.get('RAZORPAY_KEY_ID', '').strip()
RAZORPAY_KEY_SECRET = os.environ.get('RAZORPAY_KEY_SECRET', '').strip()
ASSETS_DIR = ROOT_DIR / 'assets'
PDF_FILES = {
    "disease": ASSETS_DIR / 'diseases-reference-book.pdf',
    "medicine": ASSETS_DIR / 'medicine-reference-guide.pdf',
}

RAZORPAY_ENABLED = bool(RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET)
razor_client = None
if RAZORPAY_ENABLED:
    razor_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------------- Models ----------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    source: str = "landing_buy"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=20)
    source: Optional[str] = "landing_buy"


class OrderCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=20)
    session_started_at: Optional[str] = None  # ISO timestamp when the user's countdown began


class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


# ---------------- Routes ----------------
@api_router.get("/")
async def root():
    return {"message": "Medical Reference Guide API"}


@api_router.get("/config")
async def get_config():
    return {
        "product": PRODUCT_NAME,
        "price": PRODUCT_PRICE,
        "regular_price": PRODUCT_PRICE_REGULAR,
        "countdown_seconds": COUNTDOWN_SECONDS,
        "currency": CURRENCY,
        "razorpay_enabled": RAZORPAY_ENABLED,
        "key_id": RAZORPAY_KEY_ID if RAZORPAY_ENABLED else "",
    }


@api_router.get("/stats/recent-sales")
async def recent_sales():
    """Public marketing endpoint: number of paid orders in the last hour + a baseline."""
    baseline = int(os.environ.get('SALES_TICKER_BASELINE', '9'))
    one_hour_ago = datetime.now(timezone.utc) - timedelta(hours=1)
    real_count = await db.orders.count_documents({
        "status": "paid",
        "paid_at": {"$gte": one_hour_ago.isoformat()},
    })
    return {"count": baseline + real_count, "window_hours": 1}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in checks:
        if isinstance(c['timestamp'], str):
            c['timestamp'] = datetime.fromisoformat(c['timestamp'])
    return checks


@api_router.post("/leads", response_model=Lead)
async def create_lead(input: LeadCreate):
    lead = Lead(**input.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def get_leads():
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    return leads


@api_router.post("/payment/create-order")
async def create_order(input: OrderCreate):
    if not RAZORPAY_ENABLED:
        raise HTTPException(status_code=503, detail="Payment is not configured yet.")

    # Price is always the flat price. The countdown only drives on-page urgency;
    # it never changes what the buyer actually pays.
    effective_price = PRODUCT_PRICE
    countdown_active = False
    if input.session_started_at:
        try:
            started = datetime.fromisoformat(input.session_started_at.replace('Z', '+00:00'))
            if started.tzinfo is None:
                started = started.replace(tzinfo=timezone.utc)
            elapsed = (datetime.now(timezone.utc) - started).total_seconds()
            countdown_active = 0 <= elapsed <= COUNTDOWN_SECONDS
        except Exception:
            pass

    amount_paise = effective_price * 100
    order_uuid = str(uuid.uuid4())
    receipt = f"mrg_{order_uuid[:8]}"  # <= 40 chars
    try:
        rp_order = await asyncio.to_thread(
            razor_client.order.create,
            {
                "amount": amount_paise,
                "currency": CURRENCY,
                "receipt": receipt,
                "payment_capture": 1,
                "notes": {"product": PRODUCT_NAME, "email": input.email},
            },
        )
    except Exception as e:
        logger.error(f"Razorpay order creation failed: {e}")
        raise HTTPException(status_code=502, detail="Could not create payment order.")

    doc = {
        "id": order_uuid,
        "razorpay_order_id": rp_order["id"],
        "amount": amount_paise,
        "currency": CURRENCY,
        "name": input.name,
        "email": input.email,
        "phone": input.phone,
        "status": "created",
        "flash_sale_applied": countdown_active,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.orders.insert_one(doc)

    return {
        "order_id": order_uuid,
        "razorpay_order_id": rp_order["id"],
        "amount": amount_paise,
        "price": effective_price,
        "currency": CURRENCY,
        "key_id": RAZORPAY_KEY_ID,
        "product": PRODUCT_NAME,
        "name": input.name,
        "email": input.email,
        "phone": input.phone,
        "flash_sale_applied": countdown_active,
    }


@api_router.post("/payment/verify")
async def verify_payment(input: PaymentVerify):
    if not RAZORPAY_ENABLED:
        raise HTTPException(status_code=503, detail="Payment is not configured yet.")

    order = await db.orders.find_one({"razorpay_order_id": input.razorpay_order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")

    try:
        razor_client.utility.verify_payment_signature({
            "razorpay_order_id": input.razorpay_order_id,
            "razorpay_payment_id": input.razorpay_payment_id,
            "razorpay_signature": input.razorpay_signature,
        })
    except Exception as e:
        logger.warning(f"Signature verification failed: {e}")
        await db.orders.update_one(
            {"razorpay_order_id": input.razorpay_order_id},
            {"$set": {"status": "verification_failed"}},
        )
        raise HTTPException(status_code=400, detail="Payment verification failed.")

    download_token = str(uuid.uuid4())
    await db.orders.update_one(
        {"razorpay_order_id": input.razorpay_order_id},
        {"$set": {
            "status": "paid",
            "payment_id": input.razorpay_payment_id,
            "download_token": download_token,
            "paid_at": datetime.now(timezone.utc).isoformat(),
        }},
    )

    # Send confirmation email (non-blocking failure)
    try:
        public_base = os.environ.get('PUBLIC_BASE_URL', '').rstrip('/')
        if not public_base:
            public_base = os.environ.get('CORS_ORIGINS', '').split(',')[0].rstrip('/') or ''
        api_base = f"{public_base}/api" if public_base and not public_base.endswith('/api') else (public_base or '/api')
        disease_url = f"{api_base}/download/{order['id']}?token={download_token}&file=disease"
        medicine_url = f"{api_base}/download/{order['id']}?token={download_token}&file=medicine"
        await send_purchase_email(
            to_email=order.get("email"),
            name=order.get("name") or "",
            order_id=order["id"],
            disease_url=disease_url,
            medicine_url=medicine_url,
        )
    except Exception as e:
        logger.error(f"Post-payment email dispatch failed: {e}")

    return {
        "success": True,
        "order_id": order["id"],
        "download_token": download_token,
        "name": order.get("name"),
        "email": order.get("email"),
    }


@api_router.get("/order/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    return {
        "order_id": order["id"],
        "status": order.get("status"),
        "name": order.get("name"),
        "paid": order.get("status") == "paid",
        "pdf_available": all(p.exists() for p in PDF_FILES.values()),
        "files": list(PDF_FILES.keys()),
    }


@api_router.get("/download/{order_id}")
async def download_pdf(order_id: str, token: str, file: str = "disease"):
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    if order.get("status") != "paid":
        raise HTTPException(status_code=403, detail="Payment not completed for this order.")
    if not token or token != order.get("download_token"):
        raise HTTPException(status_code=403, detail="Invalid download token.")
    if file not in PDF_FILES:
        raise HTTPException(status_code=400, detail="Unknown file requested.")
    pdf_path = PDF_FILES[file]
    if not pdf_path.exists():
        raise HTTPException(status_code=404, detail="The guide file is being prepared. Please contact support.")
    filename_map = {
        "disease": "Diseases-Reference-Book.pdf",
        "medicine": "Medicine-Reference-Guide.pdf",
    }
    return FileResponse(str(pdf_path), media_type="application/pdf", filename=filename_map[file])


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
