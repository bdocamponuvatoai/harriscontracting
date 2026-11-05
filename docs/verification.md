# Verification: legacy site → Next.js static export

Measured on 5 November 2026. Windows 11, Node 24.15.0, Chrome 156.0.8078.80 (driven by
`playwright-core` 1.64.1, no browser download), `next` 16.4.5, `react` 19.3.1.

## Baseline

The legacy site was a ChatGPT "Sites" project: React 19 rendered by `vinext` 1.0.0-beta.5
(a Vite re-implementation of the Next.js App Router) inside a Cloudflare Worker. There was no
`build.py`/`dist/`. A full copy of the original folder was taken before any change, its production
build was made with `vinext build`, and it was served locally with `vinext start`. That production
server is the comparison baseline for everything below.

## Inventory of the legacy site

- **Routes (15 + 404):** `/`, `/services`, four `/services/<slug>`, `/projects`, three
  `/projects/<slug>`, `/approach`, `/about`, `/service-area`, `/start`, `/privacy`.
- **Shared chrome:** skip link; header (logo, four nav links, phone, "Start your project", mobile
  menu toggle); call-to-action band; footer (brand, services, explore, contact and hours, licence
  line, preview note).
- **Behaviour:** mobile menu (closes on route change and Escape); four toggle-button groups using
  `aria-pressed` (home service explorer, construction process, finish packages, portfolio filter);
  city search with a no-match message; native `<details>` FAQ; three-step planner (`?service=` and
  `?city=` presets, "choose a project type" error, native required/email validation, review,
  `mailto:` draft, `.txt` download, focus moved to each step heading). No clipboard code.
- **Head:** title template `%s | Harris Contracting`, one shared description,
  `robots: noindex, nofollow`, favicon. No canonical, Open Graph, theme colour or JSON-LD.
- **CSS:** one minified file: tokens, base rules, then `min-width:1800`, `max-width:1100/800/380`,
  reduced-motion, and an appended organisation-logo block with `max-width:1000/600`. Fonts came
  from Google Fonts (`DM Sans`, `Manrope`) by `@import`.
- **Assets:** 18 images, 17 used (`drywall.webp` unused).

## Results

| Check                                                                                                                                                                  | Result                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`                                                                                                                                                        | Pass. 20 static pages; 15 prefetch segment files flattened by `postbuild`                                                                                                          |
| `npm run check` (typecheck, lint, Prettier)                                                                                                                            | Pass                                                                                                                                                                               |
| Pixel diff: 17 URLs (15 routes, a `?service=&city=` preset, the 404) × 6 widths (1600/1280/1024/768/390/320), full page                                                | **102 / 102 pixel-identical** (pixelmatch threshold 0, anti-aliasing counted)                                                                                                      |
| Computed styles: every element and `::before/::after/::placeholder`, 16 URLs × 7 widths (incl. 1920 for the 1800px query) × interactive states, 164 combinations       | 0 differences, except `background-position: 0px 0px` vs `0% 0%` on buttons with no background image (the legacy minifier rewrote `background:none` as `background:0 0`; invisible) |
| DOM structure (elements, classes, ids, ARIA, text-node boundaries) after hydration                                                                                     | Identical on 15 of 17 URLs; `/start` differs only by the per-step wrappers described below                                                                                         |
| Behaviour parity: same script on both sites, JSON compared                                                                                                             | 21 / 25 identical; the 4 differences are intended (below)                                                                                                                          |
| Interactive-state screenshots (menu open, explorer, process, finish packages, portfolio filter, city no-match, FAQ open, planner error / step 2 / review)              | 10 / 10 pixel-identical                                                                                                                                                            |
| Navigation on the new build (client-side links keep JS state, titles, `aria-current`, `?service`/`?city` presets via links, Back, hash scroll, menu Escape focus, 404) | 18 / 18 pass. 1,085 requests (460 prefetch/RSC), **zero 4xx/5xx**, **zero console errors or hydration warnings**                                                                   |

Behaviour covered: menu open/Escape/resize/close-on-navigate; all four explorer states; all three
process states plus Tab, Enter and Space; all finish packages; every portfolio filter; city search
for empty, `boca`, `PARK` and `zzz`; FAQ open; planner error, type choice, focus on each step
heading, empty-field validation (`Please select an item in the list.` / `Please fill out this
field.`), invalid email, the review text, the exact `mailto:` href, the downloaded file name and
contents, Back keeping all seven values, re-review producing the same brief, valid and invalid
presets, and the city-link preset.

### Intentional differences

1. **The menu closes when the window is resized to desktop width**, and Escape from inside the
   open menu returns focus to the toggle. The legacy menu stayed open across a resize.
2. **Internal links navigate client-side.** In the legacy build every `next/link` logged
   `[vinext] RSC prefetch setup error: TypeError: ne is not a function` and a click threw
   `e is not a function` without navigating (reproduced under both `vinext start` and
   `wrangler dev`). The new build navigates without errors.
3. **Planner steps stay mounted** inside `hidden` wrappers (the legacy unmounted inactive steps and
   kept values in React state). Values survive Back either way; validation uses
   `reportValidity()` on the visible step only, so the form carries `novalidate`.
4. **`<head>` additions:** canonical URL, Open Graph and Twitter cards (each page's own image),
   `theme-color`, font preloads, `data-scroll-behavior="smooth"`, and a per-page description taken
   from that page's existing copy. The 404 page is titled `Page not found | Harris Contracting`
   (legacy used the default title). JSON-LD (`GeneralContractor`, facts from the site only) is on
   the home page.
5. **Fonts are self-hosted** with `next/font/local`: the exact latin `.woff2` files Google served
   the legacy page, with the same `unicode-range`, so arrows (↗ → ← ✓) still fall back to the same
   system glyphs. No adjusted fallback face is generated.

### CSS split

`app/globals.css` was split into 37 partials by a one-off PostCSS script: each rule classified by
its first class or element (the script fails on anything unclassified), base rules kept in source
order followed by media blocks in the original media order, `@import`/`@font-face` dropped, literal
family names replaced by `var(--font-sans)` / `var(--font-display)`, Prettier applied. The
selector × declaration multiset was asserted unchanged (1,045 pairs; 985 raw declarations; three
multi-selector rules were split across partials). Partials are imported in the order their rules
first appear in the original.

Changes made after the split, all verified by the computed-style comparison:

- Two tokens on `:root` (`--font-sans`, `--font-display`).
- Five explicit mobile overrides (`.intro`, `.services`, `.process-long`, `.area-directory`,
  `.prose`). In the single file, `@media (max-width:800px) { .section { padding: 65px 6% } }`
  overrode those sections' own `padding-top` by source order; in partials it no longer comes
  later, so each partial now states the mobile value itself.
- `.founder-image img { height: auto }`: `next/image` writes `width`/`height` attributes, and
  without this the square `aspect-ratio` crop would take the attribute height.

### Capture method and artefacts found

Both sites are captured with reduced motion, every image switched to `loading="eager"` and awaited
with `img.decode()`, `document.fonts.ready`, then one forced re-raster of all images, in a fresh
browser context per capture. Two capture artefacts were found and fixed before the numbers above
were taken; neither is a design difference:

- Heavily downscaled photos and the 1200px logo shown at 150px rastered differently depending on
  whether Chrome painted them before or after `img.decode()` resolved. Legacy-vs-legacy captures
  of the 404 page differed by 154 px in the same way. Forcing a re-raster after all decodes made
  both builds converge on the same render.
- A tab reused across pages keeps decoded images at earlier sizes; the townhomes photo then
  rastered differently on `/projects`. Each scenario block now starts in a fresh context.

### Head tags (old → new)

| Tag                                           | Legacy                 | New                                                               |
| --------------------------------------------- | ---------------------- | ----------------------------------------------------------------- |
| `<title>`                                     | Per-page titles        | Unchanged, except the 404: `Page not found \| Harris Contracting` |
| `description`                                 | One shared description | Home keeps it; other pages use their own lead copy                |
| `robots`                                      | `noindex, nofollow`    | `noindex, nofollow` until `SITE_INDEXABLE=true`                   |
| canonical, `og:*`, `twitter:*`, `theme-color` | none                   | present; URLs from `SITE_URL`                                     |
| icon                                          | `/favicon.svg`         | `/icon.svg` (same artwork)                                        |

## After cleanup (preview wording removed)

Owner-facing "preview" framing was removed: the footer preview note, the "Preview privacy" label
and page wording, "This preview does not book…" in the planner (now "This planner…"), and the
project-page status note. The 18px the footer note added is now footer bottom padding; the 25px
the project note provided is now `margin-top` on `.split-copy .text-link`.

| Check                                                             | Result                                                                                                                                                                                                         |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Rows above the first edited element vs legacy, 17 URLs × 6 widths | **102 / 102 identical**, the edited element starting at the same y in both (one capture needed a second attempt)                                                                                               |
| Behaviour parity                                                  | 21 / 25 identical (same 4 intended differences); 7 / 10 state screenshots identical, the 3 planner states differ only in a 110×9 px band where "preview" became "planner"                                      |
| Navigation (local export)                                         | 18 / 18; 1,090 requests, zero 4xx/5xx, zero console errors                                                                                                                                                     |
| `npm run check`, `npm run build`                                  | Pass                                                                                                                                                                                                           |
| `npm audit --omit=dev`                                            | 0 vulnerabilities (dev-only: 8 moderate, one `minimatch` advisory via `eslint-config-next`)                                                                                                                    |
| Indexing modes                                                    | Default: `noindex, nofollow`, `robots.txt` disallows all. `SITE_URL` + `SITE_INDEXABLE=true`: `index, follow`, sitemap linked, canonicals on that domain. `SITE_INDEXABLE=true` alone: build fails as intended |

Capture determinism: legacy-vs-legacy captures varied in up to 12 / 102 cases on this machine
(image decode timing, LCD text antialiasing, glyph raster). Both sites are now captured with the
same Chrome flags (`--disable-checker-imaging`, software raster, no partial raster,
`--disable-lcd-text`, fixed sRGB), which brought legacy-vs-legacy variance to 2 / 102. A pair is
retried up to three times; retries are reported above.

## Live deployment

https://harriscontracting.vercel.app (Vercel, production branch `main`, `SITE_INDEXABLE` unset),
checked 6 November 2026:

- 16 routes return 200; `/nope/` returns 404 with the styled page; `/about` → 308 `/about/`.
- Headers present: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
  `Permissions-Policy`, `Strict-Transport-Security`.
- `robots.txt` disallows everything; `sitemap.xml` lists 15 URLs on `harriscontracting.vercel.app`;
  canonical URLs use the same domain.
- Navigation test: 18 / 18; 1,059 requests (444 prefetch/RSC), zero 4xx/5xx, zero console errors.
- CI: https://github.com/bdocamponuvatoai/harriscontracting/actions/runs/42066855568 (pass).

Lighthouse 13.6.0, mobile preset (Moto G Power emulation, simulated throttling: 150 ms RTT,
~1.6 Mbit/s, 4× CPU), Chrome 156, three runs per page against the live URL:

| Page      | Performance | Accessibility | Best practices | SEO | LCP       | TBT       | CLS     | Weight    |
| --------- | ----------- | ------------- | -------------- | --- | --------- | --------- | ------- | --------- |
| `/`       | 77–84       | 96            | 100            | 69  | 4.2–6.0 s | 35–80 ms  | 0–0.001 | 1,383 KiB |
| `/start/` | 96–100      | 96            | 100            | 69  | 0.9–1.0 s | 23–212 ms | 0       | 267 KiB   |

- SEO: the only failing audit is `is-crawlable` (the intended `noindex`).
- Accessibility: the only failing audit is `color-contrast`: `.service-number` `#757c85` on
  `#fbf9f5` (4.01:1) on the home page and inactive planner step labels `#6f7884` (4.25:1).
- Performance (home): images are served at full size (no `srcset` with `images.unoptimized`); the
  hero is 435 KiB with an estimated 349 KiB saving, and Lighthouse estimates up to 941 KiB across
  all images.
