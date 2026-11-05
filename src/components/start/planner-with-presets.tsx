"use client";

import { useSearchParams } from "next/navigation";
import { cities } from "@/content/company";
import { services } from "@/content/services";
import { Planner } from "./planner";

/**
 * Applies `?service=<slug>` and `?city=<name>` presets. Rendered inside
 * <Suspense fallback={<Planner />}> so the static HTML still contains the form.
 */
export function PlannerWithPresets() {
  const params = useSearchParams();
  const initialType = services.find((s) => s.slug === params.get("service"))?.name ?? "";
  const city = params.get("city");
  const initialCity = city && cities.includes(city) ? city : "";
  return (
    <Planner
      key={`${initialType}|${initialCity}`}
      initialType={initialType}
      initialCity={initialCity}
    />
  );
}
