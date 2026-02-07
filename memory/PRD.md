# Touba African Restaurant - Product Requirements Document

## Project Overview
**Product Name**: Touba African Restaurant Website  
**Design**: Bold, Modern, Animated with Black & White + Senegalese Flag Colors  
**Tech Stack**: React + Framer Motion (Frontend), FastAPI (Backend - Pending), MongoDB (Database - Pending)  
**Location**: 428 W Olney Ave, Philadelphia, PA 19120  
**Phone**: (215) 403-7409

---

## Design System (Bold Modern African Luxury)

### Color Palette
- **Primary**: Black (#000000) & White (#ffffff)
- **Senegalese Flag Accents**: 
  - Red (#e31e24)
  - Yellow (#fcd116)
  - Green (#00853f)
- **Used For**: Buttons, hover effects, animations, decorative elements

### Typography
- **Display (Headings)**: Bebas Neue - Bold, uppercase, modern
- **Serif (Subheadings)**: Playfair Display - Elegant, premium
- **Body**: Inter - Clean, readable

### Animation Framework
- **Framer Motion**: Scroll-triggered animations, hover effects, transitions
- **Parallax Effects**: Hero section with rotating food carousel
- **Micro-interactions**: Button ripples, card hovers, smooth page transitions

---

## Implementation History

### Phase 1 - Bold Redesign (Completed: Feb 7, 2026)

**New Animated Components Created:**
- `/app/frontend/src/components/HeroAnimated.jsx` - Full-screen hero with rotating images, parallax, bold typography
- `/app/frontend/src/components/Header.jsx` - Glassmorphic header with logo, scroll effects, flag accent
- `/app/frontend/src/components/AboutAnimated.jsx` - Scroll-triggered animations, floating stats card
- `/app/frontend/src/components/MenuAnimated.jsx` - Interactive menu with category transitions, hover effects
- `/app/frontend/src/components/OrderingAnimated.jsx` - Bold ordering cards with DoorDash/Uber Eats integration
- `/app/frontend/src/components/LocationAnimated.jsx` - Location & hours with Google Maps
- `/app/frontend/src/components/ContactAnimated.jsx` - Contact form with Senegalese flag gradient submit button
- `/app/frontend/src/components/FooterAnimated.jsx` - Premium footer with flag accent stripe

**Design Features Implemented:**
- Black background with high-contrast white text
- Red, yellow, green accent colors throughout
- Bebas Neue typography for bold headers
- Scroll-triggered fade-in animations
- Hover effects with scale and shadow
- Rotating food carousel in hero
- African pattern overlays (subtle)
- Flag gradient accent lines
- Interactive menu category switching
- Floating badges and decorative elements
- Mobile-responsive design

**Animations & Motion:**
- Scroll indicators with animated arrows
- Image progress indicators
- Button ripple effects
- Card hover lift effects
- Smooth page transitions
- Parallax hero background
- Staggered content reveals
- Micro-interactions on all interactive elements

**Status**: ✅ Complete modern redesign with animations

---

## Features Implemented

### Homepage
- ✅ Animated hero with rotating food images
- ✅ Bold typography ("AUTHENTIC SENEGALESE FLAVORS")
- ✅ Prominent CTAs (Order Online, View Menu, Call Now)
- ✅ Quick info cards (Location, Hours, Phone)
- ✅ Scroll indicator with animation

### About Section
- ✅ Restaurant story with cultural context
- ✅ Floating 5-star review badge
- ✅ Icon-based values list (Heart, Award, Star, Check)
- ✅ Animated statistics (10+ Years, 50+ Dishes, 100% Fresh)
- ✅ Scroll-triggered animations

### Menu
- ✅ Interactive category tabs with active indicator
- ✅ Animated category transitions
- ✅ Image-first dish cards
- ✅ Popular badges and spicy indicators
- ✅ Hover effects (scale, shadow, border)
- ✅ 5 categories: Rice Dishes, Meat & Fish, Stews, Sides, Drinks

### Online Ordering
- ✅ Bold DoorDash card (red theme)
- ✅ Bold Uber Eats card (black theme)
- ✅ Phone order option with flag gradient
- ✅ Hover animations
- ✅ External link icons

### Location & Hours
- ✅ Google Maps embed
- ✅ Operating hours for all days
- ✅ Flag gradient special notice
- ✅ Icon-based layout (MapPin, Clock)

### Contact
- ✅ Contact cards (Phone, Email, Location)
- ✅ Contact form with validation
- ✅ Flag gradient submit button
- ✅ Toast notifications
- ✅ Colored icons (Red, Yellow, Green)

### Footer
- ✅ Flag accent top border
- ✅ Restaurant logo
- ✅ Quick links, hours, contact
- ✅ Modern, premium feel

---

## Technical Stack

### Frontend
- React 19
- Framer Motion (animations)
- React Intersection Observer (scroll triggers)
- Shadcn/UI components
- Tailwind CSS
- Lucide React icons

### Fonts
- Bebas Neue (Google Fonts)
- Playfair Display (Google Fonts)
- Inter (Google Fonts)

---

## Next Action Items

### P0 - Critical
- [ ] Build FastAPI backend with MongoDB
- [ ] Implement menu management API
- [ ] Implement contact form submission endpoint
- [ ] Add actual DoorDash restaurant URL
- [ ] Add actual Uber Eats restaurant URL
- [ ] Connect frontend to backend APIs
- [ ] Remove mock data

### P1 - High Priority
- [ ] Add sticky "Order Now" button for mobile
- [ ] Implement menu item search/filter
- [ ] Add SEO meta tags
- [ ] Optimize images for web (WebP format)
- [ ] Add Google Analytics
- [ ] Implement smooth scroll polyfill for older browsers
- [ ] Add loading states

### P2 - Nice to Have
- [ ] Customer testimonials carousel
- [ ] Instagram feed integration
- [ ] Online reservation system
- [ ] Catering inquiry form
- [ ] Newsletter signup
- [ ] Blog for recipes and stories
- [ ] Multi-language support (English/French)

---

## Mocked Components

- All menu data in `mockData.js`
- Contact form submission (shows toast, doesn't save)
- DoorDash URL: placeholder
- Uber Eats URL: placeholder

---

**Last Updated**: February 7, 2026  
**Current Status**: Bold Modern Redesign Complete - Frontend with Animations
**Next Phase**: Backend Development + Real Data Integration
