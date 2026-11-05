"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectFilters, projectHref, projects, type ProjectFilter } from "@/content/projects";

export function Portfolio() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const visible = projects.filter((p) => filter === "All" || p.filter === filter);
  return (
    <section className="section portfolio">
      <div className="pills" role="group" aria-label="Filter projects">
        {projectFilters.map((t) => (
          <button key={t} aria-pressed={filter === t} onClick={() => setFilter(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {visible.map((p) => (
          <Link className="project-card" href={projectHref(p.slug)} key={p.slug}>
            <div className="project-image">
              <Image src={p.image} alt={p.caption} loading="eager" />
              <span className="image-badge">{p.status}</span>
              <span className="round-arrow">↗</span>
            </div>
            <p className="eyebrow">
              {p.city} / {p.size}
            </p>
            <h3>{p.name}</h3>
            <small>{p.caption}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}
