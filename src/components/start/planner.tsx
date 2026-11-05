"use client";

import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { site } from "@/config/site";
import { cities } from "@/content/company";
import { services } from "@/content/services";
import { BRIEF_FILENAME, buildBrief, buildMailtoHref } from "@/lib/project-brief";

const STEPS = ["Your vision", "The details", "Review & share"] as const;
const HELP_ME_DECIDE = "Help me decide";
const SIZES = [
  "Not sure yet",
  "Under 500 sq ft",
  "500–1,000 sq ft",
  "1,000–2,000 sq ft",
  "Over 2,000 sq ft",
];
const TIMINGS = ["Exploring options", "Within 6 months", "6–12 months", "More than a year"];
const PLANS = ["No plans yet", "Some ideas or sketches", "Plans in progress", "Completed plans"];

const field = (data: FormData, name: string) => String(data.get(name) ?? "");

/**
 * Three-step project brief. Every step stays mounted (hidden when inactive) so
 * values survive Back; only the visible step is validated. Nothing is sent:
 * the brief can be opened as an email draft or downloaded as text.
 */
export function Planner({
  initialType = "",
  initialCity = "",
}: {
  initialType?: string;
  initialCity?: string;
}) {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(initialType);
  const [error, setError] = useState("");
  const [brief, setBrief] = useState("");
  const detailsRef = useRef<HTMLDivElement>(null);
  const visionHeading = useRef<HTMLHeadingElement>(null);
  const detailsHeading = useRef<HTMLHeadingElement>(null);
  const reviewHeading = useRef<HTMLHeadingElement>(null);

  /** Show a step, then move focus (and scroll) to its heading, as the original did. */
  function goTo(next: number) {
    flushSync(() => setStep(next));
    const heading = [visionHeading, detailsHeading, reviewHeading][next].current;
    heading?.focus();
    heading?.scrollIntoView({ block: "start", behavior: "auto" });
  }

  function choose(value: string) {
    setType(value);
    setError("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0) {
      if (!type) {
        setError("Choose a project type to continue.");
        return;
      }
      setError("");
      goTo(1);
      return;
    }
    const controls = detailsRef.current?.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >("input, select, textarea");
    const firstInvalid = Array.from(controls ?? []).find((c) => !c.validity.valid);
    if (firstInvalid) {
      firstInvalid.reportValidity();
      return;
    }
    const data = new FormData(event.currentTarget);
    setBrief(
      buildBrief({
        type,
        city: field(data, "city"),
        size: field(data, "size"),
        timing: field(data, "timing"),
        plans: field(data, "plans"),
        name: field(data, "name"),
        email: field(data, "email"),
        notes: field(data, "notes"),
      }),
    );
    setError("");
    goTo(2);
  }

  function download() {
    const a = document.createElement("a");
    const url = URL.createObjectURL(new Blob([brief], { type: "text/plain" }));
    a.href = url;
    a.download = BRIEF_FILENAME;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section className="planner section">
      <aside>
        <div className="planner-progress">
          {STEPS.map((s, i) => (
            <span key={s} className={i === step ? "current" : ""}>
              <b>0{i + 1}</b>
              {s}
            </span>
          ))}
        </div>
        <p>Prefer a conversation?</p>
        <a href={site.phone.href}>{`${site.phone.display} ↗`}</a>
        <small>
          {`${site.hours[0].days} ${site.hours[0].time}`}
          <br />
          {`${site.hours[1].days} ${site.hours[1].time}`}
        </small>
      </aside>
      <div className="planner-body">
        <form noValidate onSubmit={onSubmit}>
          <div hidden={step !== 0}>
            <p className="eyebrow">STEP 01 / YOUR VISION</p>
            <h2 ref={visionHeading} tabIndex={-1}>
              What would you like to build?
            </h2>
            <div className="choice-grid">
              {services.map((s) => (
                <button
                  type="button"
                  aria-pressed={type === s.name}
                  onClick={() => choose(s.name)}
                  key={s.slug}
                >
                  <span>{s.name}</span>
                  <small>{s.short}</small>
                  <b>{type === s.name ? "✓" : "↗"}</b>
                </button>
              ))}
              <button
                type="button"
                aria-pressed={type === HELP_ME_DECIDE}
                onClick={() => choose(HELP_ME_DECIDE)}
              >
                <span>{HELP_ME_DECIDE}</span>
                <small>I have an idea, but need a starting point.</small>
              </button>
            </div>
          </div>
          <div hidden={step !== 1} ref={detailsRef}>
            <p className="eyebrow">STEP 02 / THE DETAILS</p>
            <h2 ref={detailsHeading} tabIndex={-1}>
              Tell us a little more.
            </h2>
            <div className="form-grid">
              <label>
                Project city
                <select required name="city" defaultValue={initialCity}>
                  <option value="">Select your city</option>
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                  <option>Other / please confirm coverage</option>
                </select>
              </label>
              <label>
                Approximate new space
                <select name="size">
                  {SIZES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                Ideal timing
                <select name="timing">
                  {TIMINGS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                Do you have plans?
                <select name="plans">
                  {PLANS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label>
                Your name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Email address
                <input type="email" autoComplete="email" name="email" required />
              </label>
            </div>
            <label>
              What would make this project a success?
              <textarea
                name="notes"
                rows={4}
                maxLength={2000}
                placeholder="Share your goals, must-haves, and anything you’d like to discuss."
              />
            </label>
          </div>
          <div hidden={step !== 2}>
            <p className="eyebrow">STEP 03 / READY FOR A CONVERSATION</p>
            <h2 ref={reviewHeading} tabIndex={-1}>
              Your project, in focus.
            </h2>
            <pre className="brief">{brief}</pre>
            <div className="share-actions">
              <a className="button" href={buildMailtoHref(site.email, type, brief)}>
                Open email draft ↗
              </a>
              <button type="button" className="outline-button" onClick={download}>
                Download brief ↓
              </button>
            </div>
            <p className="form-note">
              {"Nothing has been sent. Review and send the draft in your email app, or use "}
              <a href={site.links.contact}>Harris’s current contact form ↗</a>.
            </p>
          </div>
          {error && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <div className="step-actions">
            {step > 0 && (
              <button type="button" className="back-button" onClick={() => goTo(step - 1)}>
                ← {step === 2 ? "Edit details" : "Back"}
              </button>
            )}
            {step < 2 && (
              <button type="submit" className="button">
                {step === 0 ? "Continue" : "Review my brief"} <span>→</span>
              </button>
            )}
          </div>
        </form>
        <p className="form-note">
          Your entries stay in this page until you choose to share or download them. Reloading
          clears the brief. This planner does not book appointments or provide a construction quote.
        </p>
      </div>
    </section>
  );
}
