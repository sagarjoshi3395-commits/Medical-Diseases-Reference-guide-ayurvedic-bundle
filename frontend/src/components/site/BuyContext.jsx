import React, { createContext, useContext, useEffect, useState } from "react";
import { getConfig } from "../../lib/api";
import { BuyModal } from "./BuyModal";
import { DEFAULT_PRICE } from "../../lib/siteContent";

const BuyCtx = createContext({ config: null, openBuy: () => {} });
export const useBuy = () => useContext(BuyCtx);

export const BuyProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
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

  const openBuy = () => setOpen(true);

  return (
    <BuyCtx.Provider value={{ config, openBuy }}>
      {children}
      <BuyModal open={open} onOpenChange={setOpen} config={config} />
    </BuyCtx.Provider>
  );
};
