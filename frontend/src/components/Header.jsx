import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Menu, X, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { restaurantInfo } from '../mockData';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
    <motion.header
      style={{ backgroundColor: headerBackground }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-lg backdrop-blur-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
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
              className="h-12 md:h-16 w-auto"
            />
            <div className="ml-3 w-1 h-12 md:h-16 bg-gradient-to-b from-green-600 via-yellow-400 to-red-600"></div>
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
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </motion.nav>

          {/* Phone & Order Button */}
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
            <Button
              onClick={() => scrollToSection('order')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(227,30,36,0.5)]"
            >
              ORDER NOW
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
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
  );
};
