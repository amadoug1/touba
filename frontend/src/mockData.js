// Mock data for Touba African Restaurant

export const menuCategories = [
  {
    id: 'rice-dishes',
    name: 'Rice Dishes',
    description: 'Authentic Senegalese rice dishes prepared with traditional spices',
    items: [
      {
        id: 'thieboudienne',
        name: 'Thieboudienne',
        description: 'Senegalese national dish - flavorful fish and rice with vegetables, tomato sauce, and aromatic spices',
        price: 18.99,
        image: 'https://images.unsplash.com/photo-1665332195309-9d75071138f0',
        popular: true,
        spicy: false
      },
      {
        id: 'jollof-rice',
        name: 'Jollof Rice',
        description: 'West African one-pot rice dish cooked in rich tomato sauce with bell peppers and onions',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1664992960082-0ea299a9c53e',
        popular: true,
        spicy: true
      },
      {
        id: 'jollof-chicken',
        name: 'Jollof Rice with Chicken',
        description: 'Our signature jollof rice served with tender grilled chicken',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1664993101841-036f189719b6',
        popular: false,
        spicy: true
      }
    ]
  },
  {
    id: 'meat-fish',
    name: 'Meat & Fish',
    description: 'Grilled and stewed meats prepared the traditional African way',
    items: [
      {
        id: 'suya-kebab',
        name: 'Suya Kebab',
        description: 'Spicy grilled meat skewers marinated in peanut-spice blend, served with fresh vegetables',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1765584830134-12d879ad13bd',
        popular: true,
        spicy: true
      },
      {
        id: 'grilled-chicken',
        name: 'Yassa Chicken',
        description: 'Marinated grilled chicken in caramelized onion and lemon sauce',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1765584830370-085bddbf863f',
        popular: true,
        spicy: false
      },
      {
        id: 'grilled-lamb',
        name: 'Grilled Lamb',
        description: 'Tender lamb chops grilled to perfection with African spices',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1765584829902-51939816637c',
        popular: false,
        spicy: false
      }
    ]
  },
  {
    id: 'stews',
    name: 'Traditional Stews',
    description: 'Hearty West African stews simmered to perfection',
    items: [
      {
        id: 'mafe',
        name: 'Mafé (Peanut Stew)',
        description: 'Rich peanut butter stew with beef or chicken, carrots, and cabbage',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1763048443535-1243379234e2',
        popular: true,
        spicy: false
      },
      {
        id: 'beef-stew',
        name: 'African Beef Stew',
        description: 'Slow-cooked beef in savory tomato sauce with vegetables',
        price: 17.99,
        image: 'https://images.unsplash.com/photo-1708782344137-21c48d98dfcc',
        popular: false,
        spicy: false
      },
      {
        id: 'bean-stew',
        name: 'Bean & Meat Stew',
        description: 'Hearty beans cooked with tender meat in flavorful broth',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1698917467449-08bcd1d9014b',
        popular: false,
        spicy: false
      }
    ]
  },
  {
    id: 'sides',
    name: 'Sides & Extras',
    description: 'Perfect accompaniments to complete your meal',
    items: [
      {
        id: 'plantains',
        name: 'Fried Plantains',
        description: 'Sweet ripe plantains fried to golden perfection',
        price: 5.99,
        spicy: false
      },
      {
        id: 'attieke',
        name: 'Attiéké',
        description: 'Steamed cassava couscous, a West African staple',
        price: 6.99,
        spicy: false
      },
      {
        id: 'salad',
        name: 'African Salad',
        description: 'Fresh mixed greens with tomatoes, onions, and house dressing',
        price: 7.99,
        spicy: false
      }
    ]
  },
  {
    id: 'drinks',
    name: 'Beverages',
    description: 'Traditional and refreshing drinks',
    items: [
      {
        id: 'bissap',
        name: 'Bissap (Hibiscus Juice)',
        description: 'Refreshing hibiscus flower drink, served cold',
        price: 3.99,
        spicy: false
      },
      {
        id: 'ginger-juice',
        name: 'Fresh Ginger Juice',
        description: 'Homemade spicy ginger beverage',
        price: 3.99,
        spicy: true
      },
      {
        id: 'soft-drinks',
        name: 'Soft Drinks',
        description: 'Coca-Cola, Sprite, Fanta',
        price: 2.99,
        spicy: false
      }
    ]
  }
];

export const restaurantInfo = {
  name: 'Touba African Restaurant',
  tagline: 'Authentic West African Flavors, Made Fresh Daily',
  phone: '(215) 403-7409',
  address: '428 W Olney Ave',
  city: 'Philadelphia',
  state: 'PA',
  zipCode: '19120',
  email: '[email protected]',
  hours: {
    monday: { open: '11:00 AM', close: '10:00 PM', closed: false },
    tuesday: { open: '11:00 AM', close: '10:00 PM', closed: false },
    wednesday: { open: '11:00 AM', close: '10:00 PM', closed: false },
    thursday: { open: '11:00 AM', close: '10:00 PM', closed: false },
    friday: { open: '11:00 AM', close: '11:00 PM', closed: false },
    saturday: { open: '12:00 PM', close: '11:00 PM', closed: false },
    sunday: { open: '12:00 PM', close: '10:00 PM', closed: false }
  },
  about: {
    title: 'Our Story',
    description: 'Touba African Restaurant brings the authentic flavors of West Africa to Philadelphia. Named after the holy city of Touba in Senegal, our restaurant honors the rich culinary traditions passed down through generations. Our chefs prepare each dish using time-honored recipes and the finest ingredients, creating an unforgettable dining experience that celebrates African heritage and hospitality.',
    values: [
      'Authentic traditional recipes',
      'Fresh, high-quality ingredients',
      'Family-owned and operated',
      'Warm, welcoming atmosphere'
    ]
  },
  orderingPlatforms: {
    doordash: 'https://doordash.com',
    ubereats: 'https://ubereats.com'
  }
};
