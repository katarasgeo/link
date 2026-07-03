# Biokarpet Candia Αιγίου — Link in Bio

A single premium, self-contained link-in-bio page for George Kataras /
Βιοκαρπέτ Candia Αιγίου. No build step, no dependencies — just
`index.html` and `profile.jpg`.

## Preview locally

Open `index.html` directly in a browser, or serve it:

```bash
npx serve .
```

## What's here

- **`index.html`** — the entire page: markup, styles, and a small amount
  of vanilla JS (placeholder-link toast, iOS double-tap-zoom guard,
  mobile viewport-height fix). Fonts (EB Garamond + Inter, both with
  Greek glyph support) load from Google Fonts; everything else is
  self-contained, including the backdrop (CSS gradients + an inline SVG
  grain texture — no hotlinked stock photography).
- **`profile.jpg`** — the owner portrait shown in the avatar.

## Content notes

- Phone (`6944 282924`) and WhatsApp number were corrected from the
  previous version of this page, which had a typo'd extra digit in the
  `tel:` link (`69442829224`) — the WhatsApp link's number was already
  correct, confirming the right number.
- The four bottom link buttons (Website, Κατάλογος, Έργα, Κριτικές) are
  still placeholders (`href="#"`, shows a toast on click) pending real
  destination URLs.
- Hours, address, and social links are carried over as-is from the
  original page.

## Deploying

Any static host works — Netlify, Vercel, GitHub Pages, or just upload
the two files. No build command needed.
