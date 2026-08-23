import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ShieldCheck } from "lucide-react";
import { MaskText } from "./MaskText";
import { BookScene } from "./BookScene";
import { PRICE } from "../../lib/content";

export const Hero = ({ onBuy }) => {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden pt-28 lg:pt-0"
      data-testid="hero-section"
    >
      <div className="absolute inset-0 radial-fade" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center gap-10 px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-4">
        {/* Left */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
              200+ Pages · One PDF
            </span>
          </motion.div>

          <h1 className="font-display font-black uppercase leading-[0.92] tracking-tighter text-ink text-5xl sm:text-7xl lg:text-[5.6rem]">
            <MaskText
              testId="hero-heading"
              lines={["2,000+", "Medicines.", <span key="one" className="text-accent">One PDF.</span>]}
              delay={0.35}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-7 max-w-xl text-base text-smoke sm:text-lg"
          >
            Tired of searching through multiple books, apps &amp; random screenshots?
            The <span className="text-ink">Medical Masterbook</span> puts every medicine, dosage
            reference &amp; side effect in one clean, searchable, offline PDF — in simple
            English &amp; Hindi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <button
              onClick={onBuy}
              data-testid="hero-buy-button"
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-bold text-white transition-transform hover:scale-[1.04] glow-accent"
            >
              Get Instant Access · ₹{PRICE}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <div className="flex items-center gap-2 text-sm text-smoke">
              <ShieldCheck className="h-4 w-4 text-cyan" />
              One-time payment · Lifetime access
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6"
          >
            {[
              ["2,000+", "Medicines"],
              ["200+", "Pages"],
              ["₹290", "One-time"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-mono text-xl font-bold text-ink">{n}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <div className="w-full lg:col-span-5">
          <BookScene />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex"
      >
        <ArrowDown className="h-4 w-4 animate-bounce text-smoke" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-smoke">Scroll</span>
      </motion.div>
    </section>
  );
};
