import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Flame } from 'lucide-react';
import { menuCategories } from '../mockData';

export const MenuShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);

  const currentCategory = menuCategories.find(cat => cat.id === selectedCategory);

  return (
    <section id="menu" className="py-20" style={{ backgroundColor: '#ECEC75' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-black mb-4"
            style={{ fontFamily: "'Crimson Text', serif" }}
          >
            Our Menu
          </h2>
          <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Explore our selection of authentic West African dishes, prepared with traditional recipes and the finest ingredients.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-black text-white'
                  : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Category Description */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 italic">{currentCategory.description}</p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCategory.items.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 border-2 border-gray-900"
              style={{ backgroundColor: '#e6e67c' }}
            >
              {item.image && (
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  {item.popular && (
                    <Badge className="absolute top-4 right-4 bg-black text-white font-semibold px-3 py-1">
                      Popular
                    </Badge>
                  )}
                  {item.spicy && (
                    <div className="absolute top-4 left-4 bg-white rounded-full p-2">
                      <Flame className="w-5 h-5 text-red-600" />
                    </div>
                  )}
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-black" style={{ fontFamily: "'Crimson Text', serif" }}>
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-black">${item.price}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
