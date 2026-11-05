"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/config/site";
import { cities } from "@/content/company";

export function CityDirectory() {
  const [search, setSearch] = useState("");
  const query = search.toLowerCase();
  const matches = cities.filter((c) => c.toLowerCase().includes(query));
  return (
    <section className="section area-directory">
      <label className="search-label">
        Find your city
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search service areas"
        />
      </label>
      <div className="city-grid" aria-live="polite">
        {matches.map((c) => (
          <Link key={c} href={"/start/?city=" + encodeURIComponent(c)}>
            {c}
            <span>↗</span>
          </Link>
        ))}
      </div>
      {matches.length === 0 && (
        <p>
          {"No listed city matches. "}
          <a href={site.phone.href}>Call to confirm service coverage ↗</a>.
        </p>
      )}
      <p>
        Every property is different. Local approvals, site conditions, and association requirements
        are reviewed as part of project planning.
      </p>
    </section>
  );
}
