import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Flame, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from "../api/axios";
import Section from './Section';
import { optimizeImageUrl } from '../lib/utils';
import { menuCategories } from '../mockData';

const CATEGORIES = [
  { id: 'rice-dishes', name: 'Rice Dishes' },
  { id: 'meat-fish', name: 'Meat & Fish' },
  { id: 'stews', name: 'Traditional Stews' },
  { id: 'sides', name: 'Sides & Extras' },
  { id: 'drinks', name: 'Beverages' },
];

const getItemImage = (item) => item?.image || item?.image_url || item?.imageUrl || "";
const normalizeCategory = (value = "") =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");


export const MenuShowcaseWithCart = () => {
  const fallbackMenuItems = useMemo(
    () =>
      menuCategories.flatMap((category) =>
        (category.items || []).map((item) => ({
          ...item,
          category: category.id,
          modifiers: item.modifiers || [],
          available: item.available ?? true,
        }))
      ),
    []
  );

  const [menuItems, setMenuItems] = useState(fallbackMenuItems);
  const [selectedCategory, setSelectedCategory] = useState('rice-dishes');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fetchMenu = useCallback(async (signal) => {
    try {
      const response = await api.get("/api/menu/full", {
        signal,
        timeout: 8000,
      });
      const items = Array.isArray(response?.data) ? response.data : [];

      if (items.length > 0) {
        const normalized = items.map((item) => ({
          ...item,
          modifiers: Array.isArray(item.modifiers) ? item.modifiers : [],
          available: item.available ?? true,
        }));
        setMenuItems(normalized);
      } else {
        setMenuItems(fallbackMenuItems);
      }
    } catch (error) {
      if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") return;
      console.error("❌ Error fetching menu:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
        url: error?.config?.url,
      });
      setMenuItems((prev) => (prev.length > 0 ? prev : fallbackMenuItems));
    } finally {
      setLoading(false);
    }
  }, [fallbackMenuItems]);

  useEffect(() => {
    const controller = new AbortController();
    fetchMenu(controller.signal);
    return () => controller.abort();
  }, [fetchMenu]);

  const currentItems = useMemo(() => {
    const selected = normalizeCategory(selectedCategory);
    return menuItems.filter((item) => normalizeCategory(item.category) === selected);
  }, [menuItems, selectedCategory]);
  const displayedItems = useMemo(() => {
    if (currentItems.length > 0) return currentItems;
    return menuItems;
  }, [currentItems, menuItems]);
  const featuredItems = useMemo(
    () => menuItems.filter((item) => item.popular).slice(0, 3),
    [menuItems]
  );

  const handleOpenModal = useCallback((item) => {
    setSelectedItem(item);
    setSelectedModifiers([]);
    setQuantity(1);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    setSelectedModifiers([]);
    setQuantity(1);
  }, []);

  const toggleModifier = (modifier) => {
    setSelectedModifiers((prev) =>
      prev.find((m) => m.id === modifier.id)
        ? prev.filter((m) => m.id !== modifier.id)
        : [...prev, modifier]
    );
  };

  const calculateTotal = () => {
    if (!selectedItem) return 0;
    const modifiersTotal = selectedModifiers.reduce((sum, mod) => sum + mod.price, 0);
    return (selectedItem.price + modifiersTotal) * quantity;
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart(selectedItem, quantity, selectedModifiers);
      handleCloseModal();
    }
  };

  const handleQuickAdd = useCallback((item) => {
    addToCart(item, 1, []);
  }, [addToCart]);

  if (loading) {
    return (
      <Section id="menu" className="bg-black" innerClassName="text-center">
        <p className="text-white text-xl">Loading menu...</p>
      </Section>
    );
  }

  return (
    <Section id="menu" className="bg-black relative overflow-hidden" innerClassName="relative z-10">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Featured Dishes */}
{featuredItems.length > 0 && (
  <div className="mb-14">
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 text-left sm:text-inherit">
      <div>
        <p className="text-sm font-sans font-semibold uppercase tracking-[0.12em] text-gray-400">
          Featured
        </p>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white tracking-[0.01em]">
          Today’s Favorites
        </h3>
      </div>
      <button
        onClick={() => setSelectedCategory('rice-dishes')}
        className="text-sm font-sans font-semibold uppercase tracking-[0.12em] text-white/80 hover:text-white transition-colors text-left sm:text-right"
      >
        View full menu →
      </button>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {featuredItems.map((item) => {
        const imageSrc = getItemImage(item);
        return (
          <Card
            key={item.id}
            className="overflow-hidden bg-white/95 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 border border-red-600/25 hover:border-red-600 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
              {imageSrc ? (
                <img
                  src={optimizeImageUrl(imageSrc, 900)}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-white text-xl font-sans font-semibold leading-tight">
                    {item.name}
                  </p>
                  <p className="text-white/80 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <div className="bg-black/80 text-white px-3 py-2 rounded-full">
                  <span className="font-sans font-bold tracking-tight">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <CardContent className="p-5">
              <Button
                onClick={() =>
                  item.modifiers?.length ? handleOpenModal(item) : handleQuickAdd(item)
                }
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 font-sans uppercase tracking-[0.14em] transition-[transform,box-shadow,background-color] duration-300 hover:shadow-[0_10px_30px_rgba(227,30,36,0.35)]"
              >
                {item.modifiers?.length ? 'Customize' : 'Add to Cart'}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  </div>
)}

          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100px' } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600 mx-auto mb-6"
          />

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-semibold text-white mb-4 leading-[0.95] tracking-[0.02em]">
            Our Menu
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Authentic West African dishes prepared with traditional recipes and the finest ingredients
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className={`px-5 sm:px-8 py-3 sm:py-4 font-bold transition-[transform,background-color,color,box-shadow] duration-300 relative overflow-hidden font-sans uppercase tracking-[0.10em] text-xs sm:text-sm md:text-base ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(227,30,36,0.5)]'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {category.name}
              {selectedCategory === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentItems.length === 0 && menuItems.length > 0 && (
              <div className="md:col-span-2 lg:col-span-3 rounded-xl border border-white/20 bg-white/5 p-6 text-center">
                <p className="text-white/90 font-semibold">Category is empty. Showing all menu items instead.</p>
                <p className="text-gray-400 text-sm mt-2">Your category labels in data may be mismatched.</p>
              </div>
            )}
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className={`h-full flex flex-col overflow-hidden bg-white/95 backdrop-blur-sm transition-[transform,box-shadow,border-color,background-color] duration-300 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.35)]
                    ${
                      item.popular
                        ? 'border border-red-600/40 ring-1 ring-red-600/20'
                        : 'border border-black/5'
                    }
                  `}
                >
                  {getItemImage(item) && (
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <img
                        src={optimizeImageUrl(getItemImage(item), 900)}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        {item.popular && (
                          <Badge className="bg-red-600 text-white px-3 py-1 shadow-lg font-sans uppercase tracking-[0.10em] text-xs">
                            <Star className="w-3 h-3 mr-1 fill-white" />
                            Popular
                          </Badge>
                        )}
                        {item.spicy && (
                          <div className="bg-white rounded-full p-2 shadow-lg">
                            <Flame className="w-5 h-5 text-red-600" />
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full shadow-lg">
                        <span className="text-xl font-sans font-bold tracking-tight">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}

                  <CardContent className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-sans font-semibold mb-2 tracking-tight text-black">
                      {item.name}
                    </h3>

                    <p className="text-gray-700 mb-4 flex-1">{item.description}</p>

                    <Button
                      onClick={() => (item.modifiers?.length ? handleOpenModal(item) : handleQuickAdd(item))}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 font-sans uppercase tracking-[0.12em]"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {item.modifiers?.length ? 'Customize' : 'Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <Dialog open={!!selectedItem} onOpenChange={handleCloseModal}>
        <DialogContent className="w-[calc(100%-1rem)] sm:w-full bg-black border border-white/20 max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-display font-semibold text-white tracking-[0.01em]">
                  {selectedItem.name}
                </DialogTitle>
                <p className="text-gray-400">{selectedItem.description}</p>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {selectedItem.modifiers?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-sans font-semibold uppercase tracking-[0.12em] text-gray-200 mb-4">
                      Customize Your Order
                    </h4>

                    {selectedItem.modifiers.map((modifier) => (
                      <button
                        key={modifier.id}
                        onClick={() => toggleModifier(modifier)}
                        className={`w-full p-4 mb-3 rounded-lg border text-left transition-[transform,background-color,color,border-color,box-shadow] duration-300 ${
                          selectedModifiers.find((m) => m.id === modifier.id)
                            ? 'border-red-600 bg-red-600/20'
                            : 'border-gray-700 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className="text-white font-sans font-medium">{modifier.name}</span>
                          <span className="text-yellow-400 font-sans font-bold">
                            {modifier.price > 0 ? `+$${modifier.price.toFixed(2)}` : 'Free'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <div className="pt-6 border-t border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400 text-sm font-sans uppercase tracking-[0.12em]">
                      Total
                    </span>
                    <span className="text-white text-3xl font-sans font-bold tracking-tight">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 text-xl font-sans uppercase tracking-[0.12em]"
                  >
                    <ShoppingCart className="w-6 h-6 mr-3" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
};
