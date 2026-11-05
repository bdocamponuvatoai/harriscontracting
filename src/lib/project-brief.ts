// Framework-free helpers for the project planner's brief, email draft and download.

type BriefDetails = {
  type: string;
  city: string;
  size: string;
  timing: string;
  plans: string;
  name: string;
  email: string;
  notes: string;
};

export function buildBrief(d: BriefDetails): string {
  return `Harris Contracting — Project brief\n\nProject: ${d.type}\nCity: ${d.city}\nSize: ${d.size}\nTiming: ${d.timing}\nPlans: ${d.plans}\nName: ${d.name}\nEmail: ${d.email}\n\nIdeas: ${d.notes}`;
}

export function buildMailtoHref(to: string, type: string, brief: string): string {
  return (
    "mailto:" +
    to +
    "?subject=" +
    encodeURIComponent("New project enquiry — " + type) +
    "&body=" +
    encodeURIComponent(brief)
  );
}

export const BRIEF_FILENAME = "harris-project-brief.txt";
