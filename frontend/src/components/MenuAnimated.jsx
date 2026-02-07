import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Flame, Star } from 'lucide-react';
import { menuCategories } from '../mockData';

export const MenuAnimated = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  return (
    <section id="menu" className="py-20 bg-black relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.3) 20px, rgba(255, 255, 255, 0.3) 40px)`
        }}></div>
      </div>

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
          {menuCategories.map((category, index) => (
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

        {/* Category Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-gray-400 italic">{currentCategory.description}</p>
          </motion.div>
        </AnimatePresence>

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
            {currentCategory.items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-600 h-full card-hover">
                  {item.image && (
                    <div className="relative h-64 overflow-hidden image-hover">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {item.popular && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, type: 'spring' }}
                          >
                            <Badge className="bg-red-600 text-white font-semibold px-3 py-1 shadow-lg">
                              <Star className="w-3 h-3 mr-1 fill-white" />
                              POPULAR
                            </Badge>
                          </motion.div>
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
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3
                      className="text-2xl font-bold text-black mb-2 leading-tight"
                      style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.02em' }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
