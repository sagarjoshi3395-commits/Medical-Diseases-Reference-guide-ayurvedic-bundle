import React from "react";
import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", y = 24 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children }) => (
  <span className="eyebrow">{children}</span>
);

export const SectionHead = ({ eyebrow, title, sub, center = true }) => (
  <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
    <h2 className="h-section mt-4">{title}</h2>
    {sub ? <p className="mt-4 text-base leading-relaxed text-slateink sm:text-lg">{sub}</p> : null}
  </div>
);
