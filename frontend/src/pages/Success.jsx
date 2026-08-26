import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Download, Home, Mail } from "lucide-react";
import { Logo } from "../components/site/Logo";
import { API } from "../lib/api";
import { SUPPORT_EMAIL } from "../lib/siteContent";
import axios from "axios";

export default function Success() {
  const [params] = useSearchParams();
  const order = params.get("order");
  const token = params.get("token");
  const [info, setInfo] = useState(null);
  const downloadUrl = order && token ? `${API}/download/${order}?token=${token}` : null;

  useEffect(() => {
    if (order) axios.get(`${API}/order/${order}`).then((r) => setInfo(r.data)).catch(() => {});
  }, [order]);

  return (
    <div className="min-h-screen bg-mist">
      <div className="container-x flex h-16 items-center"><Link to="/" className="flex items-center gap-2.5"><Logo /><span className="font-display text-lg font-extrabold text-navy">Medical Reference Guide</span></Link></div>
      <div className="container-x flex flex-col items-center py-16 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-grassy/12 text-grassy"><CheckCircle2 className="h-9 w-9" /></div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Payment Successful!</h1>
        <p className="mt-3 max-w-md text-slateink">Thank you{info?.name ? `, ${info.name.split(" ")[0]}` : ""} — your purchase is confirmed. Your digital reference bundle is ready below.</p>

        <div className="card-soft mt-8 w-full max-w-md p-7 text-left">
          <h2 className="font-display text-lg font-extrabold text-navy">Your Downloads</h2>
          {info && !info.pdf_available ? (
            <p className="mt-3 flex items-start gap-2 rounded-xl bg-sky-50 px-4 py-3 text-sm text-sky-800"><Mail className="mt-0.5 h-4 w-4 shrink-0" />Your payment is confirmed. The guide file is being finalized — we'll email your download link to your registered email shortly.</p>
          ) : (
            <a href={downloadUrl} target="_blank" rel="noreferrer" className="btn-primary mt-4 w-full" data-testid="download-btn"><Download className="h-5 w-5" /> Download the Guides (PDF)</a>
          )}
          <p className="mt-4 text-xs text-slateink">Keep this page bookmarked. For educational reference only — not a prescription. No dosage guidance.</p>
        </div>

        <p className="mt-6 max-w-md text-sm text-slateink">Didn't receive your guides or facing any issue? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-teal">{SUPPORT_EMAIL}</a>{info?.order_id ? ` with your order ID (${info.order_id})` : ""} and we'll help you right away.</p>

        <Link to="/" className="btn-ghost mt-8"><Home className="h-4 w-4" /> Back to Home</Link>
      </div>
    </div>
  );
}
