import { site } from "@/config/site";
import { cities } from "@/content/company";

/** schema.org GeneralContractor built only from facts published on the company website. */
export function businessJsonLd(siteUrl: string, logoPath: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    legalName: site.legalName,
    url: `${siteUrl}/`,
    logo: `${siteUrl}${logoPath}`,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.role },
    areaServed: cities.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };
}
