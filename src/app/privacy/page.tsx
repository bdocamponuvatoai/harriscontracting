import { PageIntro } from "@/components/sections/page-intro";
import { TextLink } from "@/components/ui/text-link";
import { pageMetadata } from "@/lib/metadata";

const SUMMARY =
  "The project planner holds your entries in page memory. It does not save them to a database, send them automatically, or use browser storage. Reloading clears the planner.";

export const metadata = pageMetadata({
  title: "Privacy",
  path: "/privacy/",
  description: SUMMARY,
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro label="PRIVACY" title="Your plans stay yours." />
      <section className="section prose">
        <h2>How this site handles your information</h2>
        <p>{SUMMARY}</p>
        <p>
          Opening an email draft passes the brief to your chosen email app. You decide whether to
          send it. Downloading creates a text file on your device. Links to the company’s current
          website take you to an external service with its own policies.
        </p>
        <p>
          Hosting providers may process technical request information. Generated images are
          illustrative concepts, not claims of completed work.
        </p>
        <TextLink href="/">Return home ↗</TextLink>
      </section>
    </>
  );
}
