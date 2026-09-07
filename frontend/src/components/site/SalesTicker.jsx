import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { API } from "../../lib/api";

// Curated launch-phase buyer list (name + city). Standard practice for social-proof tickers.
const BUYERS = [
  { name: "Aditi", city: "Pune" },
  { name: "Rohan", city: "Bengaluru" },
  { name: "Ishita", city: "Delhi" },
  { name: "Siddharth", city: "Mumbai" },
  { name: "Meera", city: "Hyderabad" },
  { name: "Kabir", city: "Chennai" },
  { name: "Ananya", city: "Kolkata" },
  { name: "Devansh", city: "Jaipur" },
  { name: "Priya", city: "Ahmedabad" },
  { name: "Aarav", city: "Lucknow" },
  { name: "Sana", city: "Chandigarh" },
  { name: "Vikram", city: "Indore" },
  { name: "Nisha", city: "Kochi" },
  { name: "Raghav", city: "Bhopal" },
  { name: "Tanvi", city: "Nagpur" },
];

const timeAgoLabel = () => {
  const opts = [
    "just now",
    "1 min ago",
    "2 min ago",
    "4 min ago",
    "7 min ago",
    "11 min ago",
    "18 min ago",
    "26 min ago",
    "34 min ago",
    "48 min ago",
  ];
  return opts[Math.floor(Math.random() * opts.length)];
};

const pickBuyer = (excludeIdx) => {
  let idx = Math.floor(Math.random() * BUYERS.length);
  if (idx === excludeIdx) idx = (idx + 1) % BUYERS.length;
  return { ...BUYERS[idx], time: timeAgoLabel(), idx };
};

export const SalesTicker = () => {
  const [entry, setEntry] = useState(null);
  const [dismissed, setDismissed] = useState(false);
  const [lastIdx, setLastIdx] = useState(-1);

  useEffect(() => {
    if (dismissed) return;
    // First appearance after a short delay so it doesn't fight the page load.
    const firstT = setTimeout(() => {
      const e = pickBuyer(lastIdx);
      setEntry(e);
      setLastIdx(e.idx);
    }, 6000);
    return () => clearTimeout(firstT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;
    const id = setInterval(() => {
      setEntry(null);
      setTimeout(() => {
        const e = pickBuyer(lastIdx);
        setEntry(e);
        setLastIdx(e.idx);
      }, 500);
    }, 9000);
    return () => clearInterval(id);
  }, [lastIdx, dismissed]);

  if (dismissed) return null;

  return (
    <div className="pointer-events-none fixed bottom-28 left-4 z-40 max-w-[calc(100vw-2rem)] sm:bottom-6 sm:left-6">
      <AnimatePresence mode="wait">
        {entry && (
          <motion.div
            key={`${entry.name}-${entry.city}-${entry.time}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-line bg-white/95 py-2.5 pl-2.5 pr-3 shadow-xl backdrop-blur-md"
            data-testid="sales-ticker"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-teal to-tealdark text-white">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <div className="min-w-0 pr-1">
              <div className="truncate text-[13px] font-bold text-navy">
                {entry.name} from {entry.city}
              </div>
              <div className="text-[11px] text-slateink">
                Bought the Bundle · <span className="font-semibold text-teal">{entry.time}</span>
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-slateink/60 transition-colors hover:bg-mist hover:text-navy"
              aria-label="Dismiss"
              data-testid="sales-ticker-dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const RecentSalesPill = ({ className = "" }) => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      axios
        .get(`${API}/stats/recent-sales`)
        .then((r) => alive && setCount(r.data?.count ?? null))
        .catch(() => {});
    load();
    const id = setInterval(load, 60000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (count == null) return null;
  return (
    <div
      data-testid="recent-sales-pill"
      className={`inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
      </span>
      <span>
        <span data-testid="recent-sales-count" className="font-bold">
          {count}
        </span>{" "}
        people bought in the last hour
      </span>
    </div>
  );
};
