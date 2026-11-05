import { CallToAction } from "@/components/sections/cta";
import { FinishSelector } from "@/components/sections/finish-selector";
import { PageIntro } from "@/components/sections/page-intro";
import { Process } from "@/components/sections/process";
import { faqs, phases } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

const LEAD =
  "A major construction project should begin with a shared understanding of the scope, the process, and the decisions ahead.";

export const metadata = pageMetadata({
  title: "Our approach",
  path: "/approach/",
  description: LEAD,
});

export default function ApproachPage() {
  return (
    <>
      <PageIntro label="OUR APPROACH" title="Confidence comes from clarity." text={LEAD} />
      <section className="section">
        <Process />
      </section>
      <section className="section process-long">
        {phases.map((p, i) => (
          <article key={p.title}>
            <span>0{i + 1}</span>
            <div>
              <h2>{p.title}</h2>
              <p>{p.text}</p>
              <small>{p.detail}</small>
            </div>
          </article>
        ))}
      </section>
      <FinishSelector />
      <section className="section faq">
        <div>
          <p className="eyebrow">BEFORE YOU BUILD</p>
          <h2>
            Good questions.
            <br />
            Clearer expectations.
          </h2>
        </div>
        <div>
          {faqs.map(({ question, answer }) => (
            <details key={question}>
              <summary>
                {question}
                <span>+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
