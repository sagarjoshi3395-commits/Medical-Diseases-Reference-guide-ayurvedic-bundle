import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Loader2, Mail, CheckCircle2, AlertCircle, Home } from "lucide-react";
import { Logo } from "../components/site/Logo";
import { API } from "../lib/api";
import { SUPPORT_EMAIL } from "../lib/siteContent";

export default function ResendDownloads() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ loading: false, sent: false, notFound: false, error: "" });

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState({ loading: true, sent: false, notFound: false, error: "" });
    try {
      const { data } = await axios.post(`${API}/resend-downloads`, { email: email.trim() });
      if (data?.success) {
        setState({ loading: false, sent: true, notFound: false, error: "" });
      } else {
        setState({ loading: false, sent: false, notFound: true, error: "" });
      }
    } catch (err) {
      setState({ loading: false, sent: false, notFound: false, error: "Something went wrong. Please try again in a moment." });
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
        <div className="grid h-16 w-16 place-items-center rounded-full bg-teal/12 text-teal">
          {state.sent ? <CheckCircle2 className="h-9 w-9" /> : <Mail className="h-9 w-9" />}
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          {state.sent ? "Check your inbox" : "Get my download links"}
        </h1>
        <p className="mt-3 max-w-md text-slateink">
          {state.sent
            ? `We just re-sent your download links to ${email}. If it's not in your inbox in a minute, check the promotions or spam folder.`
            : "Enter the email you used at checkout and we'll email your PDF download links again — instantly."}
        </p>

        {!state.sent && (
          <>
            {state.notFound && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-left text-sm text-amber-800 max-w-md" data-testid="resend-not-found">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>We couldn’t find a paid order for that email. Double-check the address, or contact <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-teal">{SUPPORT_EMAIL}</a> with your payment screenshot.</span>
              </div>
            )}
            {state.error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-rose-50 px-4 py-3 text-left text-sm text-rose-800 max-w-md" data-testid="resend-error">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {state.error}
              </div>
            )}
            <form onSubmit={submit} className="card-soft mt-6 w-full max-w-md p-6 text-left" data-testid="resend-form">
              <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slateink">Email</label>
              <input
                data-testid="resend-input-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-line bg-mist px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-slateink/50 focus:border-teal focus:bg-white"
              />
              <button type="submit" disabled={state.loading} data-testid="resend-submit" className="btn-primary mt-5 w-full">
                {state.loading ? (<><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>) : (<>Email My Downloads</>)}
              </button>
              <p className="mt-3 text-center text-[11px] text-slateink/70">Digital educational content · Not a prescription · No dosage guidance</p>
            </form>
          </>
        )}

        <Link to="/" className="btn-ghost mt-8"><Home className="h-4 w-4" /> Back to Home</Link>
      </div>
    </div>
  );
}
