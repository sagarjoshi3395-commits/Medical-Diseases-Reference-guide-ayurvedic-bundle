import { motion } from "framer-motion";
import { STEPS, PHONE_IMG } from "../../lib/content";
import { Reveal } from "./MaskText";

export const HowItHelps = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-surface/40 py-24 lg:py-32" data-testid="how-section">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">How it helps you</span>
          <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-ink sm:text-5xl">
            Simple. Fast.<br />Practical.
          </h2>
          <p className="mt-6 max-w-md text-smoke">
            Instead of wasting time searching everywhere — three steps and you're back to
            work or study.
          </p>

          <div className="mt-10 space-y-2">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.no}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group flex items-center gap-5 rounded-xl border border-transparent p-4 transition-colors hover:border-white/10 hover:bg-black/40"
                data-testid={`step-${s.no}`}
              >
                <span className="font-mono text-sm font-bold text-accent">{s.no}</span>
                <div>
                  <div className="font-display text-lg font-bold text-ink">{s.title}</div>
                  <div className="text-sm text-smoke">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-sm">
            <div className="absolute inset-0 scale-110 rounded-full blur-[80px] radial-fade" />
            <motion.img
              src={PHONE_IMG}
              alt="Searchable medical PDF on phone"
              className="relative w-full rounded-3xl border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
