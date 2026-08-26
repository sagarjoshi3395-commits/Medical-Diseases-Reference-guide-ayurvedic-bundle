import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";

export const Footer = () => {
  const cols = [
    { h: "Explore", links: [["Home", "/"], ["What's Inside", "/#inside"], ["Samples", "/#samples"], ["Topics", "/#topics"], ["FAQ", "/#faq"]] },
    { h: "Legal", links: [["Terms", "/terms"], ["Privacy Policy", "/privacy"], ["Refund Policy", "/refund"], ["Medical Disclaimer", "/disclaimer"], ["Contact", "/contact"]] },
  ];
  return (
    <footer className="bg-navydark text-white/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2.5"><Logo /><span className="font-display text-lg font-extrabold text-white">Medical Reference Guide</span></Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">An illustrated digital reference bundle covering disease and medicine topics in a structured, quick-revision format.</p>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <h4 className="font-display text-sm font-bold uppercase tracking-widest text-white">{c.h}</h4>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, href]) => (
                <li key={label}>{href.startsWith("/#") ? (<a href={href} className="text-sm hover:text-teal">{label}</a>) : (<Link to={href} className="text-sm hover:text-teal">{label}</Link>)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x space-y-3 py-7 text-xs leading-relaxed text-white/55">
          <p>For educational and general awareness purposes only. Not medical advice, diagnosis, treatment or a prescription. Always consult an appropriately qualified healthcare professional for medical concerns.</p>
          <p>Unauthorised reproduction, redistribution or resale of original guide content is prohibited subject to applicable law.</p>
          <p className="text-white/40">© 2026 Medical Reference Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
