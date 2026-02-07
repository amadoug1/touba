import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Award, Heart } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const AboutAnimated = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0, 0, 0, 0.3) 20px, rgba(0, 0, 0, 0.3) 40px)`
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Image Side */}
          <motion.div variants={itemVariants} className="relative order-2 md:order-1">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1674216645383-afc4e42c227f"
                  alt="Touba African Restaurant interior"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
              </div>

              {/* Decorative Flag Elements */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-green-600 via-yellow-400 to-red-600 opacity-20 rounded-lg -z-10"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 border-4 border-red-600 rounded-lg -z-10"></div>
              
              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-6 bottom-10 bg-black text-white p-6 rounded-lg shadow-2xl border-2 border-yellow-400"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-sm font-bold" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                  500+ HAPPY CUSTOMERS
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div variants={itemVariants} className="space-y-8 order-1 md:order-2">
            {/* Flag Accent */}
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>

            {/* Title */}
            <div>
              <h2
                className="text-5xl md:text-6xl font-bold text-black mb-4 leading-none"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                OUR STORY
              </h2>
              <p className="text-2xl text-red-600 font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                A Taste of Senegal
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed">
              {restaurantInfo.about.description}
            </p>

            {/* Values with Icons */}
            <div className="space-y-4">
              {[
                { icon: Heart, text: 'Authentic traditional recipes', color: 'text-red-600' },
                { icon: Award, text: 'Fresh, high-quality ingredients', color: 'text-yellow-600' },
                { icon: Star, text: 'Family-owned and operated', color: 'text-green-600' },
                { icon: Check, text: 'Warm, welcoming atmosphere', color: 'text-red-600' }
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className={`flex-shrink-0 mt-1 ${value.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-lg text-gray-800 font-semibold group-hover:text-red-600 transition-colors">
                      {value.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t-2 border-black"
            >
              <div className="text-center">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="text-5xl font-bold text-red-600"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  10+
                </motion.p>
                <p className="text-sm text-gray-600 font-semibold mt-1">YEARS</p>
              </div>
              <div className="text-center">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="text-5xl font-bold text-yellow-600"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  50+
                </motion.p>
                <p className="text-sm text-gray-600 font-semibold mt-1">DISHES</p>
              </div>
              <div className="text-center">
                <motion.p
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className="text-5xl font-bold text-green-600"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
                  100%
                </motion.p>
                <p className="text-sm text-gray-600 font-semibold mt-1">FRESH</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
