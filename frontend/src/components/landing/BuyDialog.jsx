import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2, CheckCircle2, Download, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { PRICE } from "../../lib/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const BuyDialog = ({ open, onOpenChange }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || form.phone.trim().length < 6) {
      toast.error("Please fill in your name, email and phone.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, { ...form, source: "landing_buy" });
      setDone(true);
      toast.success("You're on the list! Check your email soon.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = (v) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setDone(false);
        setForm({ name: "", email: "", phone: "" });
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent
        className="max-w-md border-white/15 bg-surface text-ink"
        data-testid="buy-dialog"
      >
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-black uppercase tracking-tight">
                  Get the Masterbook
                </DialogTitle>
                <DialogDescription className="text-smoke">
                  Enter your details to reserve your copy. Total:{" "}
                  <span className="font-bold text-accent">₹{PRICE}</span> · lifetime access.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={submit} className="mt-4 space-y-4">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">Full name</label>
                  <input
                    data-testid="buy-input-name"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="e.g. Ananya Rao"
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-smoke/60 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">Email</label>
                  <input
                    data-testid="buy-input-email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-smoke/60 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">Phone</label>
                  <input
                    data-testid="buy-input-phone"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+91 98765 43210"
                    className="mt-1.5 w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-smoke/60 focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="buy-submit-button"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 glow-accent"
                >
                  {loading ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Reserving…</>
                  ) : (
                    <>Continue to Payment · ₹{PRICE}</>
                  )}
                </button>

                <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-smoke">
                  <Lock className="h-3 w-3" /> Secure checkout via Razorpay — coming soon.
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 text-center"
              data-testid="buy-success"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/15 text-accent">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-black uppercase tracking-tight">
                You're all set!
              </h3>
              <p className="mt-3 text-sm text-smoke">
                We've saved your details, <span className="text-ink">{form.name.split(" ")[0]}</span>.
                Secure payment (Razorpay) is being set up — we'll email your instant download
                link to <span className="text-ink">{form.email}</span> the moment it's live.
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-smoke">
                <Download className="h-4 w-4 text-cyan" />
                Instant download · Mobile &amp; laptop · Lifetime access
              </div>
              <button
                onClick={() => reset(false)}
                data-testid="buy-close-button"
                className="mt-6 w-full rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/5"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
