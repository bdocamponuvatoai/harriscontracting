import { Suspense } from "react";
import { PageIntro } from "@/components/sections/page-intro";
import { Planner } from "@/components/start/planner";
import { PlannerWithPresets } from "@/components/start/planner-with-presets";
import { pageMetadata } from "@/lib/metadata";

const LEAD =
  "A few details help make the first conversation more useful. Prepare your brief, then choose how to share it.";

export const metadata = pageMetadata({
  title: "Start your project",
  path: "/start/",
  description: LEAD,
});

export default function StartPage() {
  return (
    <>
      <PageIntro
        label="YOUR PROJECT STARTS HERE"
        title="Let’s give your ideas a plan."
        text={LEAD}
      />
      {/* The fallback is the planner without presets, so the exported HTML contains the full form. */}
      <Suspense fallback={<Planner />}>
        <PlannerWithPresets />
      </Suspense>
    </>
  );
}
