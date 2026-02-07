import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('touba_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('touba_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity = 1, modifiers = []) => {
    const cartItem = {
      item_id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      modifiers: modifiers.map(mod => ({
        id: mod.id,
        name: mod.name,
        price: mod.price
      })),
      subtotal: calculateItemSubtotal(item.price, quantity, modifiers)
    };

    setCart(prevCart => {
      // Check if exact same item with same modifiers exists
      const existingIndex = prevCart.findIndex(
        cartItem => 
          cartItem.item_id === item.id &&
          JSON.stringify(cartItem.modifiers) === JSON.stringify(cartItem.modifiers)
      );

      if (existingIndex > -1) {
        // Update quantity
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        newCart[existingIndex].subtotal = calculateItemSubtotal(
          item.price,
          newCart[existingIndex].quantity,
          newCart[existingIndex].modifiers
        );
        return newCart;
      } else {
        // Add new item
        return [...prevCart, cartItem];
      }
    });

    toast.success('Added to cart!', {
      style: {
        background: '#e31e24',
        color: '#fff',
        fontWeight: 'bold'
      }
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
    toast.success('Removed from cart', {
      style: {
        background: '#000',
        color: '#fff',
      }
    });
  };

  const updateQuantity = (index, quantity) => {
    if (quantity < 1) {
      removeFromCart(index);
      return;
    }

    setCart(prevCart => {
      const newCart = [...prevCart];
      newCart[index].quantity = quantity;
      newCart[index].subtotal = calculateItemSubtotal(
        newCart[index].price,
        quantity,
        newCart[index].modifiers
      );
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('touba_cart');
  };

  const calculateItemSubtotal = (basePrice, quantity, modifiers) => {
    const modifiersTotal = modifiers.reduce((sum, mod) => sum + mod.price, 0);
    return (basePrice + modifiersTotal) * quantity;
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
