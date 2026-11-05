import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Brand } from "@/components/ui/brand";
import { isIndexable, siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import "@/styles/globals.css";
import { dmSans, manrope } from "./fonts";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#243449",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${manrope.variable}`}
    >
      <body>
        <SiteHeader brand={<Brand width={150} height={60} />} />
        <main id="main">{children}</main>
        <SiteFooter brand={<Brand width={220} height={88} />} />
      </body>
    </html>
  );
}
