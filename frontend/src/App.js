import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { HeroAnimated } from "./components/HeroAnimated";
import { AboutAnimated } from "./components/AboutAnimated";
import { MenuAnimated } from "./components/MenuAnimated";
import { OrderingAnimated } from "./components/OrderingAnimated";
import { LocationAnimated } from "./components/LocationAnimated";
import { ContactAnimated } from "./components/ContactAnimated";
import { FooterAnimated } from "./components/FooterAnimated";
import { Toaster } from "./components/ui/sonner";

const HomePage = () => (
  <>
    <HeroAnimated />
    <AboutAnimated />
    <MenuAnimated />
    <OrderingAnimated />
    <LocationAnimated />
    <ContactAnimated />
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
