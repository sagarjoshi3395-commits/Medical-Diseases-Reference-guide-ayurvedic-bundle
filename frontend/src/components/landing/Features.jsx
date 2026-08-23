import { Pill, Languages, Search, WifiOff, BadgeCheck } from "lucide-react";
import { FEATURES } from "../../lib/content";
import { Reveal } from "./MaskText";

const ICONS = { Pill, Languages, Search, WifiOff, BadgeCheck };

export const Features = () => {
  return (
    <section id="inside" className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32" data-testid="features-section">
      <Reveal className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">What you get inside</span>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-ink sm:text-6xl">
            Everything in one place
          </h2>
        </div>
        <p className="max-w-sm text-smoke">
          A complete medical reference, built for speed. No fluff, no jargon — just the
          essentials you actually look up.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {FEATURES.map((f, i) => {
          const Icon = f.icon ? ICONS[f.icon] : null;
          return (
            <Reveal
              key={f.k}
              delay={i * 0.05}
              className={`${f.span || "md:col-span-4"}`}
            >
              <div
                data-testid={`feature-${f.k}`}
                className={`group relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-colors duration-300 ${
                  f.accent
                    ? "border-accent/30 bg-accent/[0.06] hover:border-accent"
                    : "border-white/10 bg-surface hover:border-cyan/50"
                }`}
              >
                {f.stat ? (
                  <div>
                    <div className={`font-display text-6xl font-black tracking-tighter sm:text-7xl ${f.accent ? "text-accent" : "text-ink"}`}>
                      {f.stat}
                    </div>
                    <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-smoke">
                      {f.label}
                    </div>
                  </div>
                ) : (
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-black/40 text-cyan">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                )}

                <div className="mt-6">
                  {f.title && (
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink">{f.title}</h3>
                  )}
                  <p className="mt-2 text-sm leading-relaxed text-smoke">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};
