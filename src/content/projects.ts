import type { StaticImageData } from "next/image";
import additionImage from "@/assets/images/addition.webp";
import framingImage from "@/assets/images/framing.webp";
import townhomesImage from "@/assets/images/townhomes.webp";

export const projectFilters = ["All", "Completed", "In planning", "Upcoming"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

type Project = {
  slug: string;
  name: string;
  type: string;
  city: string;
  size: string;
  /** Status as published on the company website. */
  status: string;
  filter: Exclude<ProjectFilter, "All">;
  image: StaticImageData;
  caption: string;
  /** Short image note shown on the home page cards; omitted for real project photos. */
  cardNote?: string;
  text: string;
};

export const projects: readonly Project[] = [
  {
    slug: "hollywood-addition",
    name: "Room to grow in Hollywood",
    type: "Home addition",
    city: "Hollywood",
    size: "Approx. 700 sq ft",
    status: "Completed · 2026",
    filter: "Completed",
    image: additionImage,
    caption: "Project image published by Harris Contracting",
    text: "A ground-floor addition bringing together kitchen, dining, laundry, and a primary suite. Harris Contracting reports final inspections completed and the permit closed.",
  },
  {
    slug: "fort-lauderdale-second-story",
    name: "A new level in Fort Lauderdale",
    type: "Second-story addition",
    city: "Fort Lauderdale",
    size: "Approx. 600–650 sq ft",
    status: "Design & pre-construction",
    filter: "In planning",
    image: framingImage,
    caption:
      "Construction illustration published by Harris Contracting; this project is in pre-construction",
    cardNote: "Illustrative construction image",
    text: "Planned living space above an existing garage and laundry, with a bedroom, kitchenette, and bathroom. The company lists this project in design and pre-construction.",
  },
  {
    slug: "wilson-living",
    name: "Wilson Living Townhomes",
    type: "New construction",
    city: "Hollywood",
    size: "4 townhomes",
    status: "Upcoming · Entering construction",
    filter: "Upcoming",
    image: townhomesImage,
    caption: "Architectural rendering of an upcoming development",
    cardNote: "Architectural rendering",
    text: "Four new fee-simple townhomes, with Harris Contracting serving as general contractor. The published scope runs from demolition and sitework through construction and completion.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectHref = (slug: string) => `/projects/${slug}/`;
