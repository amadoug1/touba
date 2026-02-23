import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { toast } from 'sonner';

const CartContext = createContext();
const CheckoutContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CartProvider');
  }
  return context;
};

// helper: stable comparison for modifiers
const normalizeModifiers = (mods = []) =>
  [...mods]
    .map((m) => ({ id: m.id, name: m.name, price: m.price }))
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));

const calculateItemSubtotal = (basePrice, quantity, modifiers) => {
  const modifiersTotal = (modifiers || []).reduce((sum, mod) => sum + (mod.price || 0), 0);
  return (basePrice + modifiersTotal) * quantity;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // NEW: fulfillment + customer info for website ordering
  const [fulfillment, setFulfillment] = useState('pickup'); // 'pickup' | 'delivery'
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    instructions: '',
  });

  // Load cart + checkout fields from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('touba_cart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedFulfillment = localStorage.getItem('touba_fulfillment');
    if (savedFulfillment) setFulfillment(savedFulfillment);

    const savedCustomer = localStorage.getItem('touba_customer');
    if (savedCustomer) setCustomer(JSON.parse(savedCustomer));
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      localStorage.setItem('touba_cart', JSON.stringify(cart));
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [cart]);

  // Save checkout fields whenever they change
  useEffect(() => {
    localStorage.setItem('touba_fulfillment', fulfillment);
  }, [fulfillment]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      localStorage.setItem('touba_customer', JSON.stringify(customer));
    }, 200);

    return () => window.clearTimeout(timeoutId);
  }, [customer]);

  const addToCart = useCallback((item, quantity = 1, modifiers = []) => {
    const normalizedMods = normalizeModifiers(modifiers);

    const cartItem = {
      item_id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      modifiers: normalizedMods,
      subtotal: calculateItemSubtotal(item.price, quantity, normalizedMods),
    };

    setCart((prevCart) => {
      // ✅ FIXED BUG: compare existing item modifiers correctly
      const existingIndex = prevCart.findIndex((ci) => {
        if (ci.item_id !== item.id) return false;
        const a = JSON.stringify(normalizeModifiers(ci.modifiers || []));
        const b = JSON.stringify(normalizedMods);
        return a === b;
      });

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        newCart[existingIndex].subtotal = calculateItemSubtotal(
          newCart[existingIndex].price,
          newCart[existingIndex].quantity,
          newCart[existingIndex].modifiers
        );
        return newCart;
      }

      return [...prevCart, cartItem];
    });

    toast.success('Added to cart!', {
      style: {
        background: '#e31e24',
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    toast.success('Removed from cart', {
      style: {
        background: '#000',
        color: '#fff',
      },
    });
  }, []);

  const updateQuantity = useCallback((index, quantity) => {
    if (quantity < 1) {
      removeFromCart(index);
      return;
    }

    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity = quantity;
      newCart[index].subtotal = calculateItemSubtotal(
        newCart[index].price,
        quantity,
        newCart[index].modifiers
      );
      return newCart;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('touba_cart');
  }, []);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.subtotal, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const cartValue = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount]
  );

  const checkoutValue = useMemo(
    () => ({
      fulfillment,
      setFulfillment,
      customer,
      setCustomer,
    }),
    [fulfillment, customer]
  );

  return (
    <CartContext.Provider value={cartValue}>
      <CheckoutContext.Provider value={checkoutValue}>
        {children}
      </CheckoutContext.Provider>
    </CartContext.Provider>
  );
};
