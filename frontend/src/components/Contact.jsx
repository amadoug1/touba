import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin } from 'lucide-react';
import { restaurantInfo } from '../mockData';
import { useToast } from '../hooks/use-toast';

export const Contact = () => {
  const { toast } = useToast();
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
    // Mock form submission
    toast({
      title: 'Message Sent!',
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Have questions, catering inquiries, or special requests? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Phone */}
          <Card className="border-2 border-black hover:shadow-xl transition-shadow" style={{ backgroundColor: '#e6e67c' }}>
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                Call Us
              </h3>
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="text-lg text-gray-800 hover:text-black font-semibold transition-colors block"
              >
                {restaurantInfo.phone}
              </a>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="border-2 border-black hover:shadow-xl transition-shadow" style={{ backgroundColor: '#e6e67c' }}>
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                Email Us
              </h3>
              <a
                href={`mailto:${restaurantInfo.email}`}
                className="text-lg text-gray-800 hover:text-black font-semibold transition-colors block break-all"
              >
                {restaurantInfo.email}
              </a>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="border-2 border-black hover:shadow-xl transition-shadow" style={{ backgroundColor: '#e6e67c' }}>
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                Visit Us
              </h3>
              <p className="text-lg text-gray-800">
                {restaurantInfo.address}<br />
                {restaurantInfo.city}, {restaurantInfo.state}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="max-w-3xl mx-auto border-2 border-black" style={{ backgroundColor: '#ECEC75' }}>
          <CardContent className="p-8">
            <h3
              className="text-3xl font-bold text-black mb-6 text-center"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="border-2 border-black focus:ring-2 focus:ring-black"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-2 border-black focus:ring-2 focus:ring-black"
                    placeholder="[email protected]"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-2 border-black focus:ring-2 focus:ring-black"
                  placeholder="(215) 555-1234"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="border-2 border-black focus:ring-2 focus:ring-black"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-6 text-lg transition-all duration-200"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
