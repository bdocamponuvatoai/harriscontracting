import Image from "next/image";
import Link from "next/link";
import { projectHref, projects } from "@/content/projects";

/** Featured project cards on the home page. */
export function ProjectCards() {
  return (
    <div className="project-grid">
      {projects.map((p) => (
        <Link href={projectHref(p.slug)} className="project-card" key={p.slug}>
          <div className="project-image">
            <Image src={p.image} alt={p.caption} loading="lazy" />
            <span className="image-badge">{p.status}</span>
            <span className="round-arrow">↗</span>
          </div>
          <div className="project-meta">
            <span>
              {p.city} / {p.type}
            </span>
            <span>{p.size}</span>
          </div>
          <h3>{p.name}</h3>
          {p.cardNote && <small>{p.cardNote}</small>}
        </Link>
      ))}
    </div>
  );
}
