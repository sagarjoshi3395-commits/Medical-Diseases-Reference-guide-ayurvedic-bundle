import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PRICE } from "../../lib/content";

export const StickyCTA = ({ onBuy }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/15 bg-black/70 px-4 py-3 pl-6 shadow-2xl backdrop-blur-xl"
          data-testid="sticky-cta"
        >
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-ink">Medical Masterbook PDF</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-smoke">
              ₹{PRICE} · Lifetime access
            </div>
          </div>
          <button
            onClick={onBuy}
            data-testid="sticky-buy-button"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            Get Access · ₹{PRICE}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
