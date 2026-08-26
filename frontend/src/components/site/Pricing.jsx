import React from "react";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { Reveal, SectionHead } from "./ui";
import { useBuy } from "./BuyContext";

export const Pricing = () => {
  const { openBuy, config } = useBuy();
  const price = config?.price ?? 299;
  const includes = [
    "Illustrated Disease Reference Guide (PDF)",
    "Illustrated Medicine Reference Guide (PDF)",
    "140+ Disease & Medicine topics combined",
    "Structured, colourful quick-revision format",
    "English + Hindi content where included",
    "Digital access after successful payment",
  ];
  return (
    <section id="pricing" className="container-x py-16 md:py-20 scroll-mt-20">
      <Reveal><SectionHead eyebrow="Pricing" title="Get the Medical Reference Guide Bundle" /></Reveal>
      <Reveal delay={0.08}>
        <div className="mx-auto mt-10 max-w-lg overflow-hidden rounded-3xl border border-line bg-white shadow-card">
          <div className="bg-gradient-to-br from-navy to-tealdark px-8 py-8 text-center text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">Complete Bundle • Digital</p>
            <div className="mt-3 flex items-end justify-center gap-1">
              <span className="font-display text-5xl font-extrabold">₹{price}</span>
            </div>
            <p className="mt-1 text-sm text-white/70">One-time purchase</p>
          </div>
          <div className="p-8">
            <ul className="space-y-3">
              {includes.map((it) => (
                <li key={it} className="flex items-start gap-3 text-[15px] text-navy"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-teal/15 text-teal"><Check className="h-3.5 w-3.5" /></span>{it}</li>
              ))}
            </ul>
            <button onClick={openBuy} data-testid="pricing-buy" className="btn-primary mt-7 w-full text-lg">Get Digital Access <ArrowRight className="h-5 w-5" /></button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-slateink"><ShieldCheck className="h-3.5 w-3.5 text-teal" /> One-time purchase • Digital product • Educational reference only</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
};
