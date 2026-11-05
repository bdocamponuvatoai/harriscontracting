import Image from "next/image";
import { organizations } from "@/content/organizations";

export function OrganizationExperience() {
  return (
    <section className="organization-experience" aria-labelledby="organization-heading">
      <h2 id="organization-heading">
        Experience working with
        <br />
        leading organizations.
      </h2>
      <ul className="organization-logos" aria-label="Organizations featured by Harris Contracting">
        {organizations.map((org) => (
          <li key={org.name}>
            <Image
              src={org.logo}
              alt={org.name}
              width={450}
              height={150}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
