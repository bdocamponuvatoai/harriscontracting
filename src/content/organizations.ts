import type { StaticImageData } from "next/image";
import austinCommercial from "@/assets/images/organizations/austin-commercial.webp";
import brightline from "@/assets/images/organizations/brightline.webp";
import fdot from "@/assets/images/organizations/fdot.webp";
import granite from "@/assets/images/organizations/granite.webp";
import ohlCommunityAsphalt from "@/assets/images/organizations/ohl-community-asphalt.webp";
import ohla from "@/assets/images/organizations/ohla.webp";
import skanska from "@/assets/images/organizations/skanska.webp";

/**
 * Organisations featured in the "Experience working with leading organizations"
 * section of harris-contracting.com. Not described as clients, partners or endorsements.
 */
export const organizations: readonly { name: string; logo: StaticImageData }[] = [
  { name: "Austin Commercial", logo: austinCommercial },
  { name: "Skanska", logo: skanska },
  { name: "OHLA USA", logo: ohla },
  { name: "Brightline", logo: brightline },
  { name: "Granite", logo: granite },
  { name: "Florida Department of Transportation (FDOT)", logo: fdot },
  { name: "OHL Community Asphalt", logo: ohlCommunityAsphalt },
];
