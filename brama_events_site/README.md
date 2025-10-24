# BRAMA Events — Static Site

A clean, mobile‑first one‑pager for an event rentals brand (arches, backdrops, florals).

## Quick start
1. Open `index.html` in your browser to preview.
2. Edit `products.json` to change catalog items (images, titles, prices).
3. Replace placeholder images in `assets/` with your photos (use the same filenames, or update paths in JSON/HTML).
4. Update contact details (email/phone) in `index.html` and the `mailto:` logic in `script.js` if needed.
5. Deploy to Netlify, Vercel, Cloudflare Pages, or any static host.

## Files
- `index.html` — markup + minimal critical CSS.
- `styles.css` — full styles.
- `script.js` — renders products and handles the quote form via `mailto:`.
- `products.json` — catalog data.
- `assets/` — images (replace with your own).

## Notes
- The quote form uses `mailto:` by default (no backend). If you want a real form, connect Formspree, Netlify Forms, Airtable, or a simple server endpoint and replace the submit handler in `script.js`.
- Structured data (JSON‑LD) for LocalBusiness is included for better SEO.
- Performance: images use `loading="lazy"`, critical CSS is inlined, and the rest is in `styles.css`.


## Form submissions
This template supports **Formspree** out of the box:
1. Create a form at https://formspree.io (get your `FORM_ID` like `abcdwxyz`).
2. Open `index.html` and replace `FORM_ID` in the form `action` URL.
3. That’s it — submissions will go to your email/inbox on Formspree.
4. If you don't set a FORM_ID, the form falls back to opening your email client via `mailto:`.

## Social
- Update the Instagram link in the footer (currently `https://instagram.com/brama.events`).
