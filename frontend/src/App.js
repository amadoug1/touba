import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { HeroAnimated } from "./components/HeroAnimated";
import { AboutAnimated } from "./components/AboutAnimated";
import { MenuAnimated } from "./components/MenuAnimated";
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
        <AboutAnimated />
        <MenuAnimated />
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
