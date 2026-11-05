"use client";

import { useState } from "react";
import { phases } from "@/content/company";

/** The three construction phases, as a set of toggle buttons with a live panel. */
export function Process() {
  const [step, setStep] = useState(0);
  const phase = phases[step];
  return (
    <div className="process">
      <div className="process-nav" role="group" aria-label="Construction phases">
        {phases.map((p, i) => (
          <button key={p.title} aria-pressed={i === step} onClick={() => setStep(i)}>
            <span>0{i + 1}</span>
            {p.title}
            <b>↗</b>
          </button>
        ))}
      </div>
      <div className="process-content" aria-live="polite">
        <span className="phase-count">0{step + 1} / 03</span>
        <h3>{phase.title}</h3>
        <p>{phase.text}</p>
        <small>{phase.detail}</small>
      </div>
    </div>
  );
}
