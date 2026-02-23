import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, Phone } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const OrderingSection = () => {
  return (
    <section id="order" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            Order Online
          </h2>
          <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Enjoy authentic African cuisine delivered right to your door. Choose your preferred delivery platform or call us directly.
          </p>
        </div>

        {/* Ordering Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* DoorDash Card */}
          <Card
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-black hover:translate-y-[-4px]"
            style={{ backgroundColor: '#e6e67c' }}
          >
            <CardContent className="p-8 text-center space-y-6">
              <div className="bg-white rounded-lg p-6 inline-block">
                <img
                  src="/images/DoorDashLogo.svg"
                  alt="DoorDash"
                  className="h-14 w-auto object-contain mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                DoorDash
              </h3>
              <p className="text-gray-700">
                Fast and reliable delivery through DoorDash. Track your order in real-time.
              </p>
              <Button
                asChild
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-6 text-lg transition-all duration-200"
              >
                <a href={restaurantInfo.orderingPlatforms.doordash} target="_blank" rel="noopener noreferrer">
                  Order on DoorDash
                  <ExternalLink className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Uber Eats Card */}
          <Card
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-black hover:translate-y-[-4px]"
            style={{ backgroundColor: '#e6e67c' }}
          >
            <CardContent className="p-8 text-center space-y-6">
              <div className="bg-white rounded-lg p-6 inline-block">
                <img
                  src="/images/UberEatsLogo.png"
                  alt="Uber Eats"
                  className="h-14 w-auto object-contain mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                Uber Eats
              </h3>
              <p className="text-gray-700">
                Convenient delivery through Uber Eats. Get your food fresh and hot.
              </p>
              <Button
                asChild
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-6 text-lg transition-all duration-200"
              >
                <a href={restaurantInfo.orderingPlatforms.ubereats} target="_blank" rel="noopener noreferrer">
                  Order on Uber Eats
                  <ExternalLink className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Phone Order Option */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-black" style={{ backgroundColor: '#ECEC75' }}>
            <CardContent className="p-8 text-center space-y-4">
              <Phone className="w-12 h-12 mx-auto text-black" />
              <h3 className="text-2xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                Prefer to Call?
              </h3>
              <p className="text-lg text-gray-800">
                Call us directly for phone orders, catering inquiries, or special requests
              </p>
              <Button
                asChild
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold px-8 py-6 text-lg transition-all duration-200"
                size="lg"
              >
                <a href={`tel:${restaurantInfo.phone}`}>
                  {restaurantInfo.phone}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
