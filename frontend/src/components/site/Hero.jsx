import React from "react";
import { Check, ArrowRight, ChevronDown, BookOpenCheck } from "lucide-react";
import { Reveal, Eyebrow } from "./ui";
import { HERO_CHIPS, COVERS } from "../../lib/siteContent";
import { useBuy } from "./BuyContext";

export const Hero = () => {
  const { openBuy, config } = useBuy();
  const price = config?.price ?? 299;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-grape/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-mist to-white" />
      </div>

      <div className="container-x grid items-center gap-12 py-14 md:grid-cols-2 md:py-20">
        {/* LEFT */}
        <div>
          <Reveal><Eyebrow>Illustrated • Structured • Quick Revision</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-[2.4rem] font-extrabold leading-[1.05] text-navy sm:text-5xl md:text-[3.3rem]">
              Medical Topics,<br /> Made Easier to <span className="text-teal">Review.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-[15px] font-semibold text-navy sm:text-lg">
              Explore 140+ Disease &amp; Medicine topics through colourful, structured reference guides.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slateink">
              Study common disease presentations and medicine information through visually organised pages designed for quick
              reference and revision — clear sections with illustrations, icons, diagrams and highlighted key points instead of
              long walls of text.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_CHIPS.map((c) => (
                <span key={c} className="chip"><Check className="h-3.5 w-3.5 text-grassy" /> {c}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={openBuy} data-testid="hero-buy" className="btn-primary">
                Get the Complete Guide <ArrowRight className="h-5 w-5" />
              </button>
              <a href="#samples" className="btn-ghost">View Sample Pages <ChevronDown className="h-4 w-4" /></a>
            </div>
            <p className="mt-4 text-[13px] text-slateink">Digital educational content • Not a prescription • No dosage guidance</p>
          </Reveal>
        </div>

        {/* RIGHT — bundle mockup (book covers) */}
        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto flex max-w-md items-end justify-center">
            <div className="absolute -right-2 -top-4 z-30 flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy shadow-card">
              <BookOpenCheck className="h-4 w-4 text-teal" /> 2 Illustrated Reference Guides
            </div>
            {/* medicine cover (behind, right) */}
            <img src={COVERS.medicine} alt="Medicines Reference Guide book cover" className="absolute right-0 z-10 w-[58%] translate-x-6 translate-y-2 rotate-6 drop-shadow-2xl" loading="lazy" />
            {/* disease cover (front, left) */}
            <img src={COVERS.disease} alt="Diseases Reference Guide book cover" className="relative z-20 w-[62%] -rotate-3 drop-shadow-2xl animate-float" />
            {/* price tag */}
            <div className="absolute -bottom-2 right-0 z-30 rounded-xl border border-line bg-white px-4 py-2 shadow-card">
              <div className="text-[11px] font-bold uppercase tracking-widest text-teal">One-time · Digital</div>
              <div className="font-display text-xl font-extrabold text-navy">₹{price}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
