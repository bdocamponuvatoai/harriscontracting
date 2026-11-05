import Image from "next/image";
import { notFound } from "next/navigation";
import { CallToAction } from "@/components/sections/cta";
import { PageIntro } from "@/components/sections/page-intro";
import { TextLink } from "@/components/ui/text-link";
import { getProject, projectHref, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: project.name,
    path: projectHref(project.slug),
    description: project.text,
    image: project.image,
    imageAlt: project.caption,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <>
      <PageIntro
        label={project.status}
        title={project.name}
        text={project.type + " · " + project.city}
      />
      <figure className="detail-photo">
        <Image src={project.image} alt={project.caption} loading="eager" />
        <figcaption>{project.caption}</figcaption>
      </figure>
      <section className="section split-copy">
        <div>
          <p className="eyebrow">PROJECT OVERVIEW</p>
          <h2>Built with purpose.</h2>
        </div>
        <div>
          <dl className="project-facts">
            <div>
              <dt>Location</dt>
              <dd>{project.city}</dd>
            </div>
            <div>
              <dt>Scale</dt>
              <dd>{project.size}</dd>
            </div>
            <div>
              <dt>Published status</dt>
              <dd>{project.status}</dd>
            </div>
          </dl>
          <p className="lead">{project.text}</p>
          <TextLink href="/projects/">← Back to all projects</TextLink>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
