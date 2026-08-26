// Content for the Medical Reference Guide — illustrated Disease & Medicine study bundle.
// Educational / reference positioning only. No diagnosis / prescription / outcome claims.

export const BRAND = "Medical Reference Guide";
export const DEFAULT_PRICE = 299; // overridden by /api/config
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
  { icon: "Stethoscope", name: "Common Clinical Presentations", topics: ["Abdominal Pain", "Toothache", "Headache", "Fever", "Cough", "Chest Pain", "Back Pain", "Joint Pain", "Dizziness", "Nausea & Vomiting"] },
  { icon: "Soup", name: "Digestive & Gastrointestinal", topics: ["Indigestion", "Constipation", "Diarrhoea", "Gastroenteritis", "Peptic Ulcer Disease", "Gallstones", "Appendicitis", "Haemorrhoids"] },
  { icon: "Wind", name: "Respiratory", topics: ["Common Cold", "Influenza", "Asthma", "Bronchitis", "Pneumonia", "Allergic Rhinitis"] },
  { icon: "Sparkles", name: "Skin & Allergy", topics: ["Acne", "Eczema", "Urticaria", "Fungal Skin Infections", "Contact Dermatitis"] },
  { icon: "Bone", name: "Musculoskeletal", topics: ["Muscle Strain", "Sprain", "Osteoarthritis", "Low Back Pain", "Neck Pain"] },
  { icon: "Droplets", name: "Urinary & Renal", topics: ["Urinary Tract Infection", "Kidney Stones", "Common Urinary Symptoms"] },
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
    title: "Contact",
    updated: "We're happy to help",
    body: [
      ["Support", "For questions about your purchase, access issues or general enquiries, reach out and we'll respond as soon as we can."],
      ["Email", "Please add your support email in the site settings."],
      ["Response time", "We aim to respond to genuine support requests within a reasonable time."],
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
