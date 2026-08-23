import { motion } from "framer-motion";
import { AUDIENCE, AUDIENCE_IMG } from "../../lib/content";
import { Reveal } from "./MaskText";

export const Audience = () => {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32" data-testid="audience-section">
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <img
              src={AUDIENCE_IMG}
              alt="Medical student studying with reference book"
              className="h-[460px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
            <div className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-md">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
                Used by thousands of learners
              </span>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Perfect for</span>
            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-ink sm:text-6xl">
              Made for people who study &amp; treat
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-3">
            {AUDIENCE.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                data-testid={`audience-${i}`}
                className="rounded-full border border-white/10 bg-surface px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {a}
              </motion.span>
            ))}
          </div>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-lg text-smoke">
              Whether it's a night-before-exam revision or a quick check on a busy shift —
              the Masterbook keeps your reference material organised in one place.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
