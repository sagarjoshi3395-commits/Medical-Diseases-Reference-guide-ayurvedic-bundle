import axios from "axios";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export async function getConfig() {
  const { data } = await axios.get(`${API}/config`);
  return data;
}

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const existing = document.querySelector("script[src*='checkout.razorpay.com/v1/checkout.js']");
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}
