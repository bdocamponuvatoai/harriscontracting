"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { finishPackages } from "@/content/company";

export function FinishSelector() {
  const [selected, setSelected] = useState(0);
  const pkg = finishPackages[selected];
  return (
    <section className="finish-section section">
      <div>
        <p className="eyebrow">MAKE IT YOURS</p>
        <h2>
          Three starting points.
          <br />
          Your personal finish.
        </h2>
        <p>
          Explore Harris Contracting’s finish packages. Products, selections, and allowances are
          confirmed in your proposal.
        </p>
      </div>
      <div className="finish-panel">
        <div className="pills" role="group" aria-label="Finish packages">
          {finishPackages.map((p, i) => (
            <button key={p.name} aria-pressed={selected === i} onClick={() => setSelected(i)}>
              {p.name}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          <h3>{pkg.title}</h3>
          <p>{pkg.text}</p>
        </div>
        <a className="text-link" href={site.links.planningRangeTool}>
          Open Harris’s official planning range tool ↗
        </a>
        <small>External tool. Preliminary planning ranges are not construction quotes.</small>
      </div>
    </section>
  );
}
