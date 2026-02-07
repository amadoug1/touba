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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-black">
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

      {/* African Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(227, 30, 36, 0.3) 20px, rgba(227, 30, 36, 0.3) 40px)`
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Flag Accent Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"
            ></motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              AUTHENTIC<br />
              <span className="text-red-600">SENEGALESE</span><br />
              FLAVORS
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light"
            >
              Bold African Taste. Made Fresh Daily in Philadelphia.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => scrollToSection('order')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-7 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(227,30,36,0.6)] hover:scale-105"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
              >
                ORDER ONLINE
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
              <Button
                onClick={() => scrollToSection('menu')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-bold px-10 py-7 text-lg transition-all duration-300"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
              >
                VIEW MENU
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-7 text-lg transition-all duration-300"
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
              className="flex flex-wrap gap-8 pt-8 border-t border-gray-700"
            >
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>LOCATION</p>
                <p className="text-lg font-semibold text-white">Philadelphia, PA</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>HOURS</p>
                <p className="text-lg font-semibold text-white">Open Daily</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>PHONE</p>
                <p className="text-lg font-semibold text-white">{restaurantInfo.phone}</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Floating Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative hidden md:block"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1665332195309-9d75071138f0"
                  alt="Thieboudienne - Senegalese national dish"
                  className="w-full h-[600px] object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                
                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-8 right-8 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg"
                >
                  <p className="text-sm font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}>
                    🔥 POPULAR
                  </p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-yellow-400 rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-600 to-red-600 rounded-lg -z-10 opacity-50"></div>
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
