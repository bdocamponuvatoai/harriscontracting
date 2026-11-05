import Image from "next/image";
import type { ReactNode } from "react";
import founderImage from "@/assets/images/founder.webp";

/** Founder portrait with copy; shared by the home and about pages. */
export function FounderSection({
  alt,
  lazy,
  children,
}: {
  alt: string;
  lazy?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="founder section">
      <div className="founder-image">
        <Image src={founderImage} alt={alt} loading={lazy ? "lazy" : "eager"} />
        <span>CALVIN HARRIS / FOUNDER & PRESIDENT</span>
      </div>
      <div className="founder-copy">{children}</div>
    </section>
  );
}
