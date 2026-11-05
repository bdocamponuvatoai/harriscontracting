import Image from "next/image";
import Link from "next/link";
import { CallToAction } from "@/components/sections/cta";
import { PageIntro } from "@/components/sections/page-intro";
import { serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

const LEAD =
  "Four focused services. One team coordinating the details from early planning to final closeout.";

export const metadata = pageMetadata({
  title: "Our services",
  path: "/services/",
  description: LEAD,
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro label="OUR EXPERTISE" title="Build more into your life." text={LEAD} />
      <section className="section service-directory">
        {services.map((s, i) => (
          <Link href={serviceHref(s.slug)} key={s.slug}>
            <Image src={s.image} alt={s.name + " service image"} loading="lazy" />
            <div>
              <p className="eyebrow">
                0{i + 1} / {s.name}
              </p>
              <h2>{s.short}</h2>
              <p>{s.text}</p>
              <span className="text-link">Explore this service ↗</span>
            </div>
          </Link>
        ))}
      </section>
      <CallToAction />
    </>
  );
}
