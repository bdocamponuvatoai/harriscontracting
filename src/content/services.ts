import type { StaticImageData } from "next/image";
import additionImage from "@/assets/images/addition.webp";
import aduImage from "@/assets/images/adu.webp";
import newHomeImage from "@/assets/images/new-home.webp";
import secondStoryImage from "@/assets/images/second-story.webp";

type Service = {
  slug: string;
  name: string;
  short: string;
  text: string;
  image: StaticImageData;
  items: readonly string[];
  consider: string;
};

export const services: readonly Service[] = [
  {
    slug: "home-additions",
    name: "Home additions",
    short: "More home. Same address.",
    text: "Make room for the life you’re living now. Expand your home with a primary suite, a larger kitchen, or connected spaces for family and friends.",
    image: additionImage,
    items: [
      "Primary suites and bedrooms",
      "Kitchen and family-room expansions",
      "Home offices and multi-room additions",
    ],
    consider:
      "Your lot, existing structure, and how the new space connects to your home shape the right approach.",
  },
  {
    slug: "second-story-additions",
    name: "Second-story additions",
    short: "A new level of possibility.",
    text: "Keep the outdoor space you love while creating new living space above your home or garage.",
    image: secondStoryImage,
    items: [
      "Full or partial second floors",
      "Living space above a garage",
      "Upstairs bedrooms, suites and bathrooms",
    ],
    consider:
      "A structural evaluation is the starting point. Temporary relocation may be needed during major structural work.",
  },
  {
    slug: "adu-construction",
    name: "Accessory dwelling units",
    short: "Close to home. Space of their own.",
    text: "Create flexible space for family, guests, or another chapter of life with an attached or detached ADU.",
    image: aduImage,
    items: [
      "In-law suites and guest houses",
      "Attached and detached ADUs",
      "Pool houses and flexible living spaces",
    ],
    consider:
      "Zoning and feasibility come first. Size, use, and rental eligibility depend on the property and local requirements.",
  },
  {
    slug: "new-home-construction",
    name: "New home construction",
    short: "Your vision, from the ground up.",
    text: "Build a home around the way you want to live, from a new custom residence to a replacement home or townhome development.",
    image: newHomeImage,
    items: ["Custom homes", "Demolition and replacement homes", "New townhome construction"],
    consider:
      "Site conditions, design decisions and the full construction scope are established before final pricing.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceHref = (slug: string) => `/services/${slug}/`;
