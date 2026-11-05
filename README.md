# Harris Contracting website

Marketing site for Harris Contracting, LLC (residential construction, Broward County & Boca Raton).
Next.js App Router, exported as a fully static site (`out/`). No server, database or form backend:
the project planner builds a brief in the browser and hands it to the visitor's email app.

## Getting started

Requires Node.js 20.9 or later (CI uses the version in `.nvmrc`).

```bash
npm ci            # install exactly what package-lock.json pins
npm run dev       # http://localhost:3000
npm run build     # static export to out/
npm run preview   # serve out/ locally (npx serve@14)
```

## Scripts

| Script                    | What it does                                                                    |
| ------------------------- | ------------------------------------------------------------------------------- |
| `dev`                     | Next.js dev server                                                              |
| `build`                   | Production build and static export to `out/`                                    |
| `postbuild`               | Runs automatically after `build`: `scripts/fix-export-segments.mjs` (see below) |
| `preview`                 | Serves `out/` with `npx serve@14` (not a dependency)                            |
| `lint`                    | ESLint (`eslint-config-next` core-web-vitals + TypeScript)                      |
| `typecheck`               | `next typegen` then `tsc --noEmit`                                              |
| `format` / `format:check` | Prettier write / check                                                          |
| `check`                   | `typecheck` + `lint` + `format:check` (what CI runs before building)            |

`scripts/fix-export-segments.mjs` works around a Next.js static-export bug on Windows: prefetch
segment files are written into nested folders (`__next.about/__PAGE__.txt`) instead of flat files
(`__next.about.__PAGE__.txt`), so link prefetches 404. On Linux/macOS it finds nothing to do.

## Structure

```
src/
  app/            routes (one folder per route; [slug] routes use generateStaticParams and
                  dynamicParams = false), layout.tsx, not-found.tsx, icon.svg, robots.ts,
                  sitemap.ts, fonts.ts
  components/
    layout/       site header (client: mobile menu) and footer
    sections/     shared sections: page intro, call to action, process (client),
                  finish selector (client), founder
    home/         home-only sections: service explorer (client), project cards, organisations
    projects/     portfolio filter (client)
    service-area/ city search (client)
    start/        project planner (client) and its ?service= / ?city= presets
    seo/          JSON-LD
    ui/           SmartLink, ButtonLink, TextLink, Brand, CheckList
  config/
    site.ts       business details and navigation (safe in client code)
    deployment.ts SITE_URL / SITE_INDEXABLE (server only)
  content/        typed copy: services, projects, process, cities, finish packages, FAQ,
                  licences, organisations
  lib/            framework-free helpers: page metadata, project brief + mailto, JSON-LD
  styles/         globals.css imports ordered partials: base/, components/, sections/, pages/
  assets/         images/ and fonts/ (static imports)
scripts/          fix-export-segments.mjs
docs/             verification.md, content-sources.md, color-palette.md
```

## Conventions

- **Facts come only from the company's own website** (see `docs/content-sources.md`). Do not add
  hours, prices, reviews, ratings, certifications or project details that are not published there.
- **Server Components by default.** Client components exist only for real interactivity: the menu,
  the toggle groups (service explorer, process, finish packages, portfolio filter), city search and
  the planner.
- **CSS partial order matters.** `src/styles/globals.css` imports partials in the order their rules
  appeared in the original stylesheet. Rules of equal specificity resolve by source order, so
  moving an import can change the design. Class names and the DOM are unchanged from the original
  site; keep them in sync with the CSS.
- **Text nodes.** Where copy mixes literal text and values, keep it as one string
  (``{`Or call ${site.phone.display}`}``) so the rendered text matches the original exactly.
- **Images** use `next/image` with static imports. The home hero is `loading="eager"` and
  `fetchPriority="high"`; images that were eager on the original site stay eager.
- **Fonts** are self-hosted with `next/font/local` (DM Sans, Manrope; SIL OFL 1.1, licences in
  `src/assets/fonts/`). CSS uses `var(--font-sans)` and `var(--font-display)`, never literal names.
- **Links:** internal routes go through `SmartLink`/`next/link` with trailing slashes
  (`/about/`); `tel:`, `mailto:` and external links are plain `<a>`.

## Routes

| Route                                                                                       | Page                                                               |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `/`                                                                                         | Home                                                               |
| `/services/`                                                                                | Services directory                                                 |
| `/services/{home-additions,second-story-additions,adu-construction,new-home-construction}/` | Service pages                                                      |
| `/projects/`                                                                                | Portfolio with status filter                                       |
| `/projects/{hollywood-addition,fort-lauderdale-second-story,wilson-living}/`                | Project pages                                                      |
| `/approach/`                                                                                | Process, finish packages, FAQ                                      |
| `/about/`                                                                                   | Founder and licences                                               |
| `/service-area/`                                                                            | 20-city search                                                     |
| `/start/`                                                                                   | Project planner (`?service=<slug>`, `?city=<name>` presets)        |
| `/privacy/`                                                                                 | How the site handles information                                   |
| `/robots.txt`, `/sitemap.xml`                                                               | Generated from `SITE_URL` / `SITE_INDEXABLE` and the content files |
| anything else                                                                               | Styled 404 (`out/404.html`)                                        |

## Configuration

Copy `.env.example` to `.env.local` for local overrides. Values are read at build time.

| Variable         | Default                                                                          | Effect                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | `https://$VERCEL_PROJECT_PRODUCTION_URL` on Vercel, else `http://localhost:3000` | Origin for canonical URLs, Open Graph, sitemap and robots. Trailing slash stripped.                                                |
| `SITE_INDEXABLE` | unset (not indexable)                                                            | `true` removes `noindex` and lets `robots.txt` allow crawling. The build fails if this is `true` while the URL is still localhost. |

## Before launch

- [ ] Owner confirms every company fact on the site (licences, hours, project status, founder bio,
      the review quote, the 20 service-area cities).
- [ ] Replace the two AI-generated images (home hero and "For the life inside") with real
      photography, or keep their "Illustrative" labels.
- [ ] Decide what happens to harris-contracting.com: the reviews, contact form and planning-range
      links point to the current site.
- [ ] Review `/privacy/` with the owner; it describes only how this site behaves.
- [ ] Approve the browser-tab icon (a simple "H" mark, not company artwork).
- [ ] Point the domain at Vercel, set `SITE_URL` for Production, then `SITE_INDEXABLE=true`.
- [ ] Run Lighthouse against the live URL and submit `sitemap.xml` in Google Search Console.

## CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests: `npm ci`,
`npm run check`, `npm run build`, then uploads `out/` as the `site` artifact. Dependabot
(`.github/dependabot.yml`) opens weekly npm updates (Next/React and `@types/*` grouped) and monthly
GitHub Actions updates.

`npm audit --omit=dev` reports 0 vulnerabilities. The full audit lists a moderate advisory in
`minimatch` (GHSA-g3hv-75wg-m249) pulled in by `eslint-config-next` → `@typescript-eslint`. It
affects the linter only, nothing in the exported site, and npm's suggested fix is a downgrade of
`eslint-config-next`, so it is left for the upstream update.

## Hosting (Vercel)

1. On vercel.com, **Add New → Project** and import `bdocamponuvatoai/harriscontracting`.
2. Framework preset: **Next.js** (detected). Keep the default build command and output settings;
   Vercel detects the static export in `out/`.
3. Environment variables: leave `SITE_INDEXABLE` unset (or `false`) for **Preview**. For
   **Production**, set `SITE_URL` to the real domain once it is connected, and set
   `SITE_INDEXABLE=true` only after the owner approves launch.
4. Deploy. `vercel.json` adds security headers (`X-Content-Type-Options`, `Referrer-Policy`,
   `X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security`). No Content Security
   Policy is set: Next.js inlines bootstrap scripts, and a CSP has not been tested against them.

Preview URL: _not deployed yet_.

## Verification

`docs/verification.md` records the migration checks: pixel comparisons against the original site
at six widths, computed-style and DOM comparisons, behaviour and navigation tests.
