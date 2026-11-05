import Image from "next/image";
import heroImage from "@/assets/images/coastal-home.webp";
import livingSpaceImage from "@/assets/images/living-space.webp";
import logo from "@/assets/images/logo.webp";
import { OrganizationExperience } from "@/components/home/organization-experience";
import { ProjectCards } from "@/components/home/project-cards";
import { ServiceExplorer } from "@/components/home/service-explorer";
import { CallToAction } from "@/components/sections/cta";
import { FounderSection } from "@/components/sections/founder";
import { Process } from "@/components/sections/process";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button-link";
import { TextLink } from "@/components/ui/text-link";
import { siteUrl } from "@/config/deployment";
import { site } from "@/config/site";
import { cities } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";
import { businessJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <Image
          className="hero-photo"
          src={heroImage}
          alt="Illustrative architectural concept of a contemporary South Florida home"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">
            <span className="accent-dot" /> SOUTH FLORIDA RESIDENTIAL CONSTRUCTION
          </p>
          <h1>
            Built around
            <br />
            the way you live.
          </h1>
          <p>
            Home additions. New beginnings.
            <br />A construction partner for the whole journey.
          </p>
          <ButtonLink href="/start/">
            Let’s build something lasting <span>↗</span>
          </ButtonLink>
        </div>
        <div className="hero-caption">
          <span>BROWARD COUNTY & BOCA RATON</span>
          <span>Illustrative architectural concept</span>
          <a href="#possibilities" aria-label="Explore the possibilities">
            ↓
          </a>
        </div>
      </section>
      <div className="credentials">
        <span>
          FLORIDA GENERAL CONTRACTOR <b>{site.licence}</b>
        </span>
        <span>
          LOCALLY FOUNDED <b>{site.founded}</b>
        </span>
        <span>
          PERSONALLY LED <b>{site.founder.name}</b>
        </span>
      </div>
      <section className="intro section" id="possibilities">
        <p className="eyebrow">A HOME THAT MOVES WITH YOU</p>
        <h2>
          You love where you live.
          <br />
          <span>
            Let’s make it work for
            <br className="desktop-break" /> who you’re becoming.
          </span>
        </h2>
        <div className="intro-bottom">
          <p>
            More space for family. A place for someone you love. Or a new home, imagined from the
            start. Harris Contracting brings your plans into focus—and coordinates the work to make
            them real.
          </p>
          <TextLink href="/about/">
            Get to know Harris <span>↗</span>
          </TextLink>
        </div>
      </section>
      <section className="services section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FOUR WAYS TO BUILD YOUR NEXT CHAPTER</p>
            <h2>Room for possibility.</h2>
          </div>
          <TextLink href="/services/">Explore our services ↗</TextLink>
        </div>
        <ServiceExplorer />
      </section>
      <section className="living-band">
        <Image
          src={livingSpaceImage}
          alt="Illustrative concept of a sunlit living space opening onto a tropical garden"
          loading="lazy"
        />
        <div>
          <p className="eyebrow">THE REASON WE BUILD</p>
          <h2>
            For the life
            <br />
            inside.
          </h2>
          <p>It’s the everyday moments that make a home worth building well.</p>
          <span>Illustrative interior concept</span>
        </div>
      </section>
      <section className="section work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FROM PLANS TO PLACES</p>
            <h2>Work with a story.</h2>
          </div>
          <TextLink href="/projects/">View the portfolio ↗</TextLink>
        </div>
        <ProjectCards />
      </section>
      <section className="section approach">
        <div className="section-heading">
          <div>
            <p className="eyebrow">CLARITY AT EVERY STAGE</p>
            <h2>
              A considered process.
              <br />A clear way forward.
            </h2>
          </div>
          <p>
            Big projects have a lot of moving parts.
            <br />
            You should know what comes next.
          </p>
        </div>
        <Process />
        <TextLink href="/approach/">See the full approach ↗</TextLink>
      </section>
      <FounderSection alt="Calvin Harris, founder and president of Harris Contracting" lazy>
        <p className="eyebrow">KNOW WHO YOU’RE BUILDING WITH</p>
        <h2>
          Real experience.
          <br />
          Personal commitment.
        </h2>
        <p>
          Calvin Harris founded the company in 2019 with a focus on professionally managed
          residential construction. A Construction Management graduate of Prairie View A&M
          University, he brings nearly two decades of industry experience to the work.
        </p>
        <TextLink href="/about/">Meet Calvin ↗</TextLink>
        <div className="founder-facts">
          <div>
            <strong>Since 2019</strong>
            <span>Building in South Florida</span>
          </div>
          <div>
            <strong>One accountable team</strong>
            <span>From planning through closeout</span>
          </div>
        </div>
      </FounderSection>
      <OrganizationExperience />
      <section className="quote-section">
        <p className="eyebrow">IN A HOMEOWNER’S WORDS</p>
        <blockquote>“Calvin is responsive, professional and easy to work with.”</blockquote>
        <p>
          Bill Boettcher <span>· Homeowner</span>
        </p>
        <TextLink href={site.links.reviews}>Read the published reviews ↗</TextLink>
      </section>
      <section className="area-strip section">
        <div>
          <p className="eyebrow">ROOTED IN SOUTH FLORIDA</p>
          <h2>
            Local knowledge.
            <br />
            Close to home.
          </h2>
        </div>
        <div>
          <p>
            {cities.slice(0, 3).join(" · ")}
            <br />
            {cities.slice(3, 6).join(" · ")}
          </p>
          <TextLink href="/service-area/">{`Explore all ${cities.length} service areas ↗`}</TextLink>
        </div>
      </section>
      <CallToAction />
      <JsonLd data={businessJsonLd(siteUrl, logo.src)} />
    </>
  );
}
