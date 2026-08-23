import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/content";
import { Reveal } from "./MaskText";

const Card = ({ t }) => (
  <div
    data-testid={`testimonial-${t.name.replace(/\s+/g, "-").toLowerCase()}`}
    className="w-[340px] shrink-0 rounded-2xl border border-white/10 bg-surface p-7 transition-colors hover:border-cyan/40 sm:w-[400px]"
  >
    <div className="flex gap-1 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-accent" />
      ))}
    </div>
    <p className="mt-5 text-[15px] leading-relaxed text-ink">"{t.quote}"</p>
    <div className="mt-6 flex items-center gap-3">
      <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full border border-white/10 object-cover" />
      <div>
        <div className="text-sm font-bold text-ink">{t.name}</div>
        <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">{t.role}</div>
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  const row1 = TESTIMONIALS.slice(0, 3);
  const row2 = TESTIMONIALS.slice(3);
  return (
    <section id="reviews" className="relative overflow-hidden py-24 lg:py-32" data-testid="testimonials-section">
      <Reveal className="mx-auto mb-14 max-w-7xl px-5 sm:px-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Loved by learners</span>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-ink sm:text-6xl">
          Trusted where it counts
        </h2>
      </Reveal>

      <div className="space-y-5">
        {[row1, row2].map((row, ri) => (
          <motion.div
            key={ri}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex gap-5 px-5 sm:px-8"
            style={{ marginLeft: ri === 1 ? "-40px" : 0 }}
          >
            {row.concat(row).map((t, i) => (
              <Card key={`${ri}-${i}`} t={t} />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
