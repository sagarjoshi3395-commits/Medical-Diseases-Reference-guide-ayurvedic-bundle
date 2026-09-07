import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, AlertCircle, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "../components/site/Logo";
import { API } from "../lib/api";
import { SUPPORT_EMAIL } from "../lib/siteContent";

const PENDING_KEY = "mrg_pending_order";

export default function Paid() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      let pending = null;
      try { pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "null"); } catch (e) {}
      if (!pending || !pending.order_id) {
        setError("We couldn't find your order in this browser. Please email us and we'll send your downloads.");
        return;
      }
      try {
        const { data } = await axios.post(`${API}/checkout/superprofile-complete`, {
          order_id: pending.order_id,
        });
        if (cancelled) return;
        try {
          const key = `fb_purchase_${data.order_id}`;
          if (window.fbq && !sessionStorage.getItem(key)) {
            window.fbq("track", "Purchase", { value: 290, currency: "INR" });
            sessionStorage.setItem(key, "1");
          }
        } catch (e) {}
        try { localStorage.removeItem(PENDING_KEY); } catch (e) {}
        try { localStorage.removeItem("mrg_countdown_start"); } catch (e) {}
        navigate(`/success?order=${data.order_id}&token=${data.download_token}`, { replace: true });
      } catch (err) {
        if (!cancelled) setError("Payment received but we hit a snag activating your downloads. Please email support with your order ID.");
      }
    };
    run();
    return () => { cancelled = true; };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-mist">
      <div className="container-x flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo /><span className="font-display text-lg font-extrabold text-navy">Medical Reference Guide</span>
        </Link>
      </div>
      <div className="container-x flex flex-col items-center py-16 text-center">
        {error ? (
          <>
            <div className="grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-700">
              <AlertCircle className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Almost there</h1>
            <p className="mt-3 max-w-md text-slateink">{error}</p>
            <p className="mt-2 text-sm text-slateink">Contact: <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-teal">{SUPPORT_EMAIL}</a></p>
            <Link to="/" className="btn-ghost mt-8"><Home className="h-4 w-4" /> Back to Home</Link>
          </>
        ) : (
          <>
            <div className="grid h-16 w-16 place-items-center rounded-full bg-teal/12 text-teal">
              <Loader2 className="h-9 w-9 animate-spin" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Confirming your payment…</h1>
            <p className="mt-3 max-w-md text-slateink">Preparing your downloads and emailing your receipt. This should only take a moment.</p>
          </>
        )}
      </div>
    </div>
  );
}
