from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime
from typing import List, Optional
import random

# Import Stripe integration
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout, 
    CheckoutSessionResponse, 
    CheckoutStatusResponse, 
    CheckoutSessionRequest
)

# Import models
from models import (
    Order, OrderCreate, OrderStatus, PaymentStatus, PaymentMethod,
    PaymentTransaction, RestaurantSettings, MenuItem
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Stripe API Key
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY', 'sk_test_emergent')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============= MENU ENDPOINTS =============

@api_router.get("/menu/full", response_model=List[MenuItem])
async def get_full_menu():
    """Get the complete menu with all items and modifiers"""
    try:
        menu_items = await db.menu_items.find().to_list(1000)
        return [MenuItem(**item) for item in menu_items]
    except Exception as e:
        logger.error(f"Error fetching menu: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch menu")


@api_router.get("/menu/category/{category}")
async def get_menu_by_category(category: str):
    """Get menu items by category"""
    try:
        menu_items = await db.menu_items.find({"category": category}).to_list(1000)
        return [MenuItem(**item) for item in menu_items]
    except Exception as e:
        logger.error(f"Error fetching category menu: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch menu")


# ============= RESTAURANT SETTINGS =============

@api_router.get("/restaurant/settings", response_model=RestaurantSettings)
async def get_restaurant_settings():
    """Get current restaurant settings"""
    try:
        settings = await db.restaurant_settings.find_one()
        if not settings:
            # Create default settings
            default_settings = RestaurantSettings()
            await db.restaurant_settings.insert_one(default_settings.dict())
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
            {"$set": settings.dict()},
            upsert=True
        )
        return {"message": "Settings updated successfully"}
    except Exception as e:
        logger.error(f"Error updating settings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update settings")


# ============= ORDER ENDPOINTS =============

def generate_order_number():
    """Generate a unique order number"""
    timestamp = datetime.now().strftime("%Y%m%d")
    random_num = random.randint(1000, 9999)
    return f"TOB-{timestamp}-{random_num}"


@api_router.post("/orders", response_model=Order)
async def create_order(order_data: OrderCreate):
    """Create a new order"""
    try:
        # Check restaurant settings
        settings = await get_restaurant_settings()
        if not settings.accepting_orders:
            raise HTTPException(
                status_code=503,
                detail=settings.closure_message or "We are currently not accepting orders"
            )
        
        # Validate order type
        if order_data.order_type == "delivery" and not settings.delivery_enabled:
            raise HTTPException(status_code=400, detail="Delivery is currently unavailable")
        
        if order_data.order_type == "pickup" and not settings.pickup_enabled:
            raise HTTPException(status_code=400, detail="Pickup is currently unavailable")
        
        # Create order
        order = Order(
            order_number=generate_order_number(),
            **order_data.dict()
        )
        
        # Save to database
        await db.orders.insert_one(order.dict())
        logger.info(f"Order created: {order.order_number}")
        
        return order
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating order: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create order")


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get order by ID"""
    try:
        order = await db.orders.find_one({"id": order_id})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return Order(**order)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching order: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch order")


@api_router.get("/orders/number/{order_number}", response_model=Order)
async def get_order_by_number(order_number: str):
    """Get order by order number"""
    try:
        order = await db.orders.find_one({"order_number": order_number})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return Order(**order)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching order: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch order")


# ============= STRIPE PAYMENT ENDPOINTS =============

@api_router.post("/payment/checkout", response_model=CheckoutSessionResponse)
async def create_checkout_session(
    request: Request,
    order_id: str,
    origin_url: str
):
    """Create a Stripe checkout session for an order"""
    try:
        # Get order
        order = await db.orders.find_one({"id": order_id})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order_obj = Order(**order)
        
        # Check if already paid
        if order_obj.payment_status == PaymentStatus.PAID:
            raise HTTPException(status_code=400, detail="Order already paid")
        
        # Initialize Stripe
        host_url = str(request.base_url)
        webhook_url = f"{host_url}api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Create success and cancel URLs
        success_url = f"{origin_url}/order-confirmation?session_id={{CHECKOUT_SESSION_ID}}&order_id={order_id}"
        cancel_url = f"{origin_url}/checkout?order_id={order_id}"
        
        # Create checkout session
        checkout_request = CheckoutSessionRequest(
            amount=float(order_obj.total),  # Stripe needs float
            currency="usd",
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "order_id": order_id,
                "order_number": order_obj.order_number,
                "customer_name": order_obj.customer_info.name,
                "customer_phone": order_obj.customer_info.phone
            }
        )
        
        session = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Create payment transaction record
        transaction = PaymentTransaction(
            order_id=order_id,
            session_id=session.session_id,
            amount=float(order_obj.total),
            currency="usd",
            payment_status=PaymentStatus.PENDING,
            metadata=checkout_request.metadata
        )
        await db.payment_transactions.insert_one(transaction.dict())
        
        # Update order with session ID
        await db.orders.update_one(
            {"id": order_id},
            {"$set": {"stripe_session_id": session.session_id}}
        )
        
        logger.info(f"Checkout session created for order {order_obj.order_number}")
        return session
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create checkout session")


@api_router.get("/payment/status/{session_id}", response_model=CheckoutStatusResponse)
async def get_payment_status(session_id: str, request: Request):
    """Get payment status for a checkout session"""
    try:
        # Initialize Stripe
        host_url = str(request.base_url)
        webhook_url = f"{host_url}api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Get checkout status
        status = await stripe_checkout.get_checkout_status(session_id)
        
        # Update payment transaction
        transaction = await db.payment_transactions.find_one({"session_id": session_id})
        if transaction:
            # Check if already processed
            if transaction.get("payment_status") != "paid" and status.payment_status == "paid":
                # Update transaction
                await db.payment_transactions.update_one(
                    {"session_id": session_id},
                    {
                        "$set": {
                            "payment_status": PaymentStatus.PAID,
                            "updated_at": datetime.utcnow()
                        }
                    }
                )
                
                # Update order
                order_id = transaction.get("order_id")
                if order_id:
                    await db.orders.update_one(
                        {"id": order_id},
                        {
                            "$set": {
                                "payment_status": PaymentStatus.PAID,
                                "order_status": OrderStatus.CONFIRMED,
                                "updated_at": datetime.utcnow()
                            }
                        }
                    )
                    logger.info(f"Payment confirmed for order {order_id}")
                    
                    # TODO: Send email notification to restaurant
        
        return status
        
    except Exception as e:
        logger.error(f"Error getting payment status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get payment status")


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    try:
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        if not signature:
            raise HTTPException(status_code=400, detail="Missing stripe signature")
        
        # Initialize Stripe
        host_url = str(request.base_url)
        webhook_url = f"{host_url}api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        # Handle webhook
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        logger.info(f"Webhook received: {webhook_response.event_type}")
        
        # Handle payment success
        if webhook_response.payment_status == "paid":
            session_id = webhook_response.session_id
            
            # Update transaction and order
            transaction = await db.payment_transactions.find_one({"session_id": session_id})
            if transaction and transaction.get("payment_status") != "paid":
                await db.payment_transactions.update_one(
                    {"session_id": session_id},
                    {
                        "$set": {
                            "payment_status": PaymentStatus.PAID,
                            "updated_at": datetime.utcnow()
                        }
                    }
                )
                
                order_id = transaction.get("order_id")
                if order_id:
                    await db.orders.update_one(
                        {"id": order_id},
                        {
                            "$set": {
                                "payment_status": PaymentStatus.PAID,
                                "order_status": OrderStatus.CONFIRMED,
                                "updated_at": datetime.utcnow()
                            }
                        }
                    )
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Webhook error: {str(e)}")
        raise HTTPException(status_code=500, detail="Webhook processing failed")


# ============= ORIGINAL ENDPOINTS =============

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()