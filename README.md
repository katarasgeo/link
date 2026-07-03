# Biokarpet Candia — Website

Marketing site for **Biokarpet Candia Αιγίου** (rugs, mattresses, beds, sofas,
PVC flooring, curtains & blinds), built with Next.js App Router, TypeScript,
and Tailwind CSS v4.

## Stack

- Next.js 16 (App Router, Server Components, static generation)
- TypeScript
- Tailwind CSS v4 (`@theme` design tokens in `src/app/globals.css`)
- Framer Motion (scroll reveals) + GSAP/ScrollTrigger (hero parallax)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

- `src/app` — routes (`/`, `/about`, `/products`, `/products/[slug]`,
  `/projects`, `/contact`), plus `sitemap.ts` / `robots.ts`.
- `src/components/ui` — design-system primitives (`Button`, `Media`,
  `Reveal`, `SectionHeading`, `PageHero`, `Faq`, `ProductCard`).
- `src/components/sections` — homepage sections (`Hero`, `CategoryGrid`,
  `WhyUs`, `Editorial`, `Testimonials`, `CtaBanner`, ...).
- `src/components/layout` — `Navbar`, `Footer`.
- `src/lib/site-config.ts` — single source of truth for business info
  (name, address, phone, socials, hours, nav, categories).
- `src/lib/categories-data.ts` — copy for each product category page.

## Photography

There is no real product/lifestyle photography yet. Every image slot uses
the `<Media>` placeholder component (warm gradient + corner marks + label)
so the layout, spacing, and rhythm are final — swap in real photography by
passing `src`/`alt` to `<Media>` (or replacing it with `next/image`) once
photos are available. The one real photo in the project is the founder
portrait at `public/images/owner-portrait.png` (used on `/about`) — it's a
placeholder/stock portrait carried over from the previous site and should
be replaced with an actual photo of George Kataras.

## Content status

Business info (address, phone numbers, hours, socials) in
`src/lib/site-config.ts` is carried over from the previous one-page site
and should be double-checked. Story/timeline copy on `/about` and product
FAQ/spec copy per category are first drafts — written to match the brand
voice but not verified against real store policies (warranties, delivery
times, etc.) and should be reviewed by the business owner before publishing.

## Contact form

`/contact` has no backend yet. Submitting the form opens a pre-filled
WhatsApp message (via `wa.me`) to the store's WhatsApp number, with a
`mailto:` link as a fallback — both work without any server infrastructure.
