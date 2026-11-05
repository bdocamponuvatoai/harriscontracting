import "server-only";

/**
 * Deployment settings, read from the environment at build time.
 * Server-only: never import this from a client component.
 *
 * - SITE_URL: canonical origin, e.g. https://www.example.com
 *   Falls back to the Vercel production domain, then to localhost.
 * - SITE_INDEXABLE: "true" to allow search engines. Anything else keeps the
 *   site noindex and robots.txt disallowing everything.
 */
function resolveSiteUrl(): string {
  const fromEnv = process.env.SITE_URL?.trim();
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const url =
    fromEnv || (vercelProduction ? `https://${vercelProduction}` : "http://localhost:3000");
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const isIndexable = process.env.SITE_INDEXABLE === "true";

if (isIndexable && ["localhost", "127.0.0.1"].includes(new URL(siteUrl).hostname)) {
  throw new Error(
    "SITE_INDEXABLE is true but the site URL is still localhost. Set SITE_URL to the public domain.",
  );
}
