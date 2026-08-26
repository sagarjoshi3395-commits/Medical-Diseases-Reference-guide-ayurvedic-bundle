import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export const Coverflow = ({ items, onOpen, testid = "coverflow" }) => {
  const [active, setActive] = useState(0);
  const [cardW, setCardW] = useState(280);
  const ref = useRef(null);
  const touch = useRef({ x: 0, active: false });

  useEffect(() => {
    const measure = () => {
      const w = ref.current?.offsetWidth || 900;
      setCardW(Math.max(240, Math.min(420, w * 0.52)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const cardH = cardW * 1.36;
  const go = (dir) => setActive((a) => Math.min(items.length - 1, Math.max(0, a + dir)));

  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, active: true }; };
  const onTouchEnd = (e) => {
    if (!touch.current.active) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touch.current.active = false;
  };

  return (
    <div className="select-none" data-testid={testid}>
      <div
        ref={ref}
        className="relative mx-auto flex items-center justify-center overflow-hidden"
        style={{ height: cardH + 40 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {items.map((s, i) => {
          const rel = i - active;
          const abs = Math.abs(rel);
          if (abs > 2) return null;
          const x = rel * (cardW * 0.62);
          const scale = 1 - abs * 0.16;
          const rotateY = rel * -16;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : 0.35;
          const isCenter = abs === 0;
          return (
            <motion.button
              key={s.title}
              type="button"
              onClick={() => (isCenter ? onOpen?.(i) : setActive(i))}
              className="group absolute top-5 overflow-hidden rounded-2xl border border-line bg-white shadow-card"
              style={{ width: cardW, height: cardH, marginLeft: -cardW / 2, left: "50%", transformStyle: "preserve-3d" }}
              animate={{ x, scale, rotateY, opacity, zIndex: 20 - abs }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              data-testid={`${testid}-card-${i}`}
              aria-label={s.title}
            >
              <img src={s.img} alt={`${s.title} reference page`} className="h-full w-full object-cover object-top" loading="lazy" draggable="false" />
              {isCenter && (
                <>
                  <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-navy shadow-soft"><ZoomIn className="h-4 w-4" /></div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-4 pb-3 pt-8 text-left">
                    <p className="text-sm font-bold text-white">{s.title}</p>
                    <p className="text-xs text-white/70">{s.hi}</p>
                  </div>
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <button onClick={() => go(-1)} disabled={active === 0} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy shadow-soft transition hover:border-teal/50 disabled:opacity-40" aria-label="Previous" data-testid={`${testid}-prev`}><ChevronLeft className="h-5 w-5" /></button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-teal" : "w-2 bg-line"}`} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </div>
        <button onClick={() => go(1)} disabled={active === items.length - 1} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy shadow-soft transition hover:border-teal/50 disabled:opacity-40" aria-label="Next" data-testid={`${testid}-next`}><ChevronRight className="h-5 w-5" /></button>
      </div>
    </div>
  );
};
