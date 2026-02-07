from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime
import uuid
from enum import Enum

# Enums
class OrderType(str, Enum):
    PICKUP = "pickup"
    DELIVERY = "delivery"

class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PREPARING = "preparing"
    READY = "ready"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class PaymentMethod(str, Enum):
    ONLINE = "online"
    PAY_ON_PICKUP = "pay_on_pickup"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"

# Menu Models
class MenuModifier(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: float
    available: bool = True

class MenuItem(BaseModel):
    id: str
    name: str
    description: str
    price: float
    image: Optional[str] = None
    category: str
    popular: bool = False
    spicy: bool = False
    available: bool = True
    modifiers: List[MenuModifier] = []

# Cart Models
class CartModifier(BaseModel):
    id: str
    name: str
    price: float

class CartItem(BaseModel):
    item_id: str
    name: str
    price: float
    quantity: int
    modifiers: List[CartModifier] = []
    subtotal: float

# Order Models
class DeliveryInfo(BaseModel):
    address: str
    instructions: Optional[str] = None

class PickupInfo(BaseModel):
    pickup_time: str
    instructions: Optional[str] = None

class CustomerInfo(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None

class OrderCreate(BaseModel):
    order_type: OrderType
    customer_info: CustomerInfo
    items: List[CartItem]
    delivery_info: Optional[DeliveryInfo] = None
    pickup_info: Optional[PickupInfo] = None
    payment_method: PaymentMethod
    subtotal: float
    tax: float
    delivery_fee: float = 0.0
    total: float
    special_instructions: Optional[str] = None

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_number: str
    order_type: OrderType
    customer_info: CustomerInfo
    items: List[CartItem]
    delivery_info: Optional[DeliveryInfo] = None
    pickup_info: Optional[PickupInfo] = None
    payment_method: PaymentMethod
    payment_status: PaymentStatus = PaymentStatus.PENDING
    order_status: OrderStatus = OrderStatus.PENDING
    subtotal: float
    tax: float
    delivery_fee: float = 0.0
    total: float
    special_instructions: Optional[str] = None
    stripe_session_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Payment Transaction Model
class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    session_id: str
    amount: float
    currency: str = "usd"
    payment_status: PaymentStatus = PaymentStatus.PENDING
    metadata: Dict = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Restaurant Settings
class RestaurantSettings(BaseModel):
    accepting_orders: bool = True
    closure_message: Optional[str] = None
    estimated_prep_time: int = 30  # minutes
    delivery_enabled: bool = True
    pickup_enabled: bool = True
    min_delivery_amount: float = 15.0
    delivery_fee: float = 5.0
    tax_rate: float = 0.08  # 8%
