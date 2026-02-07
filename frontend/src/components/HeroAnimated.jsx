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
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex]})`,
              filter: 'brightness(0.4)'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-85"></div>

      {/* African Pattern Overlay */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(227, 30, 36, 0.3) 20px, rgba(227, 30, 36, 0.3) 40px)`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="md:col-span-7 space-y-10 lg:space-y-12">
            {/* Flag Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1.5 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"
            ></motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white"
              style={{ fontFamily: 'Bebas Neue, sans-serif', lineHeight: '1.1', letterSpacing: '0.02em' }}
            >
              <span className="block mb-3">AUTHENTIC</span>
              <span className="block text-red-600 mb-3">SENEGALESE</span>
              <span className="block">FLAVORS</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light max-w-xl"
            >
              Bold African Taste. Made Fresh Daily in Philadelphia.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-5 pt-4"
            >
              <Button
                onClick={() => scrollToSection('order')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-12 py-7 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,30,36,0.6)] hover:scale-105"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
              >
                ORDER ONLINE
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button
                onClick={() => scrollToSection('menu')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-12 py-7 text-lg transition-all duration-300"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
              >
                VIEW MENU
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-10 py-7 text-lg transition-all duration-300"
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
              className="flex flex-wrap gap-10 pt-10 border-t border-gray-700"
            >
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>LOCATION</p>
                <p className="text-base font-semibold text-white">Philadelphia, PA</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>HOURS</p>
                <p className="text-base font-semibold text-white">Open Daily</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider mb-1" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>PHONE</p>
                <p className="text-base font-semibold text-white">{restaurantInfo.phone}</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Floating Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative hidden md:block md:col-span-5"
          >
            <div className="relative max-w-lg ml-auto">
              {/* Main Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1665332195309-9d75071138f0"
                  alt="Thieboudienne - Senegalese national dish"
                  className="w-full h-[500px] lg:h-[550px] object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-6 right-6 bg-red-600 text-white px-5 py-2.5 rounded-full shadow-lg"
                >
                  <p className="text-sm font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
                    🔥 POPULAR
                  </p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -left-4 w-28 h-28 border-4 border-yellow-400 rounded-lg -z-10"></div>
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-gradient-to-br from-green-600 to-red-600 rounded-lg -z-10 opacity-50"></div>
            </div>
          </motion.div>
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
