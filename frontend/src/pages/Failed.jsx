import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { XCircle, Home, RotateCcw } from "lucide-react";
import { Logo } from "../components/site/Logo";
import { useBuy } from "../components/site/BuyContext";

export default function Failed() {
  const [params] = useSearchParams();
  const reason = params.get("reason");
  const { openBuy } = useBuy();
  const msg = reason === "verify" ? "We couldn't verify your payment. If money was deducted, it will be auto-refunded by your bank — please contact us with your payment reference." : "Your payment didn't go through or was cancelled. No amount has been charged. You can try again.";
  return (
    <div className="min-h-screen bg-mist">
      <div className="container-x flex h-16 items-center"><Link to="/" className="flex items-center gap-2.5"><Logo /><span className="font-display text-lg font-extrabold text-navy">Medical Reference Guide</span></Link></div>
      <div className="container-x flex flex-col items-center py-20 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-danger/10 text-danger"><XCircle className="h-9 w-9" /></div>
        <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">Payment Not Completed</h1>
        <p className="mt-3 max-w-md text-slateink">{msg}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={openBuy} className="btn-primary"><RotateCcw className="h-4 w-4" /> Try Again</button>
          <Link to="/" className="btn-ghost"><Home className="h-4 w-4" /> Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
