import React from "react";
import { Flame } from "lucide-react";
import { useCountdown } from "../../lib/countdown";
import { useBuy } from "./BuyContext";

// Compact flash-sale countdown pill.
// variant="pill"  -> small inline pill (used in Hero / near buttons)
// variant="banner" -> larger banner style (used in Pricing card header)
export const CountdownBadge = ({ variant = "pill", className = "" }) => {
  const { config } = useBuy();
  const duration = config?.countdown_seconds ?? 600;
  const { mm, ss, expired } = useCountdown(duration);

  if (variant === "banner") {
    return (
      <div
        data-testid="countdown-banner"
        className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${
          expired
            ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
            : "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md"
        } ${className}`}
      >
        {expired ? (
          <>
            <Flame className="h-4 w-4" />
            <span>Limited-time price · selling fast</span>
          </>
        ) : (
          <>
            <Flame className="h-4 w-4 animate-pulse" />
            <span>Flash sale ends in</span>
            <span
              data-testid="countdown-timer"
              className="rounded-md bg-white/25 px-2 py-0.5 font-mono text-base tabular-nums tracking-wider"
            >
              {mm}:{ss}
            </span>
          </>
        )}
      </div>
    );
  }

  return (
    <span
      data-testid="countdown-pill"
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
        expired
          ? "bg-orange-100 text-orange-700 ring-1 ring-orange-300"
          : "bg-orange-100 text-orange-700 ring-1 ring-orange-300"
      } ${className}`}
    >
      {expired ? (
        <>
          <Flame className="h-3.5 w-3.5" />
          Selling fast · ₹{config?.price ?? 199}
        </>
      ) : (
        <>
          <Flame className="h-3.5 w-3.5" />
          <span className="font-mono tabular-nums">
            {mm}:{ss}
          </span>{" "}
          left at ₹{config?.price ?? 199}
        </>
      )}
    </span>
  );
};
