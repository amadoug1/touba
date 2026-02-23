import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { HeroAnimated } from "./components/HeroAnimated";
import { FooterAnimated } from "./components/FooterAnimated";
import { Toaster } from "./components/ui/sonner";

const AboutAnimated = lazy(() => import("./components/AboutAnimated").then((m) => ({ default: m.AboutAnimated })));
const MenuShowcaseWithCart = lazy(() => import("./components/MenuShowcaseWithCart").then((m) => ({ default: m.MenuShowcaseWithCart })));
const CheckoutSection = lazy(() => import("./components/CheckoutSection"));
const OrderingAnimated = lazy(() => import("./components/OrderingAnimated").then((m) => ({ default: m.OrderingAnimated })));
const LocationAnimated = lazy(() => import("./components/LocationAnimated").then((m) => ({ default: m.LocationAnimated })));
const ContactAnimated = lazy(() => import("./components/ContactAnimated").then((m) => ({ default: m.ContactAnimated })));

const HomePage = () => (
  <>
    <HeroAnimated />
    <Suspense fallback={null}>
      <AboutAnimated />
    </Suspense>
    <Suspense fallback={null}>
      <MenuShowcaseWithCart />
    </Suspense>
    <Suspense fallback={null}>
      <CheckoutSection />
    </Suspense>
    <Suspense fallback={null}>
      <OrderingAnimated />
    </Suspense>
    <Suspense fallback={null}>
      <LocationAnimated />
    </Suspense>
    <Suspense fallback={null}>
      <ContactAnimated />
    </Suspense>
  </>
);

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Checkout and confirmation routes will be added here */}
            </Routes>
          </main>
          <FooterAnimated />
          <Toaster />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
