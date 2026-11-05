// Copy for the interactive widgets and lists. Wording is unchanged from the legacy site.

type Phase = { title: string; text: string; detail: string };

export const phases: readonly Phase[] = [
  {
    title: "Understand your vision",
    text: "Share your ideas, location, timing, and budget. A project review and site visit help establish a practical starting point.",
    detail: "Initial conversation → Site evaluation → Preliminary investment range",
  },
  {
    title: "Define the details",
    text: "Under a separate pre-construction agreement, the team coordinates the design and technical services your project needs. Approved plans inform the final scope and price.",
    detail: "Feasibility → Design & engineering → Approved plans → Construction agreement",
  },
  {
    title: "Bring it to life",
    text: "Permitting, scheduling, trade coordination, and inspections are managed through construction, with final inspections and punch-list closeout at the end.",
    detail: "Permitting → Construction → Final inspections → Closeout",
  },
];

/** The 20 cities listed on the company's service-area page. */
export const cities: readonly string[] = [
  "Fort Lauderdale",
  "Boca Raton",
  "Parkland",
  "Coral Springs",
  "Davie",
  "Hollywood",
  "Coconut Creek",
  "Cooper City",
  "Deerfield Beach",
  "Lauderdale-by-the-Sea",
  "Lighthouse Point",
  "Oakland Park",
  "Pembroke Pines",
  "Plantation",
  "Pompano Beach",
  "Southwest Ranches",
  "Sunrise",
  "Tamarac",
  "Weston",
  "Wilton Manors",
];

type FinishPackage = { name: string; title: string; text: string };

export const finishPackages: readonly FinishPackage[] = [
  {
    name: "Essential",
    title: "A thoughtful foundation.",
    text: "A clean, coordinated starting point for everyday living, with selected cabinetry, surfaces, flooring, and fixtures.",
  },
  {
    name: "Signature",
    title: "More room for your style.",
    text: "Expanded choices and upgraded finishes to personalize the spaces you use every day.",
  },
  {
    name: "Legacy",
    title: "Detail makes the difference.",
    text: "Premium selections and greater attention to architectural detail for a more individual home.",
  },
];

export const faqs: readonly { question: string; answer: string }[] = [
  {
    question: "When will I know the final price?",
    answer:
      "An early assessment provides a planning range. Final pricing follows approved plans, defined specifications and selections.",
  },
  {
    question: "Who coordinates design and permitting?",
    answer:
      "Under a separate pre-construction agreement, Harris coordinates the design and engineering services the project requires, then works with the municipality and design professionals on permitting.",
  },
  {
    question: "Can I stay at home during construction?",
    answer:
      "That depends on the scope. Major structural work, especially second-story additions, may require temporary relocation. Discuss living arrangements during planning.",
  },
  {
    question: "Is an ADU possible on my lot?",
    answer:
      "A property-specific feasibility and zoning review is needed before confirming the size and permitted use.",
  },
];

/** Contractor licences as listed on the company website (company-reported). */
export const licences: readonly { name: string; id: string }[] = [
  { name: "General contractor", id: "CGC1528422" },
  { name: "Air conditioning", id: "CAC1821914" },
  { name: "Plumbing", id: "CFC1431765" },
  { name: "Roofing", id: "CCC1334132" },
  { name: "Underground utility & excavation", id: "CUC1225964" },
  { name: "Solar", id: "CVC57205" },
  { name: "Commercial pool / spa", id: "CPC1461752" },
];
