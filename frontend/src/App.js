import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { HeroAnimated } from "./components/HeroAnimated";
import { AboutAnimated } from "./components/AboutAnimated";
import { MenuAnimated } from "./components/MenuAnimated";
import { OrderingAnimated } from "./components/OrderingAnimated";
import { LocationAnimated } from "./components/LocationAnimated";
import { ContactAnimated } from "./components/ContactAnimated";
import { FooterAnimated } from "./components/FooterAnimated";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroAnimated />
        <AboutAnimated />
        <MenuAnimated />
        <OrderingAnimated />
        <LocationAnimated />
        <ContactAnimated />
      </main>
      <FooterAnimated />
      <Toaster />
    </div>
  );
}

export default App;
