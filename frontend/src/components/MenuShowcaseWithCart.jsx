import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Flame, Star, Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const MenuShowcaseWithCart = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('rice-dishes');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/menu/full`);
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setLoading(false);
    }
  };

  const categories = [
    { id: 'rice-dishes', name: 'Rice Dishes' },
    { id: 'meat-fish', name: 'Meat & Fish' },
    { id: 'stews', name: 'Traditional Stews' },
    { id: 'sides', name: 'Sides & Extras' },
    { id: 'drinks', name: 'Beverages' }
  ];

  const currentItems = menuItems.filter(item => item.category === selectedCategory);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setSelectedModifiers([]);
    setQuantity(1);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedModifiers([]);
    setQuantity(1);
  };

  const toggleModifier = (modifier) => {
    setSelectedModifiers(prev => {
      const exists = prev.find(m => m.id === modifier.id);
      if (exists) {
        return prev.filter(m => m.id !== modifier.id);
      } else {
        return [...prev, modifier];
      }
    });
  };

  const calculateTotal = () => {
    if (!selectedItem) return 0;
    const modifiersTotal = selectedModifiers.reduce((sum, mod) => sum + mod.price, 0);
    return (selectedItem.price + modifiersTotal) * quantity;
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem, quantity, selectedModifiers);
      handleCloseModal();
    }
  };

  const handleQuickAdd = (item) => {
    addToCart(item, 1, []);
  };

  if (loading) {
    return (
      <section id="menu" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white text-xl">Loading menu...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 bg-black relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100px' } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 mx-auto mb-6"
          ></motion.div>
          
          <h2
            className="text-5xl md:text-7xl font-bold text-white mb-4 leading-none"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            OUR MENU
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Authentic West African dishes prepared with traditional recipes and the finest ingredients
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className={`px-8 py-4 font-bold transition-all duration-300 relative overflow-hidden ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(227,30,36,0.5)]'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
              style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
            >
              {category.name}
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-600 h-full flex flex-col">
                  {item.image && (
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {item.popular && (
                          <Badge className="bg-red-600 text-white font-semibold px-3 py-1 shadow-lg">
                            <Star className="w-3 h-3 mr-1 fill-white" />
                            POPULAR
                          </Badge>
                        )}
                        {item.spicy && (
                          <div className="bg-white rounded-full p-2 shadow-lg">
                            <Flame className="w-5 h-5 text-red-600" />
                          </div>
                        )}
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-xl font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <h3
                      className="text-2xl font-bold text-black mb-2 leading-tight"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.02em' }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4 flex-1">{item.description}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {item.modifiers && item.modifiers.length > 0 ? (
                        <Button
                          onClick={() => handleOpenModal(item)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 transition-all duration-300"
                          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Customize
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleQuickAdd(item)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 transition-all duration-300"
                          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modifier Selection Modal */}
      <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
        <DialogContent className="bg-black border-4 border-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {selectedItem.name}
                </DialogTitle>
                <p className="text-gray-400">{selectedItem.description}</p>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Modifiers */}
                {selectedItem.modifiers && selectedItem.modifiers.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      Customize Your Order
                    </h4>
                    <div className="space-y-3">
                      {selectedItem.modifiers.map((modifier) => (
                        <button
                          key={modifier.id}
                          onClick={() => toggleModifier(modifier)}
                          className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                            selectedModifiers.find(m => m.id === modifier.id)
                              ? 'border-red-600 bg-red-600 bg-opacity-20'
                              : 'border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-white font-semibold">{modifier.name}</span>
                            <span className="text-yellow-400 font-bold">
                              {modifier.price > 0 ? `+$${modifier.price.toFixed(2)}` : 'Free'}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    Quantity
                  </h4>
                  <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-white hover:text-red-600 transition-colors p-2"
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <span className="text-white font-bold text-2xl min-w-[40px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-white hover:text-green-600 transition-colors p-2"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Total & Add to Cart */}
                <div className="pt-6 border-t-2 border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-lg">Total:</span>
                    <span className="text-white font-bold text-3xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(227,30,36,0.6)]"
                    style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    ADD TO CART
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
