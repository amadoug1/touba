import React from 'react';
import { Check } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1674216645383-afc4e42c227f"
                alt="Touba African Restaurant interior"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-black rounded-lg -z-10"></div>
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 md:order-2">
            <div>
              <h2
                className="text-4xl md:text-5xl font-bold text-black mb-4"
                style={{ fontFamily: "'Crimson Text', serif" }}
              >
                {restaurantInfo.about.title}
              </h2>
              <div className="w-20 h-1 bg-black"></div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              {restaurantInfo.about.description}
            </p>

            {/* Values */}
            <div className="space-y-4">
              {restaurantInfo.about.values.map((value, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-800 font-medium">{value}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t-2 border-gray-200">
              <div>
                <p className="text-3xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                  10+
                </p>
                <p className="text-sm text-gray-600 font-medium">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                  50+
                </p>
                <p className="text-sm text-gray-600 font-medium">Authentic Dishes</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                  100%
                </p>
                <p className="text-sm text-gray-600 font-medium">Fresh Ingredients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
