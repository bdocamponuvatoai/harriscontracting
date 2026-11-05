import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import heroImage from "@/assets/images/coastal-home.webp";
import { site } from "@/config/site";

type PageMetadataInput = {
  /** Page title without the site name. Omit for the home page. */
  title?: string;
  /** Route path with a trailing slash, e.g. "/about/". */
  path: string;
  description?: string;
  /** Social card image; defaults to the home page hero. */
  image?: StaticImageData;
  imageAlt?: string;
};

/**
 * Builds a page's metadata: absolute title, description, canonical URL and
 * Open Graph / Twitter cards. Relative URLs resolve against `metadataBase`
 * (set in the root layout).
 */
export function pageMetadata({
  title,
  path,
  description = site.description,
  image = heroImage,
  imageAlt = "Illustrative architectural concept of a contemporary South Florida home",
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  const images = [{ url: image.src, width: image.width, height: image.height, alt: imageAlt }];
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      title: fullTitle,
      description,
      url: path,
      images,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images },
  };
}
