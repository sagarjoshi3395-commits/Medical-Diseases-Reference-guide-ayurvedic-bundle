import { AlertTriangle } from "lucide-react";
import { PRICE } from "../../lib/content";

export const Footer = ({ onBuy }) => {
  return (
    <footer className="relative border-t border-white/10 bg-surface/40" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-accent text-white font-display font-black text-xl leading-none">+</span>
              <span className="font-display text-xl font-bold tracking-tight text-ink">MEDICAL MASTERBOOK</span>
            </div>
            <p className="mt-5 text-sm text-smoke">
              A simple all-in-one medical reference — 2,000+ medicines, uses, dosage
              references &amp; side effects in one clean, offline, searchable PDF.
            </p>
          </div>
          <button
            onClick={onBuy}
            data-testid="footer-buy-button"
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-4 text-base font-bold text-white transition-transform hover:scale-105 glow-accent"
          >
            Get Instant Access · ₹{PRICE}
          </button>
        </div>

        <div className="mt-12 flex items-start gap-3 rounded-xl border border-white/10 bg-black/40 p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <p className="text-xs leading-relaxed text-smoke">
            <span className="font-semibold text-ink">Important note:</span> This product is for
            educational and reference purposes only. It does not replace professional medical
            advice, diagnosis, or treatment. Always consult a qualified medical professional
            when required.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Medical Masterbook. All rights reserved.</span>
          <span className="font-mono uppercase tracking-[0.2em]">One-time · Lifetime · Offline</span>
        </div>
      </div>
    </footer>
  );
};
