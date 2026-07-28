# Forgeone Marketing Website

Production-grade marketing site for **Forgeone**, an IT solutions company.

## Stack

- React (Vite)
- Tailwind CSS
- Framer Motion
- Swiper.js
- React Router
- Lucide React

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Structure

- `src/components` — UI, layout, home, and shared sections
- `src/pages` — route-level pages
- `src/data` — JSON content per page/section (edit copy here)
- `src/layouts` — persistent Layout shell (Navbar, Outlet, Footer, ScrollToTop)

## Content

All marketing copy lives in `src/data/*.json` and `src/data/services/*.json`. Components read from these files so content can be updated without changing UI code.
