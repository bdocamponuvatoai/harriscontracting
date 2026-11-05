import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/config/site";

export function CallToAction() {
  return (
    <section className="cta">
      <p className="eyebrow">A BETTER HOME STARTS WITH A CONVERSATION</p>
      <h2>
        What are you
        <br />
        ready to build?
      </h2>
      <ButtonLink href="/start/">
        Tell us about your project <span>↗</span>
      </ButtonLink>
      <a className="cta-phone" href={site.phone.href}>
        {`Or call ${site.phone.display}`}
      </a>
    </section>
  );
}
