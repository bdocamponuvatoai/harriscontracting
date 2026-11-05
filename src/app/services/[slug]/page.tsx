import Image from "next/image";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/sections/cta";
import { FinishSelector } from "@/components/sections/finish-selector";
import { PageIntro } from "@/components/sections/page-intro";
import { Process } from "@/components/sections/process";
import { ButtonLink } from "@/components/ui/button-link";
import { CheckList } from "@/components/ui/check-list";
import { getService, serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    path: serviceHref(service.slug),
    description: service.text,
    image: service.image,
    imageAlt: `Harris Contracting published ${service.name} image`,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return (
    <>
      <PageIntro label="OUR SERVICES" title={service.name} text={service.short} />
      <figure className="detail-photo">
        <Image
          src={service.image}
          alt={"Harris Contracting published " + service.name + " image"}
          loading="eager"
        />
        <figcaption>Image from Harris Contracting’s published service collection</figcaption>
      </figure>
      <section className="section split-copy">
        <h2>
          Make room for
          <br />
          your next chapter.
        </h2>
        <div>
          <p className="lead">{service.text}</p>
          <CheckList items={service.items} />
          <p>{service.consider}</p>
          <ButtonLink href={"/start/?service=" + service.slug}>Plan this project ↗</ButtonLink>
        </div>
      </section>
      <FinishSelector />
      <section className="section">
        <p className="eyebrow">HOW WE GET THERE</p>
        <h2>A plan before the build.</h2>
        <Process />
      </section>
      <CallToAction />
    </>
  );
}
