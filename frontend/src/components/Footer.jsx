import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Crimson Text', serif" }}>
              Touba
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Bringing authentic West African flavors to Philadelphia since 2014.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('menu')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('order')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Order Online
                </button>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Mon-Thu: 11 AM - 10 PM</li>
              <li>Fri: 11 AM - 11 PM</li>
              <li>Sat: 12 PM - 11 PM</li>
              <li>Sun: 12 PM - 10 PM</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  {restaurantInfo.address}<br />
                  {restaurantInfo.city}, {restaurantInfo.state} {restaurantInfo.zipCode}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a href={`tel:${restaurantInfo.phone}`} className="text-gray-300 hover:text-white transition-colors">
                  {restaurantInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-gray-300 hover:text-white transition-colors break-all"
                >
                  {restaurantInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Touba African Restaurant. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Crafted with love and authentic African spices
          </p>
        </div>
      </div>
    </footer>
  );
};
