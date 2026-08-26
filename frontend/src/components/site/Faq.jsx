import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Reveal, SectionHead } from "./ui";
import { FAQS } from "../../lib/siteContent";

export const Faq = () => (
  <section id="faq" className="border-t border-line bg-mist scroll-mt-20">
    <div className="container-x py-16 md:py-20">
      <Reveal><SectionHead eyebrow="FAQ" title="Good to Know" /></Reveal>
      <Reveal delay={0.06}>
        <div className="mx-auto mt-9 max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="overflow-hidden rounded-2xl border border-line bg-white px-5">
                <AccordionTrigger className="py-5 text-left font-display text-[15px] font-bold text-navy hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-slateink">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Reveal>
    </div>
  </section>
);
