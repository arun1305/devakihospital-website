# Devaki Speciality Hospital — Public Website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 site for Devaki Speciality Hospital, powered by the [`devakihospital-backend`](../devakihospital-backend) API.

## Stack

- Next.js 15, React 19, TypeScript
- Tailwind CSS v4 (CSS-based `@theme` design tokens — see `app/globals.css`)
- Framer Motion for micro-interactions, scroll reveals, and counters
- Swiper for the testimonials carousel
- React Hook Form + Zod for client-side form validation
- TanStack React Query for client-side mutations (appointment/contact forms)
- Axios for the client API layer; native `fetch` (with Next cache tags) for server-rendered data

## Getting started

Requires **Node.js 20+** (Next.js 15 does not support Node 18). This repo pins Node 22 for local dev (`nvm use 22`).

```bash
nvm use 22
npm install
cp .env.local.example .env.local   # point NEXT_PUBLIC_API_URL at the backend
npm run dev                         # http://localhost:3000
```

The site works even if the backend API is unreachable — server data-fetchers in `lib/api-server.ts`
fail gracefully and pages fall back to representative content in `lib/fallback-content.ts`, so the
UI is never empty during first-run or backend downtime. Live CMS data always takes precedence.

## What's implemented

- Full design system: brand palette (extracted from the hospital logo), typography, glass/gradient
  primitives, reusable UI kit (`components/ui`)
- Site chrome: top bar, mega-menu navbar, footer — all animated, fully responsive
- Homepage: hero, quick access, why-choose-us, animated counters, departments grid, doctors
  preview, testimonials carousel, insurance/accreditation trust bar, blog/news preview, FAQ,
  appointment CTA
- `/departments` and `/departments/[slug]` (overview, treatments, facilities, technology, doctors,
  FAQ, appointment CTA)
- `/doctors` and `/doctors/[slug]` — filterable directory (department, gender, experience,
  language) with a live appointment form
- `/appointment` and `/contact` pages with validated forms wired to the backend API, including a
  department contact directory (phone/email per department, when set in the CMS)
- `/about` — mission, vision, chairman's message, journey timeline, infrastructure, awards &
  accreditations, management team, core values
- `/health-packages` and `/health-packages/[slug]` with a booking form
- `/blog` and `/blog/[slug]`, `/news` and `/news/[slug]` — rich-content article pages with
  Article JSON-LD
- `/events` and `/events/[slug]` with event registration
- `/gallery`, `/gallery/[slug]` (photo grid + video playback), `/gallery/virtual-tour`
- `/careers` and `/careers/[slug]` with a resume-upload application form
- `/faq` — categorised FAQ page with FAQ JSON-LD
- `/services` hub plus `/services/emergency`, `/lab`, `/pharmacy`, `/home-care`, `/telemedicine`,
  `/international-patients` (enquiry form), `/second-opinion` (enquiry form)
- `/patient-resources/visitor-guidelines`, `/admission-billing`, `/insurance`, `/health-library`,
  `/patient-rights`, `/privacy`
- SEO: per-page metadata, Organization/Hospital JSON-LD, Department/Physician/Article/FAQ/
  Breadcrumb JSON-LD, dynamic `sitemap.xml` covering every content type, `robots.txt`

Every dynamic list/detail page follows the same pattern: a fetcher in `lib/api-server.ts`, a
fallback dataset in `lib/fallback-content.ts` so the page is never empty, and a page composed from
`components/sections`, `components/forms`, and `components/ui`.

## Code quality

Husky + lint-staged run ESLint (`--fix`) on staged `.ts`/`.tsx` files and Prettier on staged
`.json`/`.css`/`.md` files before every commit (`.husky/pre-commit`). Requires Node 20+ — the hook
uses `Array.prototype.toSorted`, which isn't available on Node 18.

## Scripts

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm start` — run production build
- `npm run lint` — ESLint
- `npm run format` — Prettier write

## Deployment

Deploy to Vercel. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_API_URL` as environment variables
pointing to the production domain and the deployed backend API.
