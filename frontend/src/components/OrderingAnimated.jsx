import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Phone, MapPin, Clock } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const OrderingAnimated = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section id="order" className="py-20 bg-white relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0, 0, 0, 0.3) 20px, rgba(0, 0, 0, 0.3) 40px)`
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
            className="text-5xl md:text-7xl font-bold text-black mb-4 leading-none"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            ORDER ONLINE
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Enjoy authentic African cuisine delivered right to your door
          </p>
        </motion.div>

        {/* Ordering Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* DoorDash Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-4 border-black h-full">
              <CardContent className="p-8 text-center space-y-6 bg-gradient-to-br from-white to-gray-50">
                <div className="bg-red-600 rounded-lg p-6 inline-block">
                  <div className="text-7xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    DD
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-black" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                  DOORDASH
                </h3>
                <p className="text-gray-700 text-lg">
                  Fast and reliable delivery. Track your order in real-time.
                </p>
                <Button
                  asChild
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(227,30,36,0.5)]"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
                >
                  <a href={restaurantInfo.orderingPlatforms.doordash} target="_blank" rel="noopener noreferrer">
                    ORDER ON DOORDASH
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Uber Eats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-4 border-black h-full">
              <CardContent className="p-8 text-center space-y-6 bg-gradient-to-br from-white to-gray-50">
                <div className="bg-black rounded-lg p-6 inline-block">
                  <div className="text-7xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    UE
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-black" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                  UBER EATS
                </h3>
                <p className="text-gray-700 text-lg">
                  Convenient delivery. Get your food fresh and hot.
                </p>
                <Button
                  asChild
                  className="w-full bg-black hover:bg-gray-800 text-white font-bold py-6 text-lg transition-all duration-300 hover:shadow-lg"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
                >
                  <a href={restaurantInfo.orderingPlatforms.ubereats} target="_blank" rel="noopener noreferrer">
                    ORDER ON UBER EATS
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Phone Order Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="border-4 border-black overflow-hidden">
            <CardContent className="p-8 text-center space-y-4 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600">
              <Phone className="w-16 h-16 mx-auto text-white" />
              <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                PREFER TO CALL?
              </h3>
              <p className="text-lg text-white font-semibold">
                Call us for phone orders, catering, or special requests
              </p>
              <Button
                asChild
                variant="outline"
                className="border-4 border-white text-white hover:bg-white hover:text-black font-bold px-8 py-6 text-2xl transition-all duration-300"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
                size="lg"
              >
                <a href={`tel:${restaurantInfo.phone}`}>
                  {restaurantInfo.phone}
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
