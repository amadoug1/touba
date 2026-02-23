import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { restaurantInfo } from '../mockData';
import { useCart } from '../context/CartContext';
import { CartDrawer } from './CartDrawer';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useCart();
  const headerRef = useRef(null);
  const lastOpacityRef = useRef(-1);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const opacity = Math.min(window.scrollY / 100, 1) * 0.95;
        if (Math.abs(opacity - lastOpacityRef.current) >= 0.01) {
          if (headerRef.current) {
            headerRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity.toFixed(3)})`;
          }
          lastOpacityRef.current = opacity;
        }

        const isScrolled = window.scrollY > 50;
        setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled ? 'shadow-lg backdrop-blur-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo with Animation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_touba-cuisine/artifacts/r5bc54hg_Screenshot%202026-02-07%20at%204.01.32%E2%80%AFAM.png"
                alt="Touba African Restaurant"
                className="h-12 sm:h-14 md:h-20 w-auto object-contain"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="ml-2 sm:ml-4 w-0.5 sm:w-1 h-12 sm:h-14 md:h-20 bg-gradient-to-b from-green-600 via-yellow-400 to-red-600"></div>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:flex items-center space-x-8"
            >
              {['Home', 'About', 'Menu', 'Order', 'Contact'].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white hover:text-red-600 transition-colors font-semibold text-sm tracking-wide relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 transition-[width] duration-300 group-hover:w-full"></span>
                </motion.button>
              ))}
            </motion.nav>

            {/* Phone, Cart & Order Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex items-center space-x-4"
            >
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-semibold text-sm">{restaurantInfo.phone}</span>
              </a>
              
              {/* Cart Icon */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-white hover:text-yellow-400 transition-colors p-2"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <Button
                onClick={() => scrollToSection('order')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 transition-[transform,box-shadow,background-color] duration-300 hover:shadow-[0_0_20px_rgba(227,30,36,0.5)]"
              >
                ORDER NOW
              </Button>
            </motion.div>

            {/* Mobile Menu & Cart */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-white p-2"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white"
                whileTap={{ scale: 0.9 }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-800"
            >
              <nav className="flex flex-col space-y-4">
                {['Home', 'About', 'Menu', 'Order', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-left text-white hover:text-red-600 transition-colors font-semibold py-2"
                  >
                    {item}
                  </button>
                ))}
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="flex items-center text-white font-semibold py-2"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {restaurantInfo.phone}
                </a>
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};
