import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Loader2, AlertCircle, Home, Mail } from "lucide-react";
import { Logo } from "../components/site/Logo";
import { API } from "../lib/api";
import { SUPPORT_EMAIL } from "../lib/siteContent";

export default function Paid() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [status, setStatus] = useState("loading"); // loading | need_email | error
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", name: "" });
  const [submitting, setSubmitting] = useState(false);

  const fulfill = async ({ email, name }) => {
    const { data } = await axios.post(`${API}/checkout/superprofile-fulfill`, {
      email,
      name: name || "",
    });
    try {
      const key = `fb_purchase_${data.order_id}`;
      if (window.fbq && !sessionStorage.getItem(key)) {
        window.fbq("track", "Purchase", { value: 290, currency: "INR" });
        sessionStorage.setItem(key, "1");
      }
    } catch (e) {}
    try { localStorage.removeItem("mrg_countdown_start"); } catch (e) {}
    navigate(`/success?order=${data.order_id}&token=${data.download_token}`, { replace: true });
  };

  useEffect(() => {
    const email = (params.get("email") || "").trim();
    const name = (params.get("name") || "").trim();
    if (email) {
      fulfill({ email, name }).catch(() => {
        setError("We couldn't unlock your downloads automatically. Enter your email below and we'll email them to you.");
        setForm({ email, name });
        setStatus("need_email");
      });
    } else {
      setStatus("need_email");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await fulfill(form);
    } catch (err) {
      setSubmitting(false);
      setError("Something went wrong. Please try again or email support.");
    }
  };

  return (
    <div className="min-h-screen bg-mist">
      <div className="container-x flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo /><span className="font-display text-lg font-extrabold text-navy">Medical Reference Guide</span>
        </Link>
      </div>
      <div className="container-x flex flex-col items-center py-16 text-center">
        {status === "loading" && (
          <>
            <div className="grid h-16 w-16 place-items-center rounded-full bg-teal/12 text-teal">
              <Loader2 className="h-9 w-9 animate-spin" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Confirming your payment…</h1>
            <p className="mt-3 max-w-md text-slateink">Preparing your downloads and emailing your receipt. This should only take a moment.</p>
          </>
        )}

        {status === "need_email" && (
          <>
            <div className="grid h-16 w-16 place-items-center rounded-full bg-teal/12 text-teal">
              <Mail className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Unlock your downloads</h1>
            <p className="mt-3 max-w-md text-slateink">
              Enter the email you used at checkout. We’ll unlock your PDF downloads and send a copy of the links to your inbox.
            </p>
            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-left text-sm text-amber-800" data-testid="paid-error">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
              </div>
            )}
            <form onSubmit={onSubmit} className="card-soft mt-6 w-full max-w-md p-6 text-left" data-testid="paid-form">
              <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slateink">Email</label>
              <input
                data-testid="paid-input-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-line bg-mist px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-slateink/50 focus:border-teal focus:bg-white"
              />
              <label className="mt-4 block text-[11px] font-bold uppercase tracking-[0.14em] text-slateink">Name (optional)</label>
              <input
                data-testid="paid-input-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Ananya Rao"
                className="mt-1.5 w-full rounded-xl border border-line bg-mist px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-slateink/50 focus:border-teal focus:bg-white"
              />
              <button type="submit" disabled={submitting} data-testid="paid-submit" className="btn-primary mt-5 w-full">
                {submitting ? (<><Loader2 className="h-5 w-5 animate-spin" /> Unlocking…</>) : (<>Get My Downloads</>)}
              </button>
              <p className="mt-3 text-center text-[11px] text-slateink/70">Digital educational content · Not a prescription · No dosage guidance</p>
            </form>
            <p className="mt-6 max-w-md text-sm text-slateink">
              Trouble? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-teal">{SUPPORT_EMAIL}</a> and we’ll help you right away.
            </p>
            <Link to="/" className="btn-ghost mt-6"><Home className="h-4 w-4" /> Back to Home</Link>
          </>
        )}
      </div>
    </div>
  );
}
