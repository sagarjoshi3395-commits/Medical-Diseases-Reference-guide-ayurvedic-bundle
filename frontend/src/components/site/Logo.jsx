import React from "react";

export const Logo = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0B2A4A" />
        <stop offset="1" stopColor="#0E9AA7" />
      </linearGradient>
    </defs>
    <path d="M24 3l16 5v12c0 11-7 18-16 22C15 38 8 31 8 20V8l16-5z" fill="url(#lg)" />
    <path d="M21 15h6v6h6v6h-6v6h-6v-6h-6v-6h6z" fill="#fff" />
  </svg>
);
