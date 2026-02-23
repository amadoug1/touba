import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-70 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-black border-l-2 sm:border-l-4 border-white z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b-2 border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    YOUR CART
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-red-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                  <p className="text-gray-500 text-sm mt-2">Add some delicious items to get started!</p>
                </div>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-gray-900 border-2 border-gray-800 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                            {item.name}
                          </h3>
                          {item.modifiers.length > 0 && (
                            <div className="mt-1 space-y-1">
                              {item.modifiers.map((mod, i) => (
                                <p key={i} className="text-yellow-400 text-xs">
                                  + {mod.name} {mod.price > 0 && `($${mod.price.toFixed(2)})`}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-black rounded-lg px-3 py-2">
                          <button
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                            className="text-white hover:text-red-600 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="text-white hover:text-green-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-white font-bold text-xl">
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Clear Cart Button */}
                  <button
                    onClick={clearCart}
                    className="w-full text-red-600 hover:text-red-500 text-sm font-semibold py-2 transition-colors"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {cart.length > 0 && (
              <div className="border-t-2 border-gray-800 p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-lg">Subtotal:</span>
                  <span className="text-white font-bold text-2xl" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-500 text-xs text-center">
                  Tax and fees calculated at checkout
                </p>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 sm:py-6 text-lg sm:text-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(227,30,36,0.6)]"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
