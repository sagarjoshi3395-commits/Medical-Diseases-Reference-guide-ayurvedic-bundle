import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { API, loadRazorpayScript } from "../../lib/api";

export const BuyModal = ({ open, onOpenChange, config }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [reserved, setReserved] = useState(false);
  const navigate = useNavigate();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const price = config?.price ?? 299;
  const enabled = !!config?.razorpay_enabled;

  const valid = () => {
    if (!form.name.trim() || !form.email.trim() || form.phone.trim().length < 6) {
      toast.error("Please fill in your name, email and phone.");
      return false;
    }
    return true;
  };

  const reset = (v) => {
    onOpenChange(v);
    if (!v) setTimeout(() => { setReserved(false); setForm({ name: "", email: "", phone: "" }); }, 300);
  };

  const payNow = async (e) => {
    e.preventDefault();
    if (!valid()) return;
    setLoading(true);
    try {
      const ok = await loadRazorpayScript();
      if (!ok) { toast.error("Could not load payment. Check your connection."); setLoading(false); return; }
      const { data } = await axios.post(`${API}/payment/create-order`, form);
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: data.product,
        description: "Digital PDF reference bundle · Educational use only",
        order_id: data.razorpay_order_id,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: "#0E9AA7" },
        handler: async (res) => {
          try {
            const verify = await axios.post(`${API}/payment/verify`, {
              razorpay_order_id: res.razorpay_order_id,
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
            });
            const d = verify.data;
            sessionStorage.setItem("mrg_order", JSON.stringify(d));
            reset(false);
            navigate(`/success?order=${d.order_id}&token=${d.download_token}`);
          } catch (err) {
            reset(false);
            navigate("/failed?reason=verify");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => { reset(false); navigate("/failed?reason=payment"); });
      rzp.open();
    } catch (err) {
      toast.error("Something went wrong starting checkout. Please try again.");
      setLoading(false);
    }
  };

  const reserve = async (e) => {
    e.preventDefault();
    if (!valid()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/leads`, { ...form, source: "landing_buy" });
      setReserved(true);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="max-w-md rounded-2xl border-line bg-white text-ink" data-testid="buy-dialog">
        <AnimatePresence mode="wait">
          {reserved ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-3 text-center" data-testid="buy-reserved">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/12 text-teal"><CheckCircle2 className="h-8 w-8" /></div>
              <h3 className="mt-4 font-display text-2xl font-extrabold text-navy">You’re on the list!</h3>
              <p className="mt-2 text-sm text-slateink">Thanks {form.name.split(" ")[0]} — secure checkout is being finalized. We’ll email <span className="text-navy font-semibold">{form.email}</span> as soon as it’s live.</p>
              <button onClick={() => reset(false)} className="btn-ghost mt-6 w-full">Done</button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-extrabold text-navy">Get the Reference Bundle</DialogTitle>
                <DialogDescription className="text-slateink">
                  Disease Guide + Medicine Guide · Digital PDFs. Total: <span className="font-bold text-teal">₹{price}</span> · one-time.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={enabled ? payNow : reserve} className="mt-4 space-y-3.5">
                {[{ k: "name", label: "Full name", ph: "e.g. Ananya Rao", type: "text" }, { k: "email", label: "Email", ph: "you@example.com", type: "email" }, { k: "phone", label: "Phone", ph: "+91 98765 43210", type: "tel" }].map((f) => (
                  <div key={f.k}>
                    <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slateink">{f.label}</label>
                    <input data-testid={`buy-input-${f.k}`} type={f.type} value={form[f.k]} onChange={set(f.k)} placeholder={f.ph}
                      className="mt-1.5 w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-slateink/50 focus:border-teal focus:bg-white" />
                  </div>
                ))}
                <button type="submit" disabled={loading} data-testid="buy-submit-button" className="btn-primary w-full">
                  {loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Please wait…</>) : enabled ? (<>Pay Securely · ₹{price}</>) : (<>Reserve My Copy</>)}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-slateink">
                  {enabled ? (<><Lock className="h-3 w-3" /> Secure checkout via Razorpay · server-verified</>) : (<><ShieldCheck className="h-3 w-3" /> Secure Razorpay checkout — activating shortly</>)}
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
