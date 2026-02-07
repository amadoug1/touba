import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { MenuShowcase } from "./components/MenuShowcase";
import { OrderingSection } from "./components/OrderingSection";
import { LocationHours } from "./components/LocationHours";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <MenuShowcase />
        <OrderingSection />
        <LocationHours />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
