// Client-side flash-sale countdown. Starts on the visitor's first page load
// and persists across refreshes via localStorage.
import { useEffect, useState } from "react";

const KEY = "mrg_countdown_start";
const DEFAULT_DURATION = 600; // 10 minutes

export function getSessionStartedAt() {
  let ts = localStorage.getItem(KEY);
  if (!ts) {
    ts = new Date().toISOString();
    localStorage.setItem(KEY, ts);
  }
  return ts;
}

export function getRemainingSeconds(durationSeconds = DEFAULT_DURATION) {
  const ts = getSessionStartedAt();
  const started = new Date(ts).getTime();
  const elapsed = Math.floor((Date.now() - started) / 1000);
  return Math.max(0, durationSeconds - elapsed);
}

export function useCountdown(durationSeconds = DEFAULT_DURATION) {
  const [remaining, setRemaining] = useState(() => getRemainingSeconds(durationSeconds));

  useEffect(() => {
    // Ensure session start is recorded on mount
    getSessionStartedAt();
    const tick = () => setRemaining(getRemainingSeconds(durationSeconds));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationSeconds]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return { remaining, minutes, seconds, mm, ss, expired: remaining <= 0 };
}
