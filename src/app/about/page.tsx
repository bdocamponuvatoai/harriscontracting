import founderImage from "@/assets/images/founder.webp";
import { CallToAction } from "@/components/sections/cta";
import { FounderSection } from "@/components/sections/founder";
import { PageIntro } from "@/components/sections/page-intro";
import { TextLink } from "@/components/ui/text-link";
import { licences } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

const BIO =
  "Calvin Harris founded Harris Contracting in 2019. His Construction Management degree from Prairie View A&M University and nearly two decades in the industry inform a practical, coordinated approach to residential construction.";

export const metadata = pageMetadata({
  title: "Meet Harris",
  path: "/about/",
  description: BIO,
  image: founderImage,
  imageAlt: "Calvin Harris, founder and president",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro label="MEET HARRIS CONTRACTING" title="A builder. A partner. A person you know." />
      <FounderSection alt="Calvin Harris, founder and president">
        <h2>
          Building homes.
          <br />
          Building something lasting.
        </h2>
        <p>{BIO}</p>
        <p>
          The company focuses on substantial home additions, second stories, ADUs, and new homes.
          Calvin’s published story describes a business built around better spaces for clients,
          opportunity for its team, and a legacy for the next generation.
        </p>
        <TextLink href="/start/">Start a conversation ↗</TextLink>
      </FounderSection>
      <section className="section credentials-detail">
        <p className="eyebrow">TECHNICAL EXPERIENCE ACROSS THE BUILD</p>
        <h2>
          One project.
          <br />
          Many connected systems.
        </h2>
        <p>Contractor licences listed on the company website:</p>
        <div className="license-grid">
          {licences.map(({ name, id }) => (
            <div key={id}>
              <span>{name}</span>
              <b>{id}</b>
            </div>
          ))}
        </div>
        <small>
          Company-reported credentials. Confirm current licence and insurance details with Harris
          before contracting.
        </small>
      </section>
      <CallToAction />
    </>
  );
}
