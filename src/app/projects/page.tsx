import { Portfolio } from "@/components/projects/portfolio";
import { CallToAction } from "@/components/sections/cta";
import { PageIntro } from "@/components/sections/page-intro";
import { pageMetadata } from "@/lib/metadata";

const LEAD =
  "Explore completed work and the projects taking shape. Each has a different starting point—and a clear purpose.";

export const metadata = pageMetadata({ title: "Our work", path: "/projects/", description: LEAD });

export default function ProjectsPage() {
  return (
    <>
      <PageIntro label="THE PORTFOLIO" title="Every project starts with people." text={LEAD} />
      <Portfolio />
      <CallToAction />
    </>
  );
}
