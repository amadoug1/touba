import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { restaurantInfo } from '../mockData';
import { toast } from 'sonner';

export const ContactAnimated = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon!", {
      duration: 4000,
      style: {
        background: '#e31e24',
        color: '#fff',
        fontWeight: 'bold'
      }
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
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
            GET IN TOUCH
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Questions, catering inquiries, or special requests? We'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Cards */}
          {[
            { icon: Phone, title: 'CALL US', content: restaurantInfo.phone, href: `tel:${restaurantInfo.phone}`, color: 'red' },
            { icon: Mail, title: 'EMAIL US', content: restaurantInfo.email, href: `mailto:${restaurantInfo.email}`, color: 'yellow' },
            { icon: MapPin, title: 'VISIT US', content: `${restaurantInfo.address}, ${restaurantInfo.city}, ${restaurantInfo.state}`, href: null, color: 'green' }
          ].map((item, index) => {
            const Icon = item.icon;
            const colorClasses = {
              red: 'bg-red-600',
              yellow: 'bg-yellow-400',
              green: 'bg-green-600'
            };
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="border-4 border-black hover:shadow-2xl transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className={`w-16 h-16 ${colorClasses[item.color]} rounded-full flex items-center justify-center mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-black" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
                      {item.title}
                    </h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-lg text-gray-800 hover:text-red-600 font-semibold transition-colors block break-words"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-lg text-gray-800 font-semibold">{item.content}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-4 border-black bg-white">
            <CardContent className="p-8">
              <h3
                className="text-4xl font-bold text-black mb-8 text-center"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
              >
                SEND US A MESSAGE
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      YOUR NAME *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="border-2 border-black focus:ring-2 focus:ring-red-600"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                      EMAIL ADDRESS *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="border-2 border-black focus:ring-2 focus:ring-red-600"
                      placeholder="[email protected]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    PHONE NUMBER
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-2 border-black focus:ring-2 focus:ring-red-600"
                    placeholder="(215) 555-1234"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                    MESSAGE *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="border-2 border-black focus:ring-2 focus:ring-red-600"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 hover:opacity-90 text-white font-bold py-6 text-lg transition-all duration-300"
                  style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.1em' }}
                >
                  <Send className="mr-2 w-5 h-5" />
                  SEND MESSAGE
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
