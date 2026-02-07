# Touba African Restaurant - Product Requirements Document

## Project Overview
**Product Name**: Touba African Restaurant Website  
**Type**: Restaurant Website with Online Ordering Integration  
**Tech Stack**: React (Frontend), FastAPI (Backend - Pending), MongoDB (Database - Pending)  
**Location**: 428 W Olney Ave, Philadelphia, PA 19120  
**Phone**: (215) 403-7409

---

## Original Problem Statement
Build a modern, visually rich, and mobile-friendly restaurant website for Touba African Restaurant, specializing in authentic Senegalese and West African cuisine with the following goals:
- Showcase food visually to make users hungry
- Allow customers to easily order food online
- Improve local SEO and online discoverability

---

## User Personas

### Primary Persona: Local Food Lover
- **Age**: 25-45
- **Location**: Philadelphia area
- **Goals**: Discover authentic African cuisine, order delivery/pickup
- **Behaviors**: Uses DoorDash/Uber Eats, searches "African food near me"

### Secondary Persona: African Diaspora
- **Age**: 30-60
- **Location**: Philadelphia metro
- **Goals**: Find authentic home-style African cooking
- **Behaviors**: Values authenticity, reads reviews, calls ahead

### Tertiary Persona: Adventurous Eater
- **Age**: 20-40
- **Location**: Philadelphia
- **Goals**: Try new cuisines, Instagram-worthy food
- **Behaviors**: Shares food photos, follows food blogs

---

## Core Requirements (Static)

### Functional Requirements
1. **Homepage**: Hero section with strong headline and CTAs
2. **Menu Showcase**: Visual menu with categories, images, prices, descriptions
3. **Online Ordering**: Integration with DoorDash & Uber Eats
4. **Location & Hours**: Google Maps embed, operating schedule
5. **Contact Form**: Name, email, phone, message fields
6. **Mobile Responsive**: Works on all device sizes
7. **SEO Optimized**: Meta tags, semantic HTML, location keywords

### Design Requirements (Lime-Yellow Design Guidelines)
- Primary Background: #ECEC75 (bright lime-yellow)
- Card Background: #e6e67c (slightly darker tint)
- Buttons: Black (#0f172a) with white text
- Typography: Crimson Text (serif) for headings, sans-serif for body
- Generous spacing (2-3x more than typical)
- No dark gradients or purple/pink combinations
- Clean, modern layout with strong visual hierarchy

### Technical Requirements
- React with shadcn/ui components
- FastAPI backend (planned)
- MongoDB database (planned)
- Mobile-first responsive design
- Fast loading times

---

## Implementation History

### Phase 1 - Frontend MVP (Completed: Feb 7, 2025)

**Files Created:**
- `/app/frontend/src/mockData.js` - Menu items, restaurant info, hours
- `/app/frontend/src/components/Header.jsx` - Sticky navigation with mobile menu
- `/app/frontend/src/components/Hero.jsx` - Hero section with CTAs
- `/app/frontend/src/components/About.jsx` - Restaurant story and values
- `/app/frontend/src/components/MenuShowcase.jsx` - Visual menu with categories
- `/app/frontend/src/components/OrderingSection.jsx` - DoorDash/Uber Eats integration
- `/app/frontend/src/components/LocationHours.jsx` - Location with Google Maps
- `/app/frontend/src/components/Contact.jsx` - Contact form and info
- `/app/frontend/src/components/Footer.jsx` - Footer with links and contact
- `/app/frontend/src/App.js` - Main app component (updated)
- `/app/frontend/src/App.css` - Custom styles with design guidelines (updated)
- `/app/frontend/src/index.css` - Base styles with Google Fonts (updated)

**Features Implemented:**
- Complete restaurant website with all core sections
- 11 high-quality African cuisine images from Unsplash
- 5 menu categories: Rice Dishes, Meat & Fish, Stews, Sides, Drinks
- DoorDash & Uber Eats deep linking (placeholder URLs)
- Google Maps embed for location
- Contact form with toast notifications (mock submission)
- Full mobile responsiveness
- Smooth scroll navigation
- SEO-friendly structure

**Design Implementation:**
- Lime-yellow (#ECEC75) primary background
- Black buttons with hover effects
- Crimson Text serif headings
- Generous spacing throughout
- High-contrast, accessible design
- Professional food photography

**Status**: ✅ Frontend complete with mock data

---

## API Contracts (To Be Implemented)

### GET /api/restaurant/info
**Response:**
```json
{
  "name": "Touba African Restaurant",
  "phone": "(215) 403-7409",
  "address": "428 W Olney Ave",
  "city": "Philadelphia",
  "state": "PA",
  "zipCode": "19120",
  "hours": { ... }
}
```

### GET /api/menu
**Response:**
```json
{
  "categories": [
    {
      "id": "rice-dishes",
      "name": "Rice Dishes",
      "items": [ ... ]
    }
  ]
}
```

### POST /api/contact
**Request:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string"
}
```

### GET /api/ordering-options
**Response:**
```json
{
  "doordash_url": "string",
  "ubereats_url": "string"
}
```

---

## Prioritized Backlog

### P0 - Critical (Next Phase)
- [ ] Build FastAPI backend with MongoDB
- [ ] Implement restaurant info API endpoints
- [ ] Implement menu management API
- [ ] Implement contact form submission to database
- [ ] Add actual DoorDash restaurant URL
- [ ] Add actual Uber Eats restaurant URL
- [ ] Connect frontend to backend APIs
- [ ] Remove mock data, use real data

### P1 - High Priority
- [ ] Add testimonials/reviews section
- [ ] Implement menu item search/filter
- [ ] Add "Popular Items" highlighted section
- [ ] Implement image optimization
- [ ] Add loading states for all sections
- [ ] Implement form validation with error messages
- [ ] Add Google Analytics tracking
- [ ] Implement SEO meta tags

### P2 - Nice to Have
- [ ] Instagram feed integration
- [ ] Online reservation system
- [ ] Catering inquiry form
- [ ] Newsletter signup
- [ ] Loyalty program information
- [ ] Special offers/promotions section
- [ ] Blog for recipes and stories
- [ ] Multi-language support (English/French)

---

## Mocked Components

### Mock Data
- All menu items in `mockData.js`
- Restaurant hours in `mockData.js`
- DoorDash URL: placeholder `https://doordash.com`
- Uber Eats URL: placeholder `https://ubereats.com`

### Mock Functionality
- Contact form submission (shows toast, doesn't save)
- Navigation smooth scrolling (frontend only)
- All interactive elements work as UI elements only

---

## Integration Notes

### DoorDash & Uber Eats Integration
**Current Status**: Deep linking with placeholder URLs  
**Integration Playbook**: Received from integration_playbook_expert_v2  
**Approach**: Simple deep linking (no API keys needed initially)  
**Next Steps**: 
1. Get actual restaurant URLs from DoorDash Merchant Portal
2. Get actual restaurant URLs from Uber Eats Manager
3. Update `mockData.js` with real URLs
4. Optional: Add embedded widgets for in-site ordering

---

## Next Tasks
1. **Backend Development**: Set up FastAPI with MongoDB
2. **API Implementation**: Build endpoints for menu, contact, restaurant info
3. **Frontend Integration**: Connect React to backend APIs
4. **Testing**: End-to-end testing with testing_agent_v3
5. **Real Data**: Replace mock data with database queries
6. **URL Updates**: Add real DoorDash/Uber Eats restaurant links
7. **SEO Enhancement**: Add meta tags, structured data
8. **Performance**: Optimize images, lazy loading

---

## Success Metrics
- Website loading time < 3 seconds
- Mobile responsiveness on all devices
- Clear CTAs with high visibility
- Menu images load correctly
- Contact form submissions working
- Order buttons direct to correct platforms
- SEO: Rank for "African restaurant Philadelphia"

---

**Last Updated**: February 7, 2025  
**Current Status**: Frontend MVP Complete - Ready for Backend Development
