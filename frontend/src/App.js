import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { HeroAnimated } from "./components/HeroAnimated";
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
        <HeroAnimated />
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
