# ARUNA — Property & Stays

**A custom, responsive one-page property management website.** Built with **HTML + CSS + vanilla JavaScript**, without React, Tailwind, Bootstrap, jQuery, build tools, or a database.

This is an original demonstration website inspired by the *information architecture and conversion flow* of https://eliteoperates.com/. Its brand identity, writing, visual hierarchy and layout are deliberately independent. **ARUNA is a working placeholder identity — not an assertion that an actual company or property portfolio exists.**

## Quick start

1. Extract the ZIP.
2. Open `property/index.html` in a modern browser. For development, VS Code + Live Server is recommended.
3. For a local web server (optional):

   ```bash
   cd property
   python -m http.server 8000
   ```

   Visit `http://localhost:8000`.

There is **no `npm install`, build, or deploy compilation step**.

## Structure

```text
property/
├── index.html                  Page, content, semantic sections, metadata
├── assets/
│   ├── css/style.css            Tokens, layouts, components, motion, responsive rules
│   ├── js/main.js               Menu, filtering, tabs, dialogs, validation, inquiry
│   └── images/
│       ├── favicon.svg          Editable placeholder symbol
│       └── villa-*.svg          Local image fallbacks when offline
├── docs/
│   └── ANALISIS-DAN-WORKFLOW.md  Reference audit, page plan and launch SOP
└── README.md
```

## What works

- Cinematic hero, smooth section links, scroll progress and sticky navigation
- Mobile menu with escape handling and managed focus
- Section reveal animations with reduced-motion support
- Filterable property showcase (Canggu / Uluwatu / Umalas)
- Accessible native property and package detail dialogs
- Property-owner / seller step switcher with arrow-key navigation
- FAQ using native `<details>`
- Contact form with required-field validation and WhatsApp message composition
- Responsive layouts, semantic headings, meta tags and local vector fallbacks

## Edit before going live

**Identity and copy** — Edit brand text in `index.html`, `<title>`, description, footer and logo text. Replace the sample property concepts with real, verified properties, or remove the showcase if your business doesn't list properties.

**WhatsApp** — Open `assets/js/main.js`, near the top:

```js
const SITE_CONFIG = Object.freeze({
  brandName: 'ARUNA — Property & Stays',
  contactEmail: 'hello@yourbrand.com',
  whatsappNumber: '',
});
```

Set `whatsappNumber` using an international country code and *digits only*, e.g. `6281234567890` (illustrative number **not** for use). If left empty, the form opens WhatsApp's general message composer and the visitor must choose a recipient. No backend is used; this form does **not** store inquiries or send messages automatically.

**Email** — Change `contactEmail` above to your real address. The contact email link is updated dynamically. In production you may also wish to update the static HTML email for non-JavaScript visitors.

**Properties** — Update the three `.property-card` entries in `index.html` and their content in `PROPERTY_DATA` in `assets/js/main.js`. The `data-property` ID connects each card with its modal. The sample descriptions and bedroom counts are fictional concept examples, not real property data.

**Services / packages** — Edit the package cards in HTML and feature details in `PACKAGE_DATA` in JS. Fees aren't shown intentionally; don't publish invented pricing or performance metrics.

**Photography** — Current photos load from `images.unsplash.com`. The bundled SVGs are **illustrated fallbacks**, not photographs. For a production launch, replace all stock photos with licensed property photography saved under `assets/images/` for speed, ownership clarity, and reliable availability. Remove `data-fallback` or point it to a suitable local image. Web fonts currently load via Google Fonts; browser fallback fonts are included in CSS.

**Brand system** — Tweak palette, typography, spacing and containers at the top of `assets/css/style.css` via `:root`. The primary header/hero, section backgrounds, card spacing and buttons use those variables.

## Deployment

Static hosting only is required: **Netlify, Cloudflare Pages, GitHub Pages, Vercel static hosting, or ordinary shared hosting.** Upload the entire `property` folder while keeping relative paths. Your site's public root should contain `index.html` and `assets/`.

Before publishing, check the detailed [launch checklist](docs/ANALISIS-DAN-WORKFLOW.md). At minimum, provide a real company identity, contact destination, legally usable photographs, accurate listing data, real business and legal information, and a privacy notice appropriate to your deployment and data processing.

## Tested

Automated browser interaction checks were performed at desktop 1440 px, tablet 768 px and mobile 390 px using a locally inlined testing copy (browser network access was restricted). Tests covered basic JS errors, horizontal overflow, mobile navigation, property filters, dialogs, owner/seller switch and form validation. Online image delivery and external WhatsApp navigation still require testing in your connected browser/environment before production.
