import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, BookOpenText, Flame } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, BRAND } from "../../lib/siteContent";
import { useBuy } from "./BuyContext";
import { useCountdown } from "../../lib/countdown";
import { CountdownBadge } from "./CountdownBadge";

export const AnnouncementBar = () => {
  const { config } = useBuy();
  const { mm, ss, expired } = useCountdown(config?.countdown_seconds ?? 600);
  const discount = config?.price ?? 299;
  const regular = config?.regular_price ?? 1999;
  return (
    <div className={`w-full ${expired ? "bg-navy" : "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"} text-white`}>
      <div className="container-x flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[12px] font-medium tracking-wide sm:text-[13px]">
        {expired ? (
          <>
            <BookOpenText className="h-4 w-4 shrink-0 text-teal" />
            <span>Digital Medical Reference Guide • Illustrated PDFs • <span className="text-white/70">Educational Use Only</span></span>
          </>
        ) : (
          <>
            <Flame className="h-4 w-4 shrink-0 animate-pulse" />
            <span className="font-bold">
              Flash Sale: ₹{discount}{" "}
              <span className="font-normal text-white/80 line-through">₹{regular}</span>
            </span>
            <span className="hidden sm:inline text-white/80">·</span>
            <span className="font-mono font-bold tabular-nums" data-testid="announcement-timer">
              Ends in {mm}:{ss}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export const Navbar = () => {
  const { openBuy, config } = useBuy();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { expired } = useCountdown(config?.countdown_seconds ?? 600);
  const price = expired ? (config?.regular_price ?? 1999) : (config?.price ?? 299);

  return (
    <>
      <AnnouncementBar />
      <header className={`sticky top-0 z-40 w-full transition-all ${scrolled ? "border-b border-line bg-white/90 backdrop-blur-md" : "bg-white"}`}>
        <nav className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-[17px] font-extrabold leading-none text-navy">Medical<span className="text-teal">Reference</span></span>
          </Link>
          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-semibold text-slateink transition-colors hover:text-navy">{l.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={openBuy} data-testid="nav-buy" className="hidden rounded-full bg-teal px-5 py-2.5 text-sm font-bold text-white shadow-glow transition-all hover:bg-tealdark sm:inline-flex">Get Access · ₹{price}</button>
            <button onClick={() => setMenu((m) => !m)} className="grid h-10 w-10 place-items-center rounded-full border border-line text-navy lg:hidden" aria-label="Menu">
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menu && (
          <div className="border-t border-line bg-white lg:hidden">
            <div className="container-x flex flex-col py-3">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMenu(false)} className="py-2.5 text-sm font-semibold text-slateink">{l.label}</a>
              ))}
              <button onClick={() => { setMenu(false); openBuy(); }} className="btn-primary mt-2 w-full">Get Access · ₹{price}</button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export const StickyCta = () => {
  const { openBuy, config } = useBuy();
  const [show, setShow] = useState(false);
  const { expired, mm, ss } = useCountdown(config?.countdown_seconds ?? 600);
  const price = expired ? (config?.regular_price ?? 1999) : (config?.price ?? 299);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 p-3 backdrop-blur-md transition-transform sm:hidden ${show ? "translate-y-0" : "translate-y-full"}`}>
      {!expired && (
        <div className="mb-2 flex items-center justify-center gap-1.5 text-[11px] font-bold text-orange-600">
          <Flame className="h-3.5 w-3.5" />
          Flash sale ends in <span className="font-mono tabular-nums">{mm}:{ss}</span>
        </div>
      )}
      <button onClick={openBuy} data-testid="sticky-buy" className="btn-primary w-full">Get the Complete Guide · ₹{price}</button>
    </div>
  );
};
