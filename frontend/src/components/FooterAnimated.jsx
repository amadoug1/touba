import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const FooterAnimated = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="perf-section bg-black text-white py-12 sm:py-16 relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255, 255, 255, 0.3) 20px, rgba(255, 255, 255, 0.3) 40px)`
        }}></div>
      </div>

      {/* Flag Accent Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* About */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_touba-cuisine/artifacts/r5bc54hg_Screenshot%202026-02-07%20at%204.01.32%E2%80%AFAM.png"
                alt="Touba African Restaurant"
                loading="lazy"
                decoding="async"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Bringing authentic West African flavors to Philadelphia since 2014.
            </p>
            <div className="mt-4 flex gap-2 justify-center md:justify-start">
              <div className="w-8 h-1 bg-green-600"></div>
              <div className="w-8 h-1 bg-yellow-400"></div>
              <div className="w-8 h-1 bg-red-600"></div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Menu', 'Order', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-400 hover:text-red-600 transition-colors text-sm font-medium"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
              HOURS
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex justify-between md:justify-between max-w-[220px] mx-auto md:mx-0">
                <span>Mon-Thu:</span>
                <span className="font-semibold">11 AM - 10 PM</span>
              </li>
              <li className="flex justify-between md:justify-between max-w-[220px] mx-auto md:mx-0">
                <span>Fri:</span>
                <span className="font-semibold">11 AM - 11 PM</span>
              </li>
              <li className="flex justify-between md:justify-between max-w-[220px] mx-auto md:mx-0">
                <span>Sat:</span>
                <span className="font-semibold">12 PM - 11 PM</span>
              </li>
              <li className="flex justify-between md:justify-between max-w-[220px] mx-auto md:mx-0">
                <span>Sun:</span>
                <span className="font-semibold">12 PM - 10 PM</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-4" style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}>
              CONTACT
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 justify-center md:justify-start">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1 text-red-600" />
                <span className="text-gray-400 text-sm">
                  {restaurantInfo.address}<br />
                  {restaurantInfo.city}, {restaurantInfo.state} {restaurantInfo.zipCode}
                </span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <Phone className="w-5 h-5 flex-shrink-0 text-yellow-400" />
                <a href={`tel:${restaurantInfo.phone}`} className="text-gray-400 hover:text-yellow-400 transition-colors text-sm font-semibold">
                  {restaurantInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <Mail className="w-5 h-5 flex-shrink-0 text-green-600" />
                <a
                  href={`mailto:${restaurantInfo.email}`}
                  className="text-gray-400 hover:text-green-600 transition-colors text-sm break-all"
                >
                  {restaurantInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Touba African Restaurant. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm italic">
              Crafted with love and authentic African spices
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
