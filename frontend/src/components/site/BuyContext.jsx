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
    checkout_provider: "superprofile",
    superprofile_url: CHECKOUT_URL,
  });

  useEffect(() => {
    getConfig().then(setConfig).catch(() => {});
  }, []);

  const openBuy = () => {
    const url = config?.superprofile_url || CHECKOUT_URL;
    try {
      window.fbq && window.fbq("track", "InitiateCheckout", {
        value: config?.price ?? DEFAULT_PRICE,
        currency: config?.currency ?? "INR",
      });
    } catch (e) {}
    window.location.href = url;
  };

  return (
    <BuyCtx.Provider value={{ config, openBuy }}>
      {children}
    </BuyCtx.Provider>
  );
};
