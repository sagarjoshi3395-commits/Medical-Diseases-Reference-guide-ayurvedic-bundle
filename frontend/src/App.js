import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { BuyProvider } from "./components/site/BuyContext";
import { Landing } from "./components/site/Landing";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import Policy from "./pages/Policy";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <div className="App min-h-screen bg-white">
      <BrowserRouter>
        <BuyProvider>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failed" element={<Failed />} />
            <Route path="/:type" element={<Policy />} />
          </Routes>
          <Toaster position="top-center" richColors />
        </BuyProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
