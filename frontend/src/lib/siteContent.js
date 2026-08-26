// Content for the Medical Reference Guide — illustrated Disease & Medicine study bundle.
// Educational / reference positioning only. No diagnosis / prescription / outcome claims.

export const BRAND = "Medical Reference Guide";
export const SUPPORT_EMAIL = "ledgerkitsupport@gmail.com";
export const DEFAULT_PRICE = 290; // overridden by /api/config
export const CURRENCY = "INR";

// Actual supplied sample pages (Disease Reference Guide — Chapter 13: Common Clinical Presentations)
const A = "https://customer-assets-39nsmqrw.emergentagent.net/job_med-masterbook/artifacts";
export const SAMPLES = [
  { title: "Chest Pain", hi: "सीने में दर्द", img: `${A}/fmbxh0cw_ChatGPT%20Image%20Aug%2026%2C%202026%2C%2001_51_06%20AM%20%285%29.png`, guide: "disease" },
  { title: "Breathlessness", hi: "साँस फूलना", img: `${A}/o3ft4utk_ChatGPT%20Image%20Aug%2026%2C%202026%2C%2001_51_06%20AM%20%286%29.png`, guide: "disease" },
  { title: "Fever", hi: "बुखार", img: `${A}/3fomkte6_ChatGPT%20Image%20Aug%2026%2C%202026%2C%2001_51_05%20AM%20%282%29.png`, guide: "disease" },
  { title: "Fatigue & Weakness", hi: "थकान एवं कमजोरी", img: `${A}/vqeicij6_ChatGPT%20Image%20Aug%2026%2C%202026%2C%2001_51_05%20AM%20%283%29.png`, guide: "disease" },
  { title: "Edema / Swelling", hi: "सूजन", img: `${A}/3xbb49ud_ChatGPT%20Image%20Aug%2026%2C%202026%2C%2001_51_06%20AM%20%287%29.png`, guide: "disease" },
];

// Book covers (cropped from supplied bundle art) + combined bundle mockup
export const COVERS = {
  disease: "/covers/disease-cover.png",
  medicine: "/covers/medicine-cover.png",
  bundle: `${A}/ibnlc2c9_ChatGPT%20Image%20Aug%2026%2C%202026%2C%2005_46_59%20AM.png`,
};

// Disease sample pages for the coverflow (chapter cover + supplied pages)
export const DISEASE_SAMPLES = [
  { title: "Diseases & Clinical Conditions", hi: "रोग एवं क्लिनिकल स्थितियाँ", img: `${A}/n9qyrzvs_ChatGPT%20Image%20Aug%2026%2C%202026%2C%2001_48_45%20AM%20%281%29.png` },
  ...SAMPLES,
];

// Medicine sample pages (supplied) for the coverflow
export const MEDICINE_SAMPLES = [
  { title: "Salbutamol · Codeine", hi: "Respiratory & Pain reference", img: `${A}/0kf1ik4o_ChatGPT%20Image%20Aug%2025%2C%202026%2C%2002_18_29%20AM.png` },
  { title: "Silver Sulfadiazine · Framycetin", hi: "Topical antimicrobial reference", img: `${A}/h7xmxtmr_ChatGPT%20Image%20Aug%2025%2C%202026%2C%2001_02_04%20AM.png` },
  { title: "Alprazolam · Folic Acid", hi: "CNS & Vitamin reference", img: `${A}/xvenntzt_ChatGPT%20Image%20Aug%2024%2C%202026%2C%2008_28_15%20PM.png` },
];

export const HERO_CHIPS = [
  "Disease Reference Guide",
  "Medicine Reference Guide",
  "140+ Topics",
  "Illustrated Learning",
  "English + Hindi Content",
  "Digital PDF Access",
];

export const COMPARE = {
  before: {
    title: "Traditional Notes",
    points: ["Long paragraphs", "Scattered information", "Few visual cues", "Time-consuming revision"],
  },
  after: {
    title: "Medical Reference Guide",
    points: ["Structured sections", "Illustrated concepts", "Important points highlighted", "Quick-reference layout"],
  },
};

export const DISEASE_SECTIONS = [
  "Quick Definition", "Common Causes", "Symptoms / Clinical Features", "Important Concepts",
  "Assessment", "Management Overview", "Red Flags", "Quick Revision Points",
];

export const MEDICINE_SECTIONS = [
  "Drug Class", "Main Uses", "Common Side Effects", "Important Warnings",
  "Precautions", "When to Seek Medical Help", "Key Points", "Additional Reference Information",
];

export const DISEASE_CATEGORIES = [
  { icon: "Stethoscope", name: "Common Clinical Presentations", topics: ["Abdominal Pain", "Toothache", "Headache", "Fever", "Cough", "Chest Pain", "Back Pain", "Joint Pain", "Dizziness", "Nausea & Vomiting", "Fatigue & Weakness", "Breathlessness"] },
  { icon: "Soup", name: "Digestive & Gastrointestinal", topics: ["Indigestion", "Constipation", "Diarrhoea", "Gastroenteritis", "Peptic Ulcer Disease", "Gallstones", "Appendicitis", "Haemorrhoids", "Acid Reflux (GERD)"] },
  { icon: "Wind", name: "Respiratory", topics: ["Common Cold", "Influenza", "Asthma", "Bronchitis", "Pneumonia", "Allergic Rhinitis", "Sinusitis", "Sore Throat"] },
  { icon: "HeartPulse", name: "Cardiovascular", topics: ["Hypertension", "Chest Pain (Angina overview)", "Palpitations", "Edema / Swelling", "High Cholesterol"] },
  { icon: "Sparkles", name: "Skin & Allergy", topics: ["Acne", "Eczema", "Urticaria", "Fungal Skin Infections", "Contact Dermatitis", "Ringworm"] },
  { icon: "Bone", name: "Musculoskeletal", topics: ["Muscle Strain", "Sprain", "Osteoarthritis", "Low Back Pain", "Neck Pain", "Gout"] },
  { icon: "Droplets", name: "Urinary & Renal", topics: ["Urinary Tract Infection", "Kidney Stones", "Common Urinary Symptoms"] },
  { icon: "Activity", name: "Metabolic & Endocrine", topics: ["Diabetes (overview)", "Thyroid Disorders (overview)", "Anaemia", "Vitamin Deficiency"] },
  { icon: "Brain", name: "Neurological & Mental Health", topics: ["Migraine", "Vertigo", "Insomnia", "Anxiety (overview)", "Stress-related symptoms"] },
  { icon: "Eye", name: "Eye, Ear & Throat", topics: ["Conjunctivitis", "Ear Pain / Infection", "Tonsillitis", "Mouth Ulcers"] },
];

export const MEDICINE_CATEGORIES = [
  { icon: "Thermometer", name: "Pain & Fever Medicines" },
  { icon: "ShieldPlus", name: "Antibiotic Reference" },
  { icon: "Soup", name: "Digestive Medicines" },
  { icon: "Flower2", name: "Allergy Medicines" },
  { icon: "Pill", name: "Vitamins & Minerals" },
  { icon: "Wind", name: "Respiratory Medicines" },
  { icon: "BookOpen", name: "Other Commonly Referenced Medicines" },
];

export const HOW_PRESENTED = [
  { icon: "BookOpen", title: "Quick Definitions", desc: "Short introductions help establish the topic." },
  { icon: "Brain", title: "Visual Explanations", desc: "Relevant anatomy and concept illustrations accompany the text." },
  { icon: "LayoutGrid", title: "Structured Sections", desc: "Information is separated into easy-to-scan categories." },
  { icon: "Lightbulb", title: "Important Concepts", desc: "Key learning points are visually highlighted." },
  { icon: "TriangleAlert", title: "Red Flags", desc: "Selected warning signs are clearly separated for educational awareness." },
  { icon: "Timer", title: "Quick Revision", desc: "Pages are designed so important information can be reviewed efficiently." },
];

export const BILINGUAL_PAIRS = [
  ["Common Causes", "सामान्य कारण"],
  ["Assessment", "मूल्यांकन"],
  ["Red Flags", "चेतावनी संकेत"],
];

export const WHO_FOR = [
  { emoji: "🎓", title: "Students", desc: "For supplementary revision and reference." },
  { emoji: "📚", title: "Healthcare Learners", desc: "For reviewing selected terminology and concepts." },
  { emoji: "📝", title: "Exam Revision", desc: "Useful as an additional visual revision resource alongside formal study material." },
  { emoji: "🧠", title: "Curious Learners", desc: "For general educational awareness of common health topics." },
];

export const FAQS = [
  { q: "Is this a medical textbook?", a: "No. It is an illustrated supplementary reference and revision resource." },
  { q: "Does the guide provide prescriptions?", a: "No. The guides are not prescriptions and should not be used as personalized medical advice." },
  { q: "Are medicine dosages included?", a: "No dosage guidance is provided." },
  { q: "What format will I receive?", a: "The product is supplied as digital PDF reference material." },
  { q: "Can I use this instead of consulting a doctor?", a: "No. Medical concerns should be discussed with an appropriately qualified healthcare professional." },
  { q: "Does it cover both diseases and medicines?", a: "Yes. The bundle contains separate Disease and Medicine Reference Guides covering the topics specified in the product contents." },
  { q: "Can I share or resell the PDFs?", a: "The purchase is for personal use according to the product licence. Redistribution, reproduction or resale is not permitted except where applicable law allows otherwise." },
  { q: "Is the information guaranteed to be error-free?", a: "No educational resource should make that claim. The material is prepared for educational reference, but readers should verify clinically important information with current authoritative medical sources." },
];

export const NAV_LINKS = [
  { label: "What's Inside", href: "#inside" },
  { label: "Samples", href: "#samples" },
  { label: "Topics", href: "#topics" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const POLICIES = {
  terms: {
    title: "Terms & Conditions",
    updated: "Last updated: 2026",
    body: [
      ["Educational purpose", "The Medical Reference Guide is a digital educational and reference product. By purchasing, you agree it is intended for study, revision and general awareness only, and not for diagnosis, prescription, treatment or personalized medical advice."],
      ["Licence & use", "Your purchase grants a personal, non-transferable licence to access the digital PDF guides for personal educational use. Redistribution, reproduction, resale or public sharing of the content is not permitted except where applicable law allows otherwise."],
      ["Digital product", "This is a digital product delivered electronically after a successful, server-verified payment. No physical item is shipped."],
      ["No guarantees", "We do not guarantee examination results, medical knowledge, expertise or that the material is free from errors. Verify clinically important information with current authoritative sources."],
      ["Acceptable use", "You agree not to misuse the content, attempt to bypass payment/access controls, or use the material to provide medical advice to others."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated: 2026",
    body: [
      ["Information we collect", "When you purchase, we may collect your name, email, phone number and payment reference from the payment gateway to process your order and provide access to the digital product."],
      ["Payments", "Payments are processed securely by Razorpay. We do not store your full card details on our servers. Payment is verified on our server before access is granted."],
      ["How we use data", "Your details are used to process your order, deliver the product, provide support and keep a record of the transaction."],
      ["Data sharing", "We do not sell your personal information. Data is shared only with service providers (such as the payment gateway) as required to complete your purchase."],
      ["Contact", "For any privacy request, contact us using the details on the Contact page."],
    ],
  },
  refund: {
    title: "Refund & Digital Product Policy",
    updated: "Last updated: 2026",
    body: [
      ["Nature of product", "This is a digital product (PDF reference guides) delivered instantly after successful payment. Because access is granted immediately, the product is generally non-refundable once access has been provided."],
      ["Payment issues", "If you were charged but did not receive access, or were charged more than once, contact us with your payment reference and we will investigate and resolve genuine payment errors."],
      ["Access problems", "If you are unable to open or download the guides due to a technical issue on our side, contact us and we will help restore your access."],
      ["Consumer rights", "Nothing in this policy affects any rights you may have under applicable consumer protection law."],
    ],
  },
  contact: {
    title: "Contact & Support",
    updated: "We're happy to help",
    body: [
      ["Didn't receive your product?", "If your payment succeeded but you did not receive access to the guides, email us with your payment reference (Razorpay Payment ID) and the name/email used at checkout, and we'll restore your access as quickly as possible."],
      ["Support email", "ledgerkitsupport@gmail.com — for order, access, download or general support queries."],
      ["Response time", "We aim to respond to genuine support requests within a reasonable time (usually within 24–48 hours)."],
    ],
  },
  disclaimer: {
    title: "Medical Disclaimer",
    updated: "Please read carefully",
    body: [
      ["Educational reference only", "The Medical Reference Guide is intended for education, study, revision and general awareness only. It is not medical advice, diagnosis, treatment guidance or a prescription."],
      ["No dosage or prescribing guidance", "Medicine information is educational only. No dosage guidance is provided. Do not start, stop or change any medicine without advice from an appropriately qualified healthcare professional."],
      ["Verify information", "Medical information changes over time. Readers should verify important information using current authoritative sources and seek professional medical advice when appropriate."],
      ["Emergencies", "For emergencies or serious symptoms, contact an appropriate medical professional or emergency service immediately."],
    ],
  },
};
