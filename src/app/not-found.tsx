import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Page not found | ${site.name}` },
};

export default function NotFound() {
  return (
    <section className="page-intro">
      <p className="eyebrow">404 / PAGE NOT FOUND</p>
      <h1>
        Let’s get you
        <br />
        back home.
      </h1>
      <ButtonLink href="/">Return home ↗</ButtonLink>
    </section>
  );
}
