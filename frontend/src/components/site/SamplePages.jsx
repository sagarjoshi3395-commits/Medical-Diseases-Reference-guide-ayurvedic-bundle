import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Reveal, SectionHead } from "./ui";
import { Coverflow } from "./Coverflow";
import { DISEASE_SAMPLES, MEDICINE_SAMPLES } from "../../lib/siteContent";

const Lightbox = ({ items, index, setIndex }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, setIndex]);
  if (index === null) return null;
  const item = items[index];
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-sm" onClick={() => setIndex(null)} data-testid="lightbox">
      <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" onClick={() => setIndex(null)} aria-label="Close"><X className="h-6 w-6" /></button>
      <button className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6" onClick={(e) => { e.stopPropagation(); setIndex((i) => (i - 1 + items.length) % items.length); }} aria-label="Previous"><ChevronLeft className="h-6 w-6" /></button>
      <button className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6" onClick={(e) => { e.stopPropagation(); setIndex((i) => (i + 1) % items.length); }} aria-label="Next"><ChevronRight className="h-6 w-6" /></button>
      <figure className="max-h-[90vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.img} alt={`${item.title} full reference page`} className="mx-auto max-h-[82vh] w-auto rounded-xl object-contain shadow-2xl" />
        <figcaption className="mt-3 text-center text-sm text-white/80">{item.title} <span className="text-white/50">| {item.hi}</span></figcaption>
      </figure>
    </div>
  );
};

export const SamplePages = () => {
  const [lb, setLb] = useState({ list: DISEASE_SAMPLES, index: null });
  const openDisease = (i) => setLb({ list: DISEASE_SAMPLES, index: i });
  const openMedicine = (i) => setLb({ list: MEDICINE_SAMPLES, index: i });
  const setIndex = (updater) => setLb((s) => ({ ...s, index: typeof updater === "function" ? updater(s.index) : updater }));

  return (
    <section id="samples" className="border-y border-line bg-mist py-16 md:py-20 scroll-mt-20">
      <div className="container-x">
        <Reveal><SectionHead eyebrow="Preview" title="Preview Before You Buy" sub="Swipe or use the arrows to flip through actual pages. Tap the centre page to view it full-screen." /></Reveal>
        <div className="mt-9">
          <Tabs defaultValue="disease" className="w-full">
            <TabsList className="mx-auto mb-10 flex w-full max-w-sm rounded-full bg-white p-1 shadow-soft">
              <TabsTrigger value="disease" className="flex-1 rounded-full data-[state=active]:bg-teal data-[state=active]:text-white">Disease Guide</TabsTrigger>
              <TabsTrigger value="medicine" className="flex-1 rounded-full data-[state=active]:bg-teal data-[state=active]:text-white">Medicine Guide</TabsTrigger>
            </TabsList>
            <TabsContent value="disease">
              <Coverflow items={DISEASE_SAMPLES} onOpen={openDisease} testid="disease-flow" />
            </TabsContent>
            <TabsContent value="medicine">
              <Coverflow items={MEDICINE_SAMPLES} onOpen={openMedicine} testid="medicine-flow" />
            </TabsContent>
          </Tabs>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slateink">Sample pages are provided to demonstrate the design, structure and type of educational information included in the guides.</p>
      </div>
      <Lightbox items={lb.list} index={lb.index} setIndex={setIndex} />
    </section>
  );
};
