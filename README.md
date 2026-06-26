# Brandora — Marketing Agency Website

A modern, premium marketing-agency website built with Next.js. Design direction is
**Data-Forward**: cobalt + lime on a cool near-white canvas, with a signature
"growth-graph" system (an animated hero area chart, count-up metric counters, and
inline sparklines) that ties the visuals to the agency's results-driven promise.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** with a custom token layer (`src/app/globals.css`)
- **Framer Motion** for orchestrated, reduced-motion-aware animation
- **lucide-react** icons, **next/font** (Space Grotesk · Inter · JetBrains Mono)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000  (PORT=3210 npm run dev to change port)
npm run build        # production build
npm run start        # serve the production build
npm run lint
```

## Structure

```
src/
  app/
    page.tsx                 # home (all landing sections)
    blog/                    # blog index + [slug] post pages
    work/[slug]/             # case-study detail pages
    api/contact/route.ts     # contact form handler (validated)
    sitemap.ts robots.ts opengraph-image.tsx icon.tsx not-found.tsx
  components/                # Header, Footer, and all sections
    ui/                      # Button, Reveal, StatCounter, Sparkline, AreaChart…
  content/                   # services, process, caseStudies, testimonials,
                             # pricing, faq, posts  (edit copy here)
  lib/                       # site config + utils
```

## Editing content

All copy lives in `src/content/*` and `src/lib/site.ts` (brand name, contact info,
nav, social links). Update those files — no component edits needed for routine copy
or case-study/blog changes. Blog posts use a simple typed block format (`p`, `h2`,
`ul`, `quote`).

## Contact form

`POST /api/contact` validates submissions server-side. To deliver leads, set an
endpoint (Formspree, Zapier, a Slack webhook, or your own email service) via the
`CONTACT_FORWARD_URL` environment variable. Without it, submissions are validated
and logged to the server console so nothing is lost during setup.

## Notes

- Imagery is loaded from Unsplash via `next/image` (allowed host in `next.config.ts`).
  Swap the URLs in `src/content/*` for licensed/owned assets before going to production.
- All motion respects `prefers-reduced-motion`. The build prerenders every page
  (home, blog, case studies) as static HTML for SEO and speed.
- Update `site.url` / `site.domain` in `src/lib/site.ts` to your real domain so
  metadata, sitemap, and robots point to the right place.
