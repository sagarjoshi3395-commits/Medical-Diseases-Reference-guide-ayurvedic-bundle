import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FAQS } from "../../lib/content";
import { Reveal } from "./MaskText";

export const FAQ = () => {
  return (
    <section className="relative mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-32" data-testid="faq-section">
      <Reveal className="mb-10 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Questions</span>
        <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-ink sm:text-5xl">
          Good to know
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-white/10"
              data-testid={`faq-${i}`}
            >
              <AccordionTrigger className="text-left font-display text-lg font-semibold text-ink hover:text-accent hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-smoke">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
};
