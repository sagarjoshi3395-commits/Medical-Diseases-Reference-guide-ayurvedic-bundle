import React, { createContext, useContext, useEffect, useState } from "react";
import { getConfig } from "../../lib/api";
import { DEFAULT_PRICE } from "../../lib/siteContent";

export const CHECKOUT_URL = "https://superprofile.bio/vp/6a9efd48ce71d100135003dc";

const BuyCtx = createContext({ config: null, openBuy: () => {} });
export const useBuy = () => useContext(BuyCtx);

export const BuyProvider = ({ children }) => {
  const [config, setConfig] = useState({
    product: "Medical Reference Guide Bundle",
    price: DEFAULT_PRICE,
    currency: "INR",
    razorpay_enabled: false,
    key_id: "",
  });

  useEffect(() => {
    getConfig().then(setConfig).catch(() => {});
  }, []);

  const openBuy = () => {
    try {
      window.fbq && window.fbq("track", "InitiateCheckout", {
        value: config?.price ?? DEFAULT_PRICE,
        currency: config?.currency ?? "INR",
      });
    } catch (e) {}
    window.open(CHECKOUT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <BuyCtx.Provider value={{ config, openBuy }}>
      {children}
    </BuyCtx.Provider>
  );
};
