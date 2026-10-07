# Developer Portfolio Website — Plan

## Context
A personal portfolio website for **Harshad**, a software developer, to showcase projects, skills, and experience. Greenfield build in a fresh git repo (`Portfolio_Website/`, currently only a README). Goal: a fast, responsive, professional, dark-first portfolio with a working contact form, dark/light theme, and a downloadable résumé — deployed to Vercel.

**Decisions locked in:**
- Role: Software developer
- Stack: **Next.js + Tailwind CSS** (+ TypeScript)
- Features: working **contact form**, **dark/light mode**, **résumé download**
- Hosting: **Vercel**
- Design inspiration: **codedbyayham.com** (adapt, don't clone)

## Design Direction — inspired by codedbyayham.com
- **Theme:** Dark-first, near-black background (~#0a0a0a), high-contrast white text, monochrome/grayscale palette with one subtle accent (e.g. green "available" status dot). Grayscale photos. Light theme is a well-designed counterpart.
- **Typography:** Large bold **display grotesk** headings (Geist / Neue Montreal feel) with emphasis words as **outlined/stroked text**. **Monospace** for all UI meta — kicker labels, section numbers, tags (`< WEB DEVELOPER />`, `03 / MY STACK`, `BUILD / 01`).
- **Navbar:** Floating **rounded pill**, sticky, translucent with backdrop blur — logo left, centered links, circular theme toggle right.
- **Sections numbered** `01`–`06` with monospace kicker labels.
- **Components:** Rounded **pill buttons**, bordered rounded cards with subtle 1px borders, skills as **icon grids grouped Frontend/Backend**, projects as a **carousel/slider**, feature tags with `</>` glyphs + numbers.
- **Background & motion:** Faint particle/star field, soft glows, an **intro loading screen** (logo reveal, progress %, "READY"), smooth-scroll and entrance animations.
- **Footer:** Logo + tagline, NAVIGATION column, CONNECT social icons as rounded-square buttons.

## Tech Stack
- **Next.js 15 (App Router)** + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **next-themes** — dark/light mode, persisted, no flash
- **Framer Motion** — scroll/entrance animations (lightweight use)
- **lucide-react** — icons
- **next/font** — display grotesk + monospace
- **Resend** + a Next.js Route Handler — working contact form (server-side, key stays secret)
- **react-hook-form** + **zod** — form validation
- Deploy: **Vercel**

## Site Structure (sections)
Single scrolling page with anchor nav + optional detail routes:
- **Navbar** — logo/name, section links, theme toggle, Resume button
- **Hero** — name, title, one-line pitch, CTAs, availability status, social links
- **About** — bio, grayscale photo, availability
- **Skills** — grouped tech (Frontend / Backend / Tools) as icon grids
- **Projects** — 3–6 cards / carousel: thumbnail, description, tech tags, live + source links
- **Experience** — timeline of roles
- **Contact** — validated form that actually sends email
- **Footer** — socials, navigation, copyright

Optional later: `/projects/[slug]` case-study detail pages.

## File / Folder Layout
```
Portfolio_Website/
├── app/
│   ├── layout.tsx            # root layout, ThemeProvider, SEO metadata, fonts
│   ├── page.tsx              # assembles all sections
│   ├── globals.css           # Tailwind + theme tokens
│   └── api/contact/route.ts  # POST handler -> Resend
├── components/
│   ├── Navbar.tsx, ThemeToggle.tsx, Footer.tsx, LoadingScreen.tsx
│   ├── sections/ (Hero, About, Skills, Projects, Experience, Contact)
│   └── ui/ (Button, Card, SectionHeading, etc.)
├── lib/data.ts               # single source of truth: projects, skills, experience, socials, siteConfig
├── public/ (resume.pdf, profile.jpg, projects/…)
├── .env.local / .env.example # RESEND_API_KEY, CONTACT_TO_EMAIL
└── config files (next.config, tailwind, tsconfig, package.json, .gitignore)
```

## Implementation Steps
1. **Scaffold** Next.js (TypeScript, Tailwind, App Router, ESLint) into the existing repo.
2. **Fonts & theme tokens** — wire display + mono fonts; define light/dark CSS color tokens.
3. **Theme toggle** — next-themes ThemeProvider + toggle, no flash.
4. **Data layer** — `lib/data.ts` with typed content + siteConfig.
5. **Shell** — floating pill Navbar (responsive + mobile menu), Footer, intro LoadingScreen.
6. **Sections** — Hero → About → Skills → Projects → Experience, each responsive, reading from data, with entrance animations.
7. **Contact form** — react-hook-form + zod → `api/contact/route.ts` → Resend; success/error states + honeypot.
8. **SEO/polish** — metadata + Open Graph, favicon, sitemap/robots, accessibility, Lighthouse pass.
9. **Assets** — placeholder résumé, photo, project thumbnails (user swaps in real content).

## Environment / Secrets
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL` in `.env.local` (gitignored) + Vercel env vars; documented in `.env.example`. User creates the Resend key (free); I'll provide exact steps. Until then the form runs in dev/echo mode.

## Verification
- `npm run dev` → verify every section renders and is responsive (mobile + desktop).
- Toggle dark/light → persists, no flash.
- Submit contact form (valid + invalid) → zod validation, success state, real email once key is set.
- Resume button → PDF opens/downloads.
- `npm run build` → clean production build.
- Vercel preview deploy → smoke-test live URL.

## Deployment (final, user-driven)
1. Push to GitHub. 2. Import into Vercel, add env vars, deploy. 3. (Optional) custom domain.

---
*Status: awaiting further instructions before implementation.*
