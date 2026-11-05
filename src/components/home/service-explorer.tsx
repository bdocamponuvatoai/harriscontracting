"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { serviceHref, services } from "@/content/services";

/** Home page accordion: one service open at a time, with its image alongside. */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const current = services[active];
  return (
    <div className="service-explorer">
      <div className="service-list">
        {services.map((s, i) => (
          <button key={s.slug} aria-pressed={active === i} onClick={() => setActive(i)}>
            <span className="service-number">0{i + 1}</span>
            <div>
              <h3>{s.name}</h3>
              {active === i && <p>{s.text}</p>}
            </div>
            <span className="service-toggle">{active === i ? "−" : "+"}</span>
          </button>
        ))}
      </div>
      <div className="service-visual">
        <Image
          src={current.image}
          alt={"Harris Contracting website image illustrating " + current.name}
          loading="lazy"
        />
        <div>
          <span>{current.short}</span>
          <Link href={serviceHref(current.slug)} aria-label={"Explore " + current.name}>
            ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
