import React, { useState } from "react";
import * as Lucide from "lucide-react";
import { Check, ArrowRight, X, Plus, Minus, ShieldAlert, Info, Globe2 } from "lucide-react";
import { Reveal, SectionHead, Eyebrow } from "./ui";
import { useBuy } from "./BuyContext";
import {
  SAMPLES, COVERS, COMPARE, DISEASE_SECTIONS, MEDICINE_SECTIONS, DISEASE_CATEGORIES,
  MEDICINE_CATEGORIES, HOW_PRESENTED, BILINGUAL_PAIRS, WHO_FOR,
} from "../../lib/siteContent";

const Icon = ({ name, className }) => {
  const C = Lucide[name] || Lucide.Circle;
  return <C className={className} />;
};

/* 2. PRODUCT PREVIEW STRIP */
export const PreviewStrip = () => (
  <section className="border-y border-line bg-mist">
    <div className="container-x py-14">
      <Reveal><SectionHead eyebrow="A Quick Look" title="See What's Inside" sub="Colourful, infographic-style pages — the same format you'll get across the guides." /></Reveal>
      <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-4">
        {SAMPLES.slice(0, 4).map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <figure className="group card-soft overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden bg-white">
                <img src={s.img} alt={`${s.title} illustrated reference page`} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <figcaption className="flex items-center justify-between px-3.5 py-3">
                <span className="text-sm font-bold text-navy">{s.title}</span>
                <span className="text-xs text-slateink">{s.hi}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="#samples" className="btn-navy">Explore Sample Pages <ArrowRight className="h-4 w-4" /></a>
      </div>
    </div>
  </section>
);

/* 4. WHY THIS GUIDE WAS CREATED */
export const WhyCreated = () => (
  <section className="container-x py-16 md:py-20">
    <Reveal><SectionHead eyebrow="The Why" title="Medical Information Can Be Difficult to Review"
      sub="Topics often spread definitions, causes, symptoms, assessment points, precautions and warning signs across large amounts of text. This guide reorganises selected information into visual, structured reference pages that are easier to browse and revise." /></Reveal>
    <div className="mx-auto mt-10 grid max-w-4xl items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
      <Reveal className="h-full">
        <div className="h-full rounded-2xl border border-line bg-mist p-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slateink">Traditional Notes</span>
          <ul className="mt-4 space-y-3">
            {COMPARE.before.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] text-slateink"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-slate-200 text-slate-500"><X className="h-3.5 w-3.5" /></span>{p}</li>
            ))}
          </ul>
        </div>
      </Reveal>
      <div className="hidden items-center justify-center md:flex"><span className="rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-slateink shadow-soft">VS.</span></div>
      <Reveal delay={0.1} className="h-full">
        <div className="h-full rounded-2xl border-2 border-teal/30 bg-teal/5 p-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-tealdark">Medical Reference Guide</span>
          <ul className="mt-4 space-y-3">
            {COMPARE.after.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] font-semibold text-navy"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal/15 text-teal"><Check className="h-3.5 w-3.5" /></span>{p}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
    <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slateink">A supplementary reference — designed to sit alongside your textbooks and course material, not to replace them.</p>
  </section>
);

/* 5. TWO GUIDES — ONE BUNDLE */
export const BundleCards = () => {
  const { openBuy } = useBuy();
  return (
    <section id="inside" className="border-y border-line bg-mist scroll-mt-20">
      <div className="container-x py-16 md:py-20">
        <Reveal><SectionHead eyebrow="What's Inside" title="Explore the Complete Reference Bundle" /></Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <article className="card-soft h-full overflow-hidden">
              <div className="grid place-items-center bg-gradient-to-br from-mist to-white p-6" style={{ minHeight: "260px" }}><img src={COVERS.disease} alt="Diseases Reference Guide book cover" className="max-h-64 w-auto drop-shadow-2xl" loading="lazy" /></div>
              <div className="p-6">
                <span className="eyebrow">Guide 01</span>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-navy">Illustrated Disease Reference Guide</h3>
                <p className="mt-2 text-[15px] text-slateink">A structured visual guide covering common disease conditions and clinical presentations for educational review.</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {DISEASE_SECTIONS.map((s) => (<span key={s} className="flex items-center gap-2 text-[13px] text-navy"><Check className="h-4 w-4 shrink-0 text-grassy" />{s}</span>))}
                </div>
                <p className="mt-4 text-xs text-slateink">Not every topic contains every section — pages show only what’s appropriate to that topic.</p>
                <button onClick={openBuy} className="btn-ghost mt-5 w-full">Preview Disease Guide</button>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article className="card-soft h-full overflow-hidden">
              <div className="grid place-items-center bg-gradient-to-br from-mist to-white p-6" style={{ minHeight: "260px" }}><img src={COVERS.medicine} alt="Medicines Reference Guide book cover" className="max-h-64 w-auto drop-shadow-2xl" loading="lazy" /></div>
              <div className="p-6">
                <span className="eyebrow">Guide 02</span>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-navy">Illustrated Medicine Reference Guide</h3>
                <p className="mt-2 text-[15px] text-slateink">Review important medicine information through clearly divided visual sections.</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {MEDICINE_SECTIONS.map((s) => (<span key={s} className="flex items-center gap-2 text-[13px] text-navy"><Check className="h-4 w-4 shrink-0 text-grassy" />{s}</span>))}
                </div>
                <p className="mt-4 rounded-lg bg-mist px-3 py-2 text-xs font-semibold text-slateink">Medicine information is educational only and is not prescribing guidance.</p>
                <button onClick={openBuy} className="btn-ghost mt-5 w-full">Preview Medicine Guide</button>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* 6. DISEASE TOPICS */
export const DiseaseTopics = () => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? DISEASE_CATEGORIES : DISEASE_CATEGORIES.slice(0, 4);
  return (
    <section id="topics" className="container-x py-16 md:py-20 scroll-mt-20">
      <Reveal><SectionHead eyebrow="Disease Guide" title="Topics You'll Explore" sub="A structured collection of disease conditions and common clinical presentations, grouped into chapters." /></Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.06}>
            <div className="card-soft h-full p-6 transition-all hover:-translate-y-1 hover:shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal"><Icon name={c.icon} className="h-5 w-5" /></span>
                <h3 className="font-display text-lg font-extrabold text-navy">{c.name}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {c.topics.map((t) => (<li key={t} className="rounded-full bg-mist px-3 py-1 text-[13px] font-medium text-slateink">{t}</li>))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button onClick={() => setExpanded((v) => !v)} className="btn-ghost">
          {expanded ? (<>Show Less <Minus className="h-4 w-4" /></>) : (<>View More Topics <Plus className="h-4 w-4" /></>)}
        </button>
        <p className="mx-auto mt-5 max-w-xl text-sm text-slateink">Exact topic coverage may vary by edition. Refer to the included contents page for the complete list.</p>
      </div>
    </section>
  );
};

/* 7. MEDICINE CATEGORIES */
export const MedicineCategories = () => (
  <section className="border-y border-line bg-mist">
    <div className="container-x py-16 md:py-20">
      <Reveal><SectionHead eyebrow="Medicine Guide" title="Medicine Information at a Glance" sub="Medicines are organised into clear reference categories for easy browsing." /></Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MEDICINE_CATEGORIES.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.06}>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-card">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-grape/10 text-grape"><Icon name={c.icon} className="h-6 w-6" /></span>
              <span className="font-display text-[15px] font-bold text-navy">{c.name}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-sm font-semibold text-slateink">Each medicine page is designed for educational review — not self-medication.</p>
    </div>
  </section>
);

/* 9. HOW INFORMATION IS PRESENTED */
export const HowPresented = () => (
  <section className="container-x py-16 md:py-20">
    <Reveal><SectionHead eyebrow="The Format" title="Built for Visual Revision" /></Reveal>
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {HOW_PRESENTED.map((f, i) => {
        const danger = f.icon === "TriangleAlert";
        return (
          <Reveal key={f.title} delay={(i % 3) * 0.06}>
            <div className={`card-soft h-full p-6 transition-all hover:-translate-y-1 hover:shadow-card ${danger ? "border-danger/25 bg-danger/5" : ""}`}>
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${danger ? "bg-danger/10 text-danger" : "bg-teal/10 text-teal"}`}><Icon name={f.icon} className="h-6 w-6" /></span>
              <h3 className="mt-4 font-display text-lg font-extrabold text-navy">{f.title}</h3>
              <p className="mt-2 text-[15px] text-slateink">{f.desc}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);

/* 10. ENGLISH + HINDI */
export const Bilingual = () => (
  <section className="border-y border-line bg-mist">
    <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
      <Reveal className="order-2 md:order-1">
        <Eyebrow>Bilingual</Eyebrow>
        <h2 className="h-section mt-4">Easier-to-Follow Bilingual Explanations</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-slateink">Selected content is presented with English and Hindi explanations, helping readers review terminology while understanding important concepts more comfortably.</p>
        <div className="mt-6 space-y-3">
          {BILINGUAL_PAIRS.map(([en, hi]) => (
            <div key={en} className="flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3">
              <Globe2 className="h-5 w-5 text-teal" />
              <span className="font-bold text-navy">{en}</span>
              <span className="text-slateink">|</span>
              <span className="font-semibold text-slateink">{hi}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slateink">Bilingual content is included where provided in the guides; not every line or page is bilingual.</p>
      </Reveal>
      <Reveal delay={0.1} className="order-1 md:order-2">
        <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          <img src={SAMPLES[2].img} alt="Bilingual English and Hindi reference page close-up" className="w-full" loading="lazy" />
        </div>
      </Reveal>
    </div>
  </section>
);

/* 11. WHO IS THIS FOR */
export const WhoFor = () => (
  <section className="container-x py-16 md:py-20">
    <Reveal><SectionHead eyebrow="Audience" title="Designed for Educational Reference" /></Reveal>
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {WHO_FOR.map((w, i) => (
        <Reveal key={w.title} delay={i * 0.06}>
          <div className="card-soft h-full p-6 text-center transition-all hover:-translate-y-1 hover:shadow-card">
            <div className="text-3xl">{w.emoji}</div>
            <h3 className="mt-3 font-display text-lg font-extrabold text-navy">{w.title}</h3>
            <p className="mt-2 text-sm text-slateink">{w.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-line bg-mist px-5 py-4 text-center text-sm font-semibold text-navy">This guide does not replace approved textbooks, course material, clinical training or professional medical advice.</p>
  </section>
);

/* 12. WHAT YOU RECEIVE */
export const WhatYouReceive = () => {
  const disease = ["Structured disease / reference topics", "Common causes and clinical features", "Assessment concepts", "Important points", "Red flags", "Quick-revision format"];
  const medicine = ["Medicine classes", "Main uses", "Common side effects", "Important warnings", "Precautions", "Seek-medical-help information", "Key reference points"];
  return (
    <section className="border-y border-line bg-mist">
      <div className="container-x py-16 md:py-20">
        <Reveal><SectionHead eyebrow="Included" title="What's Included" /></Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="card-soft h-full p-6">
              <img src={COVERS.disease} alt="Diseases Reference Guide book cover" className="mx-auto mb-5 max-h-56 w-auto drop-shadow-xl" loading="lazy" />
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-teal/10 text-teal"><Lucide.HeartPulse className="h-5 w-5" /></span><h3 className="font-display text-xl font-extrabold text-navy">Disease Reference Guide</h3></div>
              <p className="mt-2 text-sm font-semibold text-tealdark">Illustrated PDF</p>
              <ul className="mt-4 space-y-2.5">{disease.map((d) => (<li key={d} className="flex items-start gap-2.5 text-[15px] text-slateink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-grassy" />{d}</li>))}</ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card-soft h-full p-6">
              <img src={COVERS.medicine} alt="Medicines Reference Guide book cover" className="mx-auto mb-5 max-h-56 w-auto drop-shadow-xl" loading="lazy" />
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-grape/10 text-grape"><Lucide.Pill className="h-5 w-5" /></span><h3 className="font-display text-xl font-extrabold text-navy">Medicine Reference Guide</h3></div>
              <p className="mt-2 text-sm font-semibold text-tealdark">Illustrated PDF</p>
              <ul className="mt-4 space-y-2.5">{medicine.map((d) => (<li key={d} className="flex items-start gap-2.5 text-[15px] text-slateink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-grassy" />{d}</li>))}</ul>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <div className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-3 rounded-2xl border-2 border-teal/30 bg-teal/5 px-6 py-4 text-center">
            <Lucide.Layers className="h-6 w-6 text-teal" />
            <span className="font-display text-lg font-extrabold text-navy">140+ Disease &amp; Medicine Topics Combined</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* 13. EDUCATIONAL DISCLAIMER */
export const DisclaimerCard = () => (
  <section className="container-x py-14">
    <Reveal>
      <div className="mx-auto max-w-4xl rounded-2xl border-2 border-sky-200 bg-sky-50 p-7 md:p-9">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-100 text-sky-700"><Info className="h-6 w-6" /></span>
          <h3 className="font-display text-2xl font-extrabold text-navy">Educational Reference Only</h3>
        </div>
        <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-slate-600">
          <p>The Medical Reference Guide is intended for education, study, revision and general awareness only. It is <strong className="text-navy">not medical advice, diagnosis, treatment guidance or a prescription</strong>.</p>
          <p>Medicine information should not be used to start, stop or change any medicine without advice from an appropriately qualified healthcare professional. <strong className="text-navy">No dosage guidance is provided.</strong></p>
          <p>Medical information changes over time. Readers should verify important information using current authoritative sources and seek professional medical advice when appropriate.</p>
          <p className="flex items-start gap-2 font-semibold text-danger"><ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />For emergencies or serious symptoms, contact an appropriate medical professional or emergency service.</p>
        </div>
      </div>
    </Reveal>
  </section>
);

/* 14. HOW DIGITAL ACCESS WORKS */
export const AccessSteps = () => {
  const steps = [
    { icon: "CreditCard", title: "Complete Your Purchase", desc: "Pay securely through Razorpay checkout." },
    { icon: "ShieldCheck", title: "Payment Verified", desc: "Your payment is confirmed on our server before access is granted." },
    { icon: "BookOpenText", title: "Open Your Guides", desc: "Access the digital PDF reference material on a compatible device." },
  ];
  return (
    <section className="border-y border-line bg-mist">
      <div className="container-x py-16 md:py-20">
        <Reveal><SectionHead eyebrow="Access" title="Simple Digital Access" /></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card-soft h-full p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-white"><Icon name={s.icon} className="h-6 w-6" /></span>
                  <span className="font-display text-4xl font-extrabold text-line">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold text-navy">{s.title}</h3>
                <p className="mt-2 text-[15px] text-slateink">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* 18. FINAL CTA */
export const FinalCta = () => {
  const { openBuy, config } = useBuy();
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-teal/30 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-grape/20 blur-3xl" />
      </div>
      <div className="container-x relative py-20 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-teal">Illustrated • Structured • Educational</span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">Make Medical Revision More Visual.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/70">Explore disease and medicine topics through colourful reference pages designed to make information easier to browse and review.</p>
          <button onClick={openBuy} className="btn-primary mt-8">Get the Medical Reference Guide <ArrowRight className="h-5 w-5" /></button>
          <p className="mt-4 text-sm text-white/60">Disease Guide + Medicine Guide • Digital PDFs • ₹{config?.price ?? 299}</p>
        </Reveal>
      </div>
    </section>
  );
};
