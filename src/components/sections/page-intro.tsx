import Link from "next/link";

export function PageIntro({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <section className="page-intro">
      <Link href="/" className="back-link">
        ← Home
      </Link>
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      {text && <p className="lead">{text}</p>}
    </section>
  );
}
