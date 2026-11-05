import { Fragment } from "react";
import { SmartLink } from "@/components/ui/smart-link";
import { exploreNav, site } from "@/config/site";
import { serviceHref, services } from "@/content/services";

export function SiteFooter({ brand }: { brand: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          {brand}
          <p>
            Thoughtfully planned.
            <br />
            Professionally built.
            <br />
            Made for living.
          </p>
        </div>
        <div>
          <h3>Build with us</h3>
          {services.map((s) => (
            <SmartLink key={s.slug} href={serviceHref(s.slug)}>
              {s.name}
            </SmartLink>
          ))}
        </div>
        <div>
          <h3>Explore</h3>
          {exploreNav.map(({ label, href }) => (
            <SmartLink key={href} href={href}>
              {label}
            </SmartLink>
          ))}
        </div>
        <div>
          <h3>Let’s talk</h3>
          <a href={site.phone.href}>{site.phone.display}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <p>
            {site.hours.map((h, i) => (
              <Fragment key={h.days}>
                {i > 0 && <br />}
                {`${h.days} · ${h.time}`}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
      <div className="footer-meta">
        <span>{`© ${year} ${site.legalName}`}</span>
        <span>{`${site.licence} · ${site.region}`}</span>
        <SmartLink href="/privacy/">Privacy</SmartLink>
      </div>
    </footer>
  );
}
