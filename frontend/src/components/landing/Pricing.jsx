import { motion } from "framer-motion";
import { Check, ArrowRight, Download, Smartphone, Infinity as InfinityIcon } from "lucide-react";
import { PRICE, AFTER } from "../../lib/content";
import { Reveal } from "./MaskText";

const ICONS = { Download, Smartphone, Infinity: InfinityIcon };

const INCLUDES = [
  "2,000+ medicine entries",
  "Uses + basic dosage reference + side effects",
  "Simple English + Hindi",
  "Clean & searchable PDF format",
  "Works fully offline",
  "One-time payment — no subscription",
];

export const Pricing = ({ onBuy }) => {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32" data-testid="pricing-section">
      <div className="absolute left-1/2 top-1/3 -z-0 h-72 w-72 -translate-x-1/2 rounded-full blur-[120px] radial-fade" />

      <Reveal className="relative mx-auto max-w-xl text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Simple pricing</span>
        <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-ink sm:text-6xl">
          One payment. Yours for life.
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="relative mx-auto mt-14 max-w-lg">
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.04] p-8 backdrop-blur-2xl sm:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-smoke">Medical Masterbook PDF</div>
              <div className="mt-3 flex items-end gap-2">
                <span className="font-display text-6xl font-black tracking-tighter text-ink">₹{PRICE}</span>
                <span className="mb-2 text-sm text-smoke line-through">₹999</span>
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-cyan">
                One-time · Lifetime access
              </div>
            </div>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
              71% off
            </span>
          </div>

          <ul className="mt-8 space-y-3">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <button
            onClick={onBuy}
            data-testid="pricing-buy-button"
            className="group mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-bold text-white transition-transform hover:scale-[1.02] glow-accent"
          >
            Get Instant Access · ₹{PRICE}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-center text-xs text-smoke">
            No monthly fees. No hidden charges.
          </p>
        </div>
      </Reveal>

      {/* What happens after purchase */}
      <div className="relative mx-auto mt-20 max-w-4xl">
        <Reveal className="mb-8 text-center">
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
            What happens after purchase?
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {AFTER.map((a, i) => {
            const Icon = ICONS[a.icon];
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                data-testid={`after-${i}`}
                className="rounded-2xl border border-white/10 bg-surface p-6 text-center"
              >
                <div className="mx-auto grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-black/40 text-cyan">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display font-bold text-ink">{a.title}</div>
                <div className="mt-1 text-sm text-smoke">{a.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
