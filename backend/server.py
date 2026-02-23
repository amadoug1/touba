from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from fastapi.encoders import jsonable_encoder
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.gzip import GZipMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime
from typing import List
import random
import asyncio
import json
from bson import ObjectId

import stripe


# Import models
from models import (
    Order, OrderCreate, OrderStatus, PaymentStatus, PaymentMethod,
    PaymentTransaction, RestaurantSettings, MenuItem
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# Stripe API Key (kept for later; safe default for dev)
STRIPE_API_KEY = os.environ.get("STRIPE_API_KEY", "sk_test_emergent")
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
stripe.api_key = STRIPE_API_KEY

# MongoDB connection
mongo_url = os.environ.get("MONGO_URL")
db_name = os.environ.get("DB_NAME")

if not mongo_url or not db_name:
    raise RuntimeError("Missing MONGO_URL or DB_NAME in backend/.env")

client = AsyncIOMotorClient(
    mongo_url,
    serverSelectionTimeoutMS=5000,  # fail fast if DB is unreachable
    connectTimeoutMS=5000,
    socketTimeoutMS=10000,
)

db = client[db_name]

# Create app + router
app = FastAPI()
api_router = APIRouter(prefix="/api")

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# -----------------------
# Helpers
# -----------------------

def generate_order_number():
    """Generate a unique order number"""
    timestamp = datetime.now().strftime("%Y%m%d")
    random_num = random.randint(1000, 9999)
    return f"TOB-{timestamp}-{random_num}"

# -----------------------
# MENU ENDPOINTS
# -----------------------

@api_router.get("/menu/full", response_model=List[MenuItem])
async def get_full_menu():
    try:
        raw_items = await db.menu_items.find().to_list(1000)

        cleaned = []
        for item in raw_items:
            if "_id" in item:
                item["id"] = str(item["_id"])
                item.pop("_id", None)
            # Backward compatibility: some records use image_url instead of image.
            if not item.get("image") and item.get("image_url"):
                item["image"] = item["image_url"]
            cleaned.append(MenuItem(**item))

        return cleaned
    except Exception as e:
        logger.exception("Error fetching menu")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.get("/menu/category/{category}", response_model=List[MenuItem])
async def get_menu_by_category(category: str):
    """Get menu items by category"""
    try:
        menu_items = await db.menu_items.find({"category": category}).to_list(1000)

        cleaned = []
        for item in menu_items:
            if "_id" in item:
                item["id"] = str(item["_id"])
                item.pop("_id", None)
            if not item.get("image") and item.get("image_url"):
                item["image"] = item["image_url"]
            cleaned.append(MenuItem(**item))

        return cleaned

    except Exception as e:
        logger.error(f"Error fetching category menu: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch menu")

# -----------------------
# RESTAURANT SETTINGS
# -----------------------

@api_router.get("/restaurant/settings", response_model=RestaurantSettings)
async def get_restaurant_settings():
    """Get current restaurant settings"""
    try:
        settings = await db.restaurant_settings.find_one()
        if not settings:
            default_settings = RestaurantSettings()
            await db.restaurant_settings.insert_one(jsonable_encoder(default_settings))
            return default_settings
        return RestaurantSettings(**settings)
    except Exception as e:
        logger.error(f"Error fetching settings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch settings")


@api_router.put("/restaurant/settings")
async def update_restaurant_settings(settings: RestaurantSettings):
    """Update restaurant settings (admin only - no auth for MVP)"""
    try:
        await db.restaurant_settings.update_one(
            {},
            {"$set": jsonable_encoder(settings)},
            upsert=True,
        )
        return {"message": "Settings updated successfully"}
    except Exception as e:
        logger.error(f"Error updating settings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update settings")


# -----------------------
# ORDER ENDPOINTS
# -----------------------

@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate):
    logger.info(f"Incoming order payload: {order_data.dict()}")
    try:
        logger.info("create_order: received request")

        settings = await get_restaurant_settings()

        if not settings.accepting_orders:
            raise HTTPException(
                status_code=503,
                detail=settings.closure_message or "We are currently not accepting orders",
            )

        if order_data.order_type == "delivery" and not settings.delivery_enabled:
            raise HTTPException(status_code=400, detail="Delivery is currently unavailable")

        if order_data.order_type == "pickup" and not settings.pickup_enabled:
            raise HTTPException(status_code=400, detail="Pickup is currently unavailable")

        order = Order(
            order_number=generate_order_number(),
            **order_data.dict(),
        )
        
        logger.info("create_order: inserting order into MongoDB...")
        result = await asyncio.wait_for(
            db.orders.insert_one(jsonable_encoder(order)),
            timeout=10,
        )

        logger.info("create_order: MongoDB insert completed")

        # attach id so the response model has it
        order.id = str(result.inserted_id)

        return order

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create order")


@api_router.get("/orders/number/{order_number}", response_model=Order)
async def get_order_by_number(order_number: str):
    """Get order by order number"""
    try:
        order = await db.orders.find_one({"order_number": order_number})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")

        # Convert Mongo _id to id for Pydantic
        order["id"] = str(order["_id"])
        order.pop("_id", None)

        return Order(**order)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching order: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch order")


# -----------------------
# STRIPE ENDPOINTS
# -----------------------

@api_router.post("/payment/checkout")
async def create_checkout_session(request: Request):
    if not STRIPE_API_KEY or STRIPE_API_KEY.startswith("sk_test_emergent"):
        raise HTTPException(status_code=503, detail="Stripe is not configured yet.")

    payload = await request.json()
    order_id = payload.get("order_id")
    origin_url = payload.get("origin_url")

    if not order_id:
        raise HTTPException(status_code=400, detail="Missing order_id")
    if not origin_url:
        raise HTTPException(status_code=400, detail="Missing origin_url")

    order = None
    if ObjectId.is_valid(order_id):
        order = await db.orders.find_one({"_id": ObjectId(order_id)})
    if not order:
        order = await db.orders.find_one({"id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    items = order.get("items", [])
    if not items:
        raise HTTPException(status_code=400, detail="Order has no items")

    line_items = []
    for item in items:
        quantity = int(item.get("quantity", 1) or 1)
        subtotal = float(item.get("subtotal", 0) or 0)
        if quantity < 1:
            quantity = 1

        unit_amount = int(round((subtotal / quantity) * 100))
        if unit_amount <= 0:
            unit_amount = int(round(float(item.get("price", 0)) * 100))
        if unit_amount <= 0:
            continue

        line_items.append(
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": item.get("name", "Menu Item")},
                    "unit_amount": unit_amount,
                },
                "quantity": quantity,
            }
        )

    tax = float(order.get("tax", 0) or 0)
    delivery_fee = float(order.get("delivery_fee", 0) or 0)
    if tax > 0:
        line_items.append(
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "Tax"},
                    "unit_amount": int(round(tax * 100)),
                },
                "quantity": 1,
            }
        )
    if delivery_fee > 0:
        line_items.append(
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "Delivery Fee"},
                    "unit_amount": int(round(delivery_fee * 100)),
                },
                "quantity": 1,
            }
        )

    if not line_items:
        raise HTTPException(status_code=400, detail="Order total is invalid")

    success_url = f"{origin_url}/?checkout=success&session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin_url}/?checkout=cancelled"

    customer_email = (order.get("customer_info") or {}).get("email")
    session = stripe.checkout.Session.create(
        mode="payment",
        line_items=line_items,
        success_url=success_url,
        cancel_url=cancel_url,
        customer_email=customer_email or None,
        payment_method_types=["card"],
        billing_address_collection="auto",
        metadata={
            "order_id": str(order.get("_id")),
            "order_number": order.get("order_number", ""),
        },
    )

    await db.orders.update_one(
        {"_id": order["_id"]},
        {
            "$set": {
                "payment_method": PaymentMethod.STRIPE.value,
                "stripe_session_id": session.id,
                "payment_status": PaymentStatus.PENDING.value,
                "updated_at": datetime.utcnow(),
            }
        },
    )

    return {"checkout_url": session.url, "session_id": session.id}


@api_router.get("/payment/status/{session_id}")
async def get_payment_status(session_id: str, request: Request):
    if not STRIPE_API_KEY or STRIPE_API_KEY.startswith("sk_test_emergent"):
        raise HTTPException(status_code=503, detail="Stripe is not configured yet.")

    session = stripe.checkout.Session.retrieve(session_id)
    stripe_payment_status = session.get("payment_status", "unpaid")
    paid = stripe_payment_status == "paid"

    order_id = (session.get("metadata") or {}).get("order_id")
    order_number = (session.get("metadata") or {}).get("order_number")
    if order_id and ObjectId.is_valid(order_id):
        await db.orders.update_one(
            {"_id": ObjectId(order_id)},
            {
                "$set": {
                    "payment_status": PaymentStatus.PAID.value if paid else PaymentStatus.PENDING.value,
                    "order_status": OrderStatus.CONFIRMED.value if paid else OrderStatus.PENDING.value,
                    "updated_at": datetime.utcnow(),
                }
            },
        )

    return {
        "session_id": session_id,
        "payment_status": stripe_payment_status,
        "paid": paid,
        "order_number": order_number,
    }


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    if not STRIPE_API_KEY or STRIPE_API_KEY.startswith("sk_test_emergent"):
        raise HTTPException(status_code=503, detail="Stripe is not configured yet.")

    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        if STRIPE_WEBHOOK_SECRET:
            event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
        else:
            event = json.loads(payload.decode("utf-8"))
    except Exception as e:
        logger.error(f"Webhook parse/signature error: {str(e)}")
        raise HTTPException(status_code=400, detail="Invalid Stripe webhook payload")

    event_type = event.get("type")
    data_obj = (event.get("data") or {}).get("object", {})
    metadata = data_obj.get("metadata") or {}
    order_id = metadata.get("order_id")

    if order_id and ObjectId.is_valid(order_id):
        if event_type == "checkout.session.completed":
            await db.orders.update_one(
                {"_id": ObjectId(order_id)},
                {
                    "$set": {
                        "payment_status": PaymentStatus.PAID.value,
                        "order_status": OrderStatus.CONFIRMED.value,
                        "updated_at": datetime.utcnow(),
                    }
                },
            )
        elif event_type in ("checkout.session.expired", "checkout.session.async_payment_failed"):
            await db.orders.update_one(
                {"_id": ObjectId(order_id)},
                {
                    "$set": {
                        "payment_status": PaymentStatus.FAILED.value,
                        "updated_at": datetime.utcnow(),
                    }
                },
            )

    return {"received": True}

# -----------------------
# ROOT
# -----------------------

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Attach router + middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Compress API responses to reduce payload transfer time over mobile networks.
app.add_middleware(
    GZipMiddleware,
    minimum_size=1024,
    compresslevel=5,
)


@app.middleware("http")
async def add_cache_headers(request: Request, call_next):
    response: Response = await call_next(request)
    path = request.url.path

    # Cache stable menu/settings responses briefly to lower repeat API latency.
    if path in ("/api/menu/full", "/api/restaurant/settings") or path.startswith("/api/menu/category/"):
        response.headers["Cache-Control"] = "public, max-age=120, stale-while-revalidate=300"
    # Never cache order/payment data.
    elif path.startswith("/api/orders") or path.startswith("/api/payment") or path.startswith("/api/webhook"):
        response.headers["Cache-Control"] = "no-store"

    return response

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
