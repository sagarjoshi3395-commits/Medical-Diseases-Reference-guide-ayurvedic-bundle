import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { POLICIES } from "../lib/siteContent";

export default function Policy() {
  const { type } = useParams();
  const data = POLICIES[type];
  if (!data) return <Navigate to="/" replace />;
  return (
    <>
      <Navbar />
      <main className="bg-mist">
        <div className="container-x max-w-3xl py-14">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slateink hover:text-navy"><ArrowLeft className="h-4 w-4" /> Back to Home</Link>
          <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl">{data.title}</h1>
          <p className="mt-2 text-sm text-slateink">{data.updated}</p>
          <div className="mt-8 space-y-6">
            {data.body.map(([h, p], i) => (
              <section key={i} className="card-soft p-6">
                <h2 className="font-display text-lg font-extrabold text-navy">{h}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-slateink">{p}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
