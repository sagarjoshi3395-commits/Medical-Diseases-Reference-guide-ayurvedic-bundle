import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Pill } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Reveal, SectionHead } from "./ui";
import { SAMPLES } from "../../lib/siteContent";
import { useBuy } from "./BuyContext";

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

const SampleGrid = ({ items, onOpen }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
    {items.map((s, i) => (
      <Reveal key={s.title} delay={(i % 3) * 0.05}>
        <button onClick={() => onOpen(i)} className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-white text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-card" data-testid={`sample-${i}`}>
          <div className="aspect-[3/4] overflow-hidden"><img src={s.img} alt={`${s.title} illustrated reference page`} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" /></div>
          <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow-soft transition-opacity group-hover:opacity-100"><ZoomIn className="h-4 w-4" /></div>
          <div className="flex items-center justify-between px-3.5 py-3"><span className="text-sm font-bold text-navy">{s.title}</span><span className="text-xs text-slateink">{s.hi}</span></div>
        </button>
      </Reveal>
    ))}
  </div>
);

export const SamplePages = () => {
  const [index, setIndex] = useState(null);
  const { openBuy } = useBuy();
  const disease = SAMPLES;

  return (
    <section id="samples" className="container-x py-16 md:py-20 scroll-mt-20">
      <Reveal><SectionHead eyebrow="Preview" title="Preview Before You Buy" sub="See the actual style and structure of the reference guide. Tap any page to view it full-screen." /></Reveal>
      <div className="mt-9">
        <Tabs defaultValue="disease" className="w-full">
          <TabsList className="mx-auto mb-8 flex w-full max-w-sm rounded-full bg-mist p-1">
            <TabsTrigger value="disease" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-soft">Disease Guide</TabsTrigger>
            <TabsTrigger value="medicine" className="flex-1 rounded-full data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-soft">Medicine Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="disease"><SampleGrid items={disease} onOpen={setIndex} /></TabsContent>
          <TabsContent value="medicine">
            <div className="mx-auto max-w-lg rounded-2xl border-2 border-dashed border-line bg-mist p-10 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-grape/10 text-grape"><Pill className="h-7 w-7" /></span>
              <h3 className="mt-4 font-display text-xl font-extrabold text-navy">Medicine sample pages</h3>
              <p className="mt-2 text-sm text-slateink">Medicine reference pages follow the same clean, illustrated format — drug class, main uses, common side effects, important warnings and key points, clearly separated for quick review.</p>
              <button onClick={openBuy} className="btn-navy mt-5">Get the Complete Bundle</button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slateink">Sample pages are provided to demonstrate the design, structure and type of educational information included in the guides.</p>
      <Lightbox items={disease} index={index} setIndex={setIndex} />
    </section>
  );
};
