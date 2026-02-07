import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';
import { MapPin, Clock } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const LocationAnimated = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const formatHours = (day) => {
    const hours = restaurantInfo.hours[day.toLowerCase()];
    if (hours.closed) return 'Closed';
    return `${hours.open} - ${hours.close}`;
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <section id="location" className="py-20 bg-black relative overflow-hidden">
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
            VISIT US
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Come experience authentic West African cuisine in Philadelphia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-4 border-white bg-white h-full">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <MapPin className="w-10 h-10 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                      LOCATION
                    </h3>
                    <p className="text-lg text-gray-800 leading-relaxed font-semibold">
                      {restaurantInfo.address}<br />
                      {restaurantInfo.city}, {restaurantInfo.state} {restaurantInfo.zipCode}
                    </p>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="rounded-lg overflow-hidden border-4 border-black">
                  <iframe
                    title="Restaurant Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3055.3548287799!2d-75.1342!3d40.0368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6b7d8d4bfaaab%3A0x3c07d96b42d8e86!2s428%20W%20Olney%20Ave%2C%20Philadelphia%2C%20PA%2019120!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hours Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border-4 border-white bg-white h-full">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <Clock className="w-10 h-10 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                      HOURS
                    </h3>
                    <p className="text-lg text-gray-700">Open every day of the week</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {days.map((day, index) => (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="flex justify-between items-center py-3 border-b-2 border-gray-200"
                    >
                      <span className="font-bold text-gray-900 text-lg" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                        {day}
                      </span>
                      <span className="text-gray-700 font-semibold">{formatHours(day)}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Special Note */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 rounded-lg">
                  <p className="text-sm text-white text-center font-semibold">
                    Hours may vary on holidays. Please call ahead to confirm.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
