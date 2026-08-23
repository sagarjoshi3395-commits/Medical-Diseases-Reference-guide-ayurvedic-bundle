import Marquee from "react-fast-marquee";
import { MARQUEE_ITEMS } from "../../lib/content";

export const TrustMarquee = () => {
  return (
    <div className="border-y border-white/10 bg-surface/60 py-5" data-testid="trust-marquee">
      <Marquee speed={38} gradient gradientColor="#030303" gradientWidth={120}>
        {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8">
            <span className="font-mono text-sm uppercase tracking-[0.2em] text-smoke">
              {item}
            </span>
            <span className="text-accent">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
};
