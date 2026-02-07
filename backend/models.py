from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
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
    OUT_FOR_DELIVERY = "out_for_delivery"
    DELIVERED = "delivered"
    PICKED_UP = "picked_up"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class PaymentMethod(str, Enum):
    STRIPE = "stripe"
    ONLINE = "online"
    PAY_ON_PICKUP = "pay_on_pickup"
    CASH = "cash"

class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"

# Menu Models
class MenuModifier(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: float = 0.0
    available: bool = True
    description: Optional[str] = None

class MenuModifierGroup(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = None
    required: bool = False
    max_selections: Optional[int] = None
    modifiers: List[MenuModifier] = []

class MenuItem(BaseModel):
    id: str
    name: str
    description: str
    price: float
    image: Optional[str] = None
    image_url: Optional[str] = None  # Alternative field name
    category: str
    popular: bool = False
    spicy: bool = False
    available: bool = True
    modifiers: List[MenuModifier] = []
    modifier_groups: List[MenuModifierGroup] = []
    preparation_time: Optional[int] = None
    allergens: List[str] = []
    spice_level: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

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

class DeliveryAddress(BaseModel):
    street: str
    city: str
    state: str
    zip_code: str
    apartment: Optional[str] = None
    delivery_instructions: Optional[str] = None

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
    session_id: Optional[str] = None
    amount: float
    currency: str = "usd"
    payment_status: PaymentStatus = PaymentStatus.PENDING
    payment_method: PaymentMethod = PaymentMethod.STRIPE
    metadata: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Restaurant Settings
class BusinessHours(BaseModel):
    day: str  # monday, tuesday, etc.
    open_time: str  # "09:00"
    close_time: str  # "22:00"
    is_closed: bool = False

class RestaurantSettings(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    
    # Basic info
    restaurant_name: str = "Taste of Benin"
    phone: str = "+1-555-0123"
    email: str = "orders@tasteofbenin.com"
    
    # Address
    address: str = "123 Main Street"
    city: str = "New York"
    state: str = "NY"
    zip_code: str = "10001"
    
    # Operations
    accepting_orders: bool = True
    closure_message: Optional[str] = None
    estimated_prep_time: int = 30  # minutes
    delivery_enabled: bool = True
    pickup_enabled: bool = True
    min_delivery_amount: float = 15.0
    delivery_fee: float = 5.0
    tax_rate: float = 0.08  # 8%
    
    # Additional settings
    average_prep_time: int = 25  # minutes
    delivery_radius: float = 5.0  # miles
    minimum_delivery_amount: float = 15.00
    
    # Business hours
    business_hours: List[BusinessHours] = Field(default_factory=lambda: [
        BusinessHours(day="monday", open_time="11:00", close_time="22:00"),
        BusinessHours(day="tuesday", open_time="11:00", close_time="22:00"),
        BusinessHours(day="wednesday", open_time="11:00", close_time="22:00"),
        BusinessHours(day="thursday", open_time="11:00", close_time="22:00"),
        BusinessHours(day="friday", open_time="11:00", close_time="23:00"),
        BusinessHours(day="saturday", open_time="11:00", close_time="23:00"),
        BusinessHours(day="sunday", open_time="12:00", close_time="21:00"),
    ])
    
    # Notifications
    notification_email: str = "orders@tasteofbenin.com"
    notification_phone: Optional[str] = None
    
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Legacy Models (for existing endpoints)
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str
