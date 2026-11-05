import { CallToAction } from "@/components/sections/cta";
import { PageIntro } from "@/components/sections/page-intro";
import { CityDirectory } from "@/components/service-area/city-directory";
import { cities } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

const LEAD = `Serving homeowners in ${cities.length} cities across Broward County and Boca Raton.`;

export const metadata = pageMetadata({
  title: "Where we build",
  path: "/service-area/",
  description: LEAD,
});

export default function ServiceAreaPage() {
  return (
    <>
      <PageIntro label="WHERE WE BUILD" title="South Florida is home." text={LEAD} />
      <CityDirectory />
      <CallToAction />
    </>
  );
}
