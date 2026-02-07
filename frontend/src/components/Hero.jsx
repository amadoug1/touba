import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Phone } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center" style={{ backgroundColor: '#ECEC75' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              Authentic West African Flavors, Made Fresh Daily
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
              Experience the rich culinary traditions of Senegal and West Africa right here in Philadelphia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('order')}
                className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-6 text-lg transition-all duration-200 hover:translate-y-[-2px]"
                size="lg"
              >
                Order Online
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={() => scrollToSection('menu')}
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold px-8 py-6 text-lg transition-all duration-200"
                size="lg"
              >
                View Menu
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold px-8 py-6 text-lg transition-all duration-200"
                size="lg"
              >
                <a href={`tel:${restaurantInfo.phone}`}>
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </a>
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-8 pt-8 border-t-2 border-black">
              <div>
                <p className="text-sm text-gray-700 font-medium">LOCATION</p>
                <p className="text-lg font-semibold text-black">Philadelphia, PA</p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">HOURS</p>
                <p className="text-lg font-semibold text-black">Open Daily</p>
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">PHONE</p>
                <p className="text-lg font-semibold text-black">{restaurantInfo.phone}</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1689155494424-d2337856fe3e"
                alt="Delicious African cuisine"
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-black rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
