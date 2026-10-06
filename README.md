# Rian Hussain — Portfolio

Personal portfolio and case-study site for **Rian Hussain** — AI/ML engineer building production ML systems, full-stack products and applied policy research.

**Live site:** https://rianportfolio.netlify.app

## What's inside

- **Project case studies** — every card opens a full case study (overview, role, timeline, highlights, tech stack, live/repo links). All content lives in one data file: [src/data/projects.ts](src/data/projects.ts).
- **Category filters** — All / AI & ML / Web & Product / Policy & Research / Data & Analytics (tabs appear automatically for categories that have projects).
- **Shareable deep links** — every case study has a URL, e.g. `/#work/ergovigilance`.
- **Production build** — React 19 + Vite + Tailwind v4 + motion, type-checked with `tsc`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # typecheck
npm run build      # production build → dist/
```

## Deploy

**Netlify (primary):** the repo is connected to Netlify — every push to `main` builds and publishes automatically to https://rianportfolio.netlify.app.

**GitHub Pages (alternate):** [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and publishes on every push to `main`.

One-time setup: **Repo → Settings → Pages → Source: GitHub Actions**.

The workflow sets `BASE_PATH=/Portfolio/` so assets resolve under the project URL. If the repo is renamed, moved to a user site, or served from a root-served host (Netlify, Vercel, custom domain), set it to `/` instead.

## Adding a project

Append an entry to the `projects` array in `src/data/projects.ts`:

```ts
{
  slug: 'my-project',           // deep link: /#work/my-project
  title: 'My Project',
  tagline: 'One line that sells it',
  category: 'ai',               // ai | web | policy | data | goji
  year: '2026',
  role: 'Sole engineer',
  period: '2026 — Present',
  accent: '#00d9ff',            // card + case-study accent colour
  stack: ['React', 'FastAPI'],
  overview: ['Paragraph 1…', 'Paragraph 2…'],
  outcomes: ['Metric-backed highlight…'],
  links: [{ label: 'Live App', url: 'https://…', kind: 'live' }],
}
```

Screenshots are optional — drop a file in `public/` and set `image: '/my-screenshot.png'`; without one, the card renders a generated monogram cover.
