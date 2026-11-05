/**
 * Business details and navigation. Safe to import from client components:
 * nothing here depends on the environment.
 *
 * Every value is taken from the legacy site, which sourced it from
 * https://harris-contracting.com/ (see docs/content-sources.md). Do not add
 * facts that are not on the company's own website.
 */
export const site = {
  name: "Harris Contracting",
  legalName: "Harris Contracting, LLC",
  tagline: "Built around the way you live",
  description:
    "Home additions, second stories, ADUs and new home construction in Broward County and Boca Raton. Discover Harris Contracting.",
  region: "Broward County & Boca Raton",
  licence: "CGC1528422",
  founded: 2019,
  founder: {
    name: "Calvin Harris",
    role: "Founder & President",
  },
  phone: {
    display: "954 203 7292",
    href: "tel:19542037292",
    /** E.164 form for structured data. */
    e164: "+1-954-203-7292",
  },
  email: "calvin@harris-contracting.com",
  /** Opening hours as published on the company website. */
  hours: [
    { days: "Mon–Fri", time: "8am–6pm" },
    { days: "Sat", time: "8am–12pm" },
    { days: "Sunday", time: "Closed" },
  ],
  links: {
    reviews: "https://harris-contracting.com/reviews/",
    contact: "https://harris-contracting.com/contact/",
    planningRangeTool: "https://harris-contracting.com/instant-pricer/",
  },
} as const;

type NavItem = { label: string; href: string };

export const mainNav: readonly NavItem[] = [
  { label: "Services", href: "/services/" },
  { label: "Our work", href: "/projects/" },
  { label: "Our approach", href: "/approach/" },
  { label: "About us", href: "/about/" },
];

export const exploreNav: readonly NavItem[] = [
  { label: "Our work", href: "/projects/" },
  { label: "Our approach", href: "/approach/" },
  { label: "Meet Harris", href: "/about/" },
  { label: "Where we build", href: "/service-area/" },
];
