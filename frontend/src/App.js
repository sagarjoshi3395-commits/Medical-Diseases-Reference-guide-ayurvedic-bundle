import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { BuyProvider } from "./components/site/BuyContext";
import { Landing } from "./components/site/Landing";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import Paid from "./pages/Paid";
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

// Deters casual copying/saving of site content & images. Form fields stay usable.
function ContentProtect() {
  useEffect(() => {
    const isEditable = (t) => !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    const prevent = (e) => e.preventDefault();
    const guard = (e) => { if (!isEditable(e.target)) e.preventDefault(); };
    const onKey = (e) => {
      if (isEditable(e.target)) return;
      const k = (e.key || "").toLowerCase();
      if (e.key === "F12") { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["i", "j", "c"].includes(k)) { e.preventDefault(); return; }
      if ((e.ctrlKey || e.metaKey) && ["c", "x", "u", "s", "a", "p"].includes(k)) { e.preventDefault(); }
    };
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("selectstart", guard);
    document.addEventListener("copy", guard);
    document.addEventListener("cut", guard);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("selectstart", guard);
      document.removeEventListener("copy", guard);
      document.removeEventListener("cut", guard);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}

function App() {
  return (
    <div className="App min-h-screen bg-white">
      <BrowserRouter>
        <BuyProvider>
          <ScrollManager />
          <ContentProtect />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/success" element={<Success />} />
            <Route path="/paid" element={<Paid />} />
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
