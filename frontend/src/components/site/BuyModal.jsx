import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Lock, CheckCircle2, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { API } from "../../lib/api";
import { CountdownBadge } from "./CountdownBadge";
import { CHECKOUT_URL } from "./BuyContext";

const PENDING_KEY = "mrg_pending_order";

export const BuyModal = ({ open, onOpenChange, config }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [readyOrder, setReadyOrder] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const discountPrice = config?.price ?? 290;
  const regularPrice = config?.regular_price ?? 1999;
  const checkoutUrl = config?.superprofile_url || CHECKOUT_URL;

  const valid = () => {
    if (!form.name.trim() || !form.email.trim() || form.phone.trim().length < 6) {
      toast.error("Please fill in your name, email and phone.");
      return false;
    }
    return true;
  };

  const reset = (v) => {
    onOpenChange(v);
    if (!v) setTimeout(() => { setReadyOrder(null); setForm({ name: "", email: "", phone: "" }); }, 300);
  };

  const startCheckout = async (e) => {
    e.preventDefault();
    if (!valid()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/checkout/superprofile-init`, form);
      const pending = {
        order_id: data.order_id,
        download_token: data.download_token,
        name: form.name,
        email: form.email,
        created_at: Date.now(),
      };
      try { localStorage.setItem(PENDING_KEY, JSON.stringify(pending)); } catch (e) {}
      try {
        window.fbq && window.fbq("track", "InitiateCheckout", {
          value: data.price ?? discountPrice,
          currency: data.currency ?? "INR",
        });
      } catch (e) {}
      setReadyOrder(pending);
      // Redirect current tab straight to SuperProfile checkout.
      window.location.href = data.checkout_url || checkoutUrl;
    } catch (err) {
      toast.error("Something went wrong starting checkout. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="max-w-md rounded-2xl border-line bg-white text-ink" data-testid="buy-dialog">
        <AnimatePresence mode="wait">
          {readyOrder ? (
            <motion.div key="redirecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-3 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/12 text-teal">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-navy">Redirecting to secure checkout…</h3>
              <p className="mt-2 text-sm text-slateink">If nothing happens in a few seconds, tap the button below.</p>
              <a href={checkoutUrl} className="btn-primary mt-5 w-full" data-testid="buy-manual-redirect">
                <ExternalLink className="h-4 w-4" /> Open Checkout
              </a>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-extrabold text-navy">Get the Reference Bundle</DialogTitle>
                <DialogDescription className="text-slateink">
                  Disease Guide + Medicine Guide · Digital PDFs. Total:{" "}
                  <span className="mr-1.5 text-slateink/60 line-through">₹{regularPrice}</span>
                  <span className="font-bold text-teal">₹{discountPrice}</span>{" "}
                  · one-time.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-3">
                <CountdownBadge variant="banner" />
              </div>
              <form onSubmit={startCheckout} className="mt-4 space-y-3.5">
                {[{ k: "name", label: "Full name", ph: "e.g. Ananya Rao", type: "text" }, { k: "email", label: "Email", ph: "you@example.com", type: "email" }, { k: "phone", label: "Phone", ph: "+91 98765 43210", type: "tel" }].map((f) => (
                  <div key={f.k}>
                    <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slateink">{f.label}</label>
                    <input data-testid={`buy-input-${f.k}`} type={f.type} value={form[f.k]} onChange={set(f.k)} placeholder={f.ph}
                      inputMode={f.k === "phone" ? "tel" : f.k === "email" ? "email" : "text"}
                      className="mt-1.5 w-full rounded-xl border border-line bg-mist px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-slateink/50 focus:border-teal focus:bg-white" />
                  </div>
                ))}
                <button type="submit" disabled={loading} data-testid="buy-submit-button" className="btn-primary w-full">
                  {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Please wait…</>) : (<>Continue to Payment · ₹{discountPrice}</>)}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slateink">
                  <Lock className="h-3 w-3" /> Secure checkout — you’ll be redirected to complete payment
                </p>
                <p className="text-center text-[11px] text-slateink/70">Digital educational content · Not a prescription · No dosage guidance</p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

BuyModal.PENDING_KEY = PENDING_KEY;
