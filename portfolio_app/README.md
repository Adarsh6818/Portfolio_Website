# Portfolio Website

A dark-first, responsive developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Features a working contact form, dark/light theme, and a downloadable résumé.

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (class-based dark mode via `next-themes`)
- Framer Motion (entrance animations + intro screen)
- lucide-react + inline brand SVGs
- react-hook-form + zod (contact form)
- Resend (contact email delivery)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build` (production build), `npm start` (serve build), `npm run lint`.

## Customize your content

All content lives in one file — **`src/lib/data.ts`**:

- `siteConfig` — name, role, tagline, bio, email, location, résumé path
- `socials` — your social links
- `skills` — tech grouped by category
- `projects` — your projects (title, description, tech, live/source URLs)
- `experience` — your roles/timeline

Replace the placeholders, then:

- Drop your résumé at `public/resume.pdf` (a placeholder is included).
- Add a profile photo and swap the placeholder block in `src/components/sections/about.tsx` for an `<Image>`.
- Add project thumbnails under `public/projects/` and set `image` on each project.

## Contact form

The form posts to `POST /api/contact`, which validates with zod and sends email via Resend.

1. Create a key at [resend.com/api-keys](https://resend.com/api-keys).
2. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL` (where messages go)
   - `CONTACT_FROM_EMAIL` (a verified-domain sender; the Resend sandbox `onboarding@resend.dev` works for testing)

Without a key, the form runs in **dev mode**: it validates and logs the submission to the server console and returns success (no email sent). A hidden honeypot field blocks basic spam bots.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new) (set the root to `portfolio_app`).
3. Add the environment variables above.
4. Deploy. (Optional: attach a custom domain and update `siteConfig.url`.)
