import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Phone, Play } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const HeroAnimated = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1689155494424-d2337856fe3e',
    'https://images.unsplash.com/photo-1665332195309-9d75071138f0',
    'https://images.unsplash.com/photo-1664992960082-0ea299a9c53e',
    'https://images.unsplash.com/photo-1765584830134-12d879ad13bd'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black pt-24">
      {/* Animated Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex]})`,
              filter: 'brightness(0.5)'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          {/* Center-aligned Content */}
          <div className="text-center space-y-12 lg:space-y-16">
            {/* Flag Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '140px' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 mx-auto"
            ></motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif', lineHeight: '1.05', letterSpacing: '0.02em' }}
            >
              <span className="block mb-4">AUTHENTIC</span>
              <span className="block text-red-600 mb-4">SENEGALESE</span>
              <span className="block">FLAVORS</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-2xl md:text-3xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto"
            >
              Bold African Taste. Made Fresh Daily in Philadelphia.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6"
            >
              <Button
                onClick={() => scrollToSection('order')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-14 py-8 text-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,30,36,0.6)] hover:scale-105"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
              >
                ORDER ONLINE
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button
                onClick={() => scrollToSection('menu')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-14 py-8 text-xl transition-all duration-300"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
              >
                VIEW MENU
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-12 py-8 text-xl transition-all duration-300"
              >
                <a href={`tel:${restaurantInfo.phone}`}>
                  <Phone className="mr-2 w-5 h-5" />
                  CALL NOW
                </a>
              </Button>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-wrap justify-center gap-12 pt-12 border-t border-gray-700 max-w-3xl mx-auto"
            >
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>LOCATION</p>
                <p className="text-lg font-semibold text-white">Philadelphia, PA</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>HOURS</p>
                <p className="text-lg font-semibold text-white">Open Daily</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>PHONE</p>
                <p className="text-lg font-semibold text-white">{restaurantInfo.phone}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <p className="text-white text-xs mb-2 tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>SCROLL</p>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full mt-2"
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Progress Indicators */}
      <div className="absolute bottom-10 right-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-12 h-1 transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-red-600 w-16'
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};
