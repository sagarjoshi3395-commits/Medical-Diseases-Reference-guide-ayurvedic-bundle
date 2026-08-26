import React from "react";
import { Check, ArrowRight, ChevronDown, BookOpenCheck, Languages, TriangleAlert, GraduationCap, Layers } from "lucide-react";
import { Reveal, Eyebrow } from "./ui";
import { HERO_CHIPS, COVERS } from "../../lib/siteContent";
import { useBuy } from "./BuyContext";

const STATS = [
  { icon: Layers, n: "140+", l: "Topics" },
  { icon: BookOpenCheck, n: "2", l: "Guides" },
  { icon: Languages, n: "EN + HI", l: "Bilingual" },
  { icon: GraduationCap, n: "PDF", l: "Digital" },
];

export const Hero = () => {
  const { openBuy, config } = useBuy();
  const price = config?.price ?? 290;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[620px] bg-gradient-to-b from-mist via-white to-white" />
        <div className="absolute -left-24 top-6 h-72 w-72 rounded-full bg-teal/15 blur-3xl" />
        <div className="absolute right-0 top-48 h-80 w-80 rounded-full bg-grape/10 blur-3xl" />
        <div className="absolute left-1/2 top-24 h-64 w-64 rounded-full bg-grassy/10 blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-12 py-12 md:grid-cols-2 md:py-20">
        {/* LEFT */}
        <div>
          <Reveal><Eyebrow>Illustrated • Structured • Quick Revision</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-[2.5rem] font-extrabold leading-[1.03] text-navy sm:text-5xl md:text-[3.4rem]">
              Medical Topics,<br className="hidden sm:block" /> Made Easier to{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal to-grassy bg-clip-text text-transparent">Review.</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none"><path d="M2 7C40 2 160 2 198 7" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" opacity="0.5"/></svg>
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slateink sm:text-base">
              Explore <span className="font-bold text-navy">140+ Disease &amp; Medicine topics</span> through colourful, structured pages — clear sections with illustrations, icons and highlighted key points instead of long walls of text.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_CHIPS.map((c) => (
                <span key={c} className="chip"><Check className="h-3.5 w-3.5 text-grassy" /> {c}</span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={openBuy} data-testid="hero-buy" className="btn-primary text-base">
                Get the Complete Guide <ArrowRight className="h-5 w-5" />
              </button>
              <a href="#samples" className="btn-ghost">View Sample Pages <ChevronDown className="h-4 w-4" /></a>
            </div>
            <p className="mt-4 text-[13px] text-slateink">Digital educational content • Not a prescription • No dosage guidance</p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 grid max-w-md grid-cols-4 gap-3 border-t border-line pt-6">
              {STATS.map((s) => (
                <div key={s.l} className="text-center">
                  <s.icon className="mx-auto h-5 w-5 text-teal" />
                  <div className="mt-1.5 font-display text-lg font-extrabold leading-none text-navy">{s.n}</div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-slateink">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* RIGHT — bundle mockup with floating tags */}
        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto flex max-w-md items-end justify-center">
            <div className="absolute -right-2 -top-4 z-30 flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-navy shadow-card">
              <BookOpenCheck className="h-4 w-4 text-teal" /> 2 Illustrated Guides
            </div>
            <div className="absolute -left-3 top-24 z-30 flex animate-float items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-navy shadow-card" style={{ animationDelay: "0.4s" }}>
              <Languages className="h-3.5 w-3.5 text-teal" /> English + Hindi
            </div>
            <div className="absolute -left-1 bottom-24 z-30 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-danger shadow-card">
              <TriangleAlert className="h-3.5 w-3.5" /> Red Flags included
            </div>
            {/* medicine cover (behind) */}
            <img src={COVERS.medicine} alt="Medicines Reference Guide book cover" className="absolute right-0 z-10 w-[58%] translate-x-6 translate-y-2 rotate-6 drop-shadow-2xl" loading="lazy" />
            {/* disease cover (front) */}
            <img src={COVERS.disease} alt="Diseases Reference Guide book cover" className="relative z-20 w-[64%] -rotate-3 drop-shadow-2xl animate-float" />
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
