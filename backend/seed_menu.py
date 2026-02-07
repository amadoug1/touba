"""
Seed script to populate the menu with items and modifiers
Run with: python seed_menu.py
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']

# Menu data with modifiers
MENU_DATA = [
    # Rice Dishes
    {
        "id": "thieboudienne",
        "name": "Thieboudienne",
        "description": "Senegalese national dish - flavorful fish and rice with vegetables, tomato sauce, and aromatic spices",
        "price": 18.99,
        "image": "https://images.unsplash.com/photo-1665332195309-9d75071138f0",
        "category": "rice-dishes",
        "popular": True,
        "spicy": False,
        "available": True,
        "modifiers": [
            {"id": "extra-fish", "name": "Extra Fish", "price": 5.00, "available": True},
            {"id": "mild-spice", "name": "Mild Spice Level", "price": 0.00, "available": True},
            {"id": "medium-spice", "name": "Medium Spice Level", "price": 0.00, "available": True},
            {"id": "hot-spice", "name": "Hot Spice Level", "price": 0.00, "available": True},
        ]
    },
    {
        "id": "jollof-rice",
        "name": "Jollof Rice",
        "description": "West African one-pot rice dish cooked in rich tomato sauce with bell peppers and onions",
        "price": 14.99,
        "image": "https://images.unsplash.com/photo-1664992960082-0ea299a9c53e",
        "category": "rice-dishes",
        "popular": True,
        "spicy": True,
        "available": True,
        "modifiers": [
            {"id": "add-chicken", "name": "Add Grilled Chicken", "price": 4.00, "available": True},
            {"id": "add-beef", "name": "Add Beef", "price": 5.00, "available": True},
            {"id": "extra-vegetables", "name": "Extra Vegetables", "price": 2.00, "available": True},
        ]
    },
    {
        "id": "jollof-chicken",
        "name": "Jollof Rice with Chicken",
        "description": "Our signature jollof rice served with tender grilled chicken",
        "price": 16.99,
        "image": "https://images.unsplash.com/photo-1664993101841-036f189719b6",
        "category": "rice-dishes",
        "popular": False,
        "spicy": True,
        "available": True,
        "modifiers": [
            {"id": "extra-chicken", "name": "Extra Chicken", "price": 4.00, "available": True},
            {"id": "spicy-sauce", "name": "Extra Spicy Sauce", "price": 1.00, "available": True},
        ]
    },
    
    # Meat & Fish
    {
        "id": "suya-kebab",
        "name": "Suya Kebab",
        "description": "Spicy grilled meat skewers marinated in peanut-spice blend, served with fresh vegetables",
        "price": 15.99,
        "image": "https://images.unsplash.com/photo-1765584830134-12d879ad13bd",
        "category": "meat-fish",
        "popular": True,
        "spicy": True,
        "available": True,
        "modifiers": [
            {"id": "double-portion", "name": "Double Portion", "price": 8.00, "available": True},
            {"id": "peanut-sauce", "name": "Extra Peanut Sauce", "price": 1.50, "available": True},
            {"id": "add-plantains", "name": "Add Fried Plantains", "price": 3.00, "available": True},
        ]
    },
    {
        "id": "grilled-chicken",
        "name": "Yassa Chicken",
        "description": "Marinated grilled chicken in caramelized onion and lemon sauce",
        "price": 17.99,
        "image": "https://images.unsplash.com/photo-1765584830370-085bddbf863f",
        "category": "meat-fish",
        "popular": True,
        "spicy": False,
        "available": True,
        "modifiers": [
            {"id": "extra-sauce", "name": "Extra Yassa Sauce", "price": 2.00, "available": True},
            {"id": "side-rice", "name": "Side of Rice", "price": 3.00, "available": True},
            {"id": "side-attieke", "name": "Side of Attiéké", "price": 3.50, "available": True},
        ]
    },
    {
        "id": "grilled-lamb",
        "name": "Grilled Lamb",
        "description": "Tender lamb chops grilled to perfection with African spices",
        "price": 22.99,
        "image": "https://images.unsplash.com/photo-1765584829902-51939816637c",
        "category": "meat-fish",
        "popular": False,
        "spicy": False,
        "available": True,
        "modifiers": [
            {"id": "extra-lamb", "name": "Extra Lamb Chop", "price": 8.00, "available": True},
            {"id": "mint-sauce", "name": "Mint Sauce", "price": 1.50, "available": True},
        ]
    },
    
    # Stews
    {
        "id": "mafe",
        "name": "Mafé (Peanut Stew)",
        "description": "Rich peanut butter stew with beef or chicken, carrots, and cabbage",
        "price": 16.99,
        "image": "https://images.unsplash.com/photo-1763048443535-1243379234e2",
        "category": "stews",
        "popular": True,
        "spicy": False,
        "available": True,
        "modifiers": [
            {"id": "beef-option", "name": "With Beef", "price": 0.00, "available": True},
            {"id": "chicken-option", "name": "With Chicken", "price": 0.00, "available": True},
            {"id": "extra-peanuts", "name": "Extra Peanuts", "price": 2.00, "available": True},
            {"id": "side-bread", "name": "Side of Bread", "price": 2.00, "available": True},
        ]
    },
    {
        "id": "beef-stew",
        "name": "African Beef Stew",
        "description": "Slow-cooked beef in savory tomato sauce with vegetables",
        "price": 17.99,
        "image": "https://images.unsplash.com/photo-1708782344137-21c48d98dfcc",
        "category": "stews",
        "popular": False,
        "spicy": False,
        "available": True,
        "modifiers": [
            {"id": "extra-beef", "name": "Extra Beef", "price": 5.00, "available": True},
            {"id": "side-fufu", "name": "Side of Fufu", "price": 4.00, "available": True},
        ]
    },
    {
        "id": "bean-stew",
        "name": "Bean & Meat Stew",
        "description": "Hearty beans cooked with tender meat in flavorful broth",
        "price": 14.99,
        "image": "https://images.unsplash.com/photo-1698917467449-08bcd1d9014b",
        "category": "stews",
        "popular": False,
        "spicy": False,
        "available": True,
        "modifiers": [
            {"id": "extra-beans", "name": "Extra Beans", "price": 2.00, "available": True},
        ]
    },
    
    # Sides
    {
        "id": "plantains",
        "name": "Fried Plantains",
        "description": "Sweet ripe plantains fried to golden perfection",
        "price": 5.99,
        "spicy": False,
        "category": "sides",
        "available": True,
        "modifiers": []
    },
    {
        "id": "attieke",
        "name": "Attiéké",
        "description": "Steamed cassava couscous, a West African staple",
        "price": 6.99,
        "spicy": False,
        "category": "sides",
        "available": True,
        "modifiers": []
    },
    {
        "id": "salad",
        "name": "African Salad",
        "description": "Fresh mixed greens with tomatoes, onions, and house dressing",
        "price": 7.99,
        "spicy": False,
        "category": "sides",
        "available": True,
        "modifiers": [
            {"id": "add-avocado", "name": "Add Avocado", "price": 2.50, "available": True},
        ]
    },
    
    # Drinks
    {
        "id": "bissap",
        "name": "Bissap (Hibiscus Juice)",
        "description": "Refreshing hibiscus flower drink, served cold",
        "price": 3.99,
        "spicy": False,
        "category": "drinks",
        "available": True,
        "modifiers": []
    },
    {
        "id": "ginger-juice",
        "name": "Fresh Ginger Juice",
        "description": "Homemade spicy ginger beverage",
        "price": 3.99,
        "spicy": True,
        "category": "drinks",
        "available": True,
        "modifiers": []
    },
    {
        "id": "soft-drinks",
        "name": "Soft Drinks",
        "description": "Coca-Cola, Sprite, Fanta",
        "price": 2.99,
        "spicy": False,
        "category": "drinks",
        "available": True,
        "modifiers": []
    },
]


async def seed_menu():
    """Seed the database with menu items"""
    client = AsyncIOMotorClient(mongo_url)
    db = client[DB_NAME]
    
    try:
        # Clear existing menu
        await db.menu_items.delete_many({})
        print("Cleared existing menu")
        
        # Insert new menu
        await db.menu_items.insert_many(MENU_DATA)
        print(f"Inserted {len(MENU_DATA)} menu items")
        
        # Create default restaurant settings
        settings = {
            "accepting_orders": True,
            "closure_message": None,
            "estimated_prep_time": 30,
            "delivery_enabled": True,
            "pickup_enabled": True,
            "min_delivery_amount": 15.0,
            "delivery_fee": 5.0,
            "tax_rate": 0.08
        }
        await db.restaurant_settings.delete_many({})
        await db.restaurant_settings.insert_one(settings)
        print("Created default restaurant settings")
        
        print("\n✅ Menu seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding menu: {str(e)}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(seed_menu())
