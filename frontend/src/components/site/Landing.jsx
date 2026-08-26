import React from "react";
import { Navbar, StickyCta } from "./Navbar";
import { Hero } from "./Hero";
import { InsideHighlights, WhyCreated, BundleCards, DiseaseTopics, MedicineCategories, HowPresented, Bilingual, WhoFor, WhatYouReceive, DisclaimerCard, AccessSteps, FinalCta } from "./Sections";
import { SamplePages } from "./SamplePages";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { Footer } from "./Footer";
import { SalesTicker } from "./SalesTicker";

export const Landing = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <SamplePages />
      <InsideHighlights />
      <WhyCreated />
      <BundleCards />
      <DiseaseTopics />
      <MedicineCategories />
      <HowPresented />
      <Bilingual />
      <WhoFor />
      <WhatYouReceive />
      <DisclaimerCard />
      <AccessSteps />
      <Pricing />
      <Faq />
      <FinalCta />
    </main>
    <Footer />
    <StickyCta />
    <SalesTicker />
  </>
);
