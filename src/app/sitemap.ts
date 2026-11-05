import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/deployment";
import { projectHref, projects } from "@/content/projects";
import { serviceHref, services } from "@/content/services";

export const dynamic = "force-static";

const STATIC_ROUTES = [
  "/",
  "/services/",
  "/projects/",
  "/approach/",
  "/about/",
  "/service-area/",
  "/start/",
  "/privacy/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...STATIC_ROUTES,
    ...services.map((s) => serviceHref(s.slug)),
    ...projects.map((p) => projectHref(p.slug)),
  ];
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
