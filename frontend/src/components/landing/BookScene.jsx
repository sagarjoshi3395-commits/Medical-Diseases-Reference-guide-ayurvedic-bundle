import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BOOK_IMG } from "../../lib/content";

export const BookScene = () => {
  const wrap = useRef(null);
  const [tilt, setTilt] = useState({ x: -6, y: -14 });
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -12, y: px * 24 });
  };
  const reset = () => setTilt({ x: -6, y: -14 });

  return (
    <motion.div
      ref={wrap}
      style={{ y, opacity }}
      className="relative flex items-center justify-center"
      data-testid="hero-book"
    >
      {/* glow */}
      <div className="absolute inset-0 blur-[90px] rounded-full radial-fade scale-125" />
      <div
        className="relative"
        style={{ perspective: "1400px" }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
      >
        <motion.div
          className="animate-float"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
        >
          <motion.img
            src={BOOK_IMG}
            alt="Medical Masterbook 3D cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[300px] sm:w-[360px] lg:w-[420px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)] select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
