import { motion } from "framer-motion";

// Masked line-by-line reveal. Pass an array of lines.
export const MaskText = ({ lines, className = "", delay = 0, testId }) => {
  return (
    <span className={className} data-testid={testId}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// Generic scroll reveal wrapper
export const Reveal = ({ children, className = "", delay = 0, y = 32 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
