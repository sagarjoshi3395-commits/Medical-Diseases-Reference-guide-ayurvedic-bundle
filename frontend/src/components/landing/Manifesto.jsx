import { motion } from "framer-motion";
import { MANIFESTO, SPREAD_IMG } from "../../lib/content";
import { Reveal } from "./MaskText";

export const Manifesto = () => {
  return (
    <section id="why" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:py-40" data-testid="manifesto-section">
      <Reveal className="mb-20 max-w-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">The Story</span>
        <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-ink sm:text-5xl">
          Why this book exists
        </h2>
      </Reveal>

      <div className="space-y-24 lg:space-y-40">
        {MANIFESTO.map((c, i) => (
          <div key={c.no} className="relative">
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute -top-16 left-0 select-none font-display font-black leading-none text-white/[0.04] text-[26vw] sm:text-[20vw] lg:text-[16vw]"
            >
              {c.no}
            </motion.span>

            <div className={`relative grid items-center gap-10 lg:grid-cols-12 ${i % 2 ? "" : ""}`}>
              <Reveal className={`lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-smoke">
                  / {c.label}
                </span>
                <h3 className="mt-4 font-display text-3xl font-black uppercase leading-[0.98] tracking-tight text-ink sm:text-5xl">
                  {c.title}
                </h3>
                <p className="mt-6 max-w-xl text-base text-smoke sm:text-lg">{c.body}</p>
              </Reveal>

              {i === 2 && (
                <Reveal delay={0.1} className="lg:col-span-5">
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={SPREAD_IMG}
                      alt="Open Medical Masterbook spread"
                      className="h-72 w-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
