import { motion } from "framer-motion";
import { PRICE } from "../../lib/content";

export const Nav = ({ onBuy }) => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
      data-testid="site-nav"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mt-4 flex items-center justify-between rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-2.5" data-testid="nav-logo">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-accent text-white font-display font-black text-lg leading-none">+</span>
            <span className="font-display font-bold tracking-tight text-ink text-[15px]">
              MASTERBOOK
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["Inside", "#inside"],
              ["Why", "#why"],
              ["Reviews", "#reviews"],
              ["Pricing", "#pricing"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-smoke transition-colors hover:text-ink"
                data-testid={`nav-link-${label.toLowerCase()}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            onClick={onBuy}
            data-testid="nav-buy-button"
            className="group relative overflow-hidden rounded-full bg-accent px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105 glow-accent"
          >
            Get Access · ₹{PRICE}
          </button>
        </div>
      </div>
    </motion.header>
  );
};
