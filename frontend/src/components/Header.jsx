import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { restaurantInfo } from '../mockData';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
              Touba
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Order Online
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-black transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          {/* Phone Number & Order Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="flex items-center text-black hover:text-gray-700 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold">{restaurantInfo.phone}</span>
            </a>
            <Button
              onClick={() => scrollToSection('order')}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 transition-all duration-200"
            >
              Order Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left text-gray-700 hover:text-black transition-colors font-medium py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-black transition-colors font-medium py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('menu')}
                className="text-left text-gray-700 hover:text-black transition-colors font-medium py-2"
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection('order')}
                className="text-left text-gray-700 hover:text-black transition-colors font-medium py-2"
              >
                Order Online
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-black transition-colors font-medium py-2"
              >
                Contact
              </button>
              <a
                href={`tel:${restaurantInfo.phone}`}
                className="flex items-center text-black font-semibold py-2"
              >
                <Phone className="w-4 h-4 mr-2" />
                {restaurantInfo.phone}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
