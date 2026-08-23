import { useState } from "react";
import "@/App.css";
import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";

import { Nav } from "./components/landing/Nav";
import { Hero } from "./components/landing/Hero";
import { TrustMarquee } from "./components/landing/TrustMarquee";
import { Manifesto } from "./components/landing/Manifesto";
import { Features } from "./components/landing/Features";
import { HowItHelps } from "./components/landing/HowItHelps";
import { Audience } from "./components/landing/Audience";
import { Testimonials } from "./components/landing/Testimonials";
import { Pricing } from "./components/landing/Pricing";
import { FAQ } from "./components/landing/FAQ";
import { Footer } from "./components/landing/Footer";
import { StickyCTA } from "./components/landing/StickyCTA";
import { BuyDialog } from "./components/landing/BuyDialog";

function App() {
  const [buyOpen, setBuyOpen] = useState(false);
  const onBuy = () => setBuyOpen(true);

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <div className="App relative min-h-screen bg-obsidian">
        <div className="grain" />
        <Nav onBuy={onBuy} />
        <main>
          <Hero onBuy={onBuy} />
          <TrustMarquee />
          <Manifesto />
          <Features />
          <HowItHelps />
          <Audience />
          <Testimonials />
          <Pricing onBuy={onBuy} />
          <FAQ />
        </main>
        <Footer onBuy={onBuy} />
        <StickyCTA onBuy={onBuy} />
        <BuyDialog open={buyOpen} onOpenChange={setBuyOpen} />
        <Toaster theme="dark" position="top-center" richColors />
      </div>
    </ReactLenis>
  );
}

export default App;
