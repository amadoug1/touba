import React from 'react';
import { Card, CardContent } from './ui/card';
import { MapPin, Clock } from 'lucide-react';
import { restaurantInfo } from '../mockData';

export const LocationHours = () => {
  const formatHours = (day) => {
    const hours = restaurantInfo.hours[day.toLowerCase()];
    if (hours.closed) return 'Closed';
    return `${hours.open} - ${hours.close}`;
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <section id="location" className="py-20" style={{ backgroundColor: '#ECEC75' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            Visit Us
          </h2>
          <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Come experience authentic West African cuisine at our Philadelphia location
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Location Card */}
          <Card className="border-2 border-black" style={{ backgroundColor: '#e6e67c' }}>
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <MapPin className="w-8 h-8 text-black flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: "'Crimson Text', serif" }}>
                    Location
                  </h3>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {restaurantInfo.address}<br />
                    {restaurantInfo.city}, {restaurantInfo.state} {restaurantInfo.zipCode}
                  </p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-lg overflow-hidden border-2 border-black">
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

          {/* Hours Card */}
          <Card className="border-2 border-black" style={{ backgroundColor: '#e6e67c' }}>
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <Clock className="w-8 h-8 text-black flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: "'Crimson Text', serif" }}>
                    Hours
                  </h3>
                  <p className="text-lg text-gray-700">We're open every day of the week</p>
                </div>
              </div>

              <div className="space-y-3">
                {days.map((day) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-gray-400">
                    <span className="font-semibold text-gray-900">{day}</span>
                    <span className="text-gray-800">{formatHours(day)}</span>
                  </div>
                ))}
              </div>

              {/* Special Note */}
              <div className="mt-6 p-4 bg-white rounded-lg border-2 border-black">
                <p className="text-sm text-gray-700 text-center">
                  <span className="font-semibold">Note:</span> Hours may vary on holidays. Please call ahead to confirm.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
