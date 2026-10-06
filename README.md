# Rian Hussain — Portfolio

Personal portfolio and case-study site for **Rian Hussain** — AI/ML engineer and product builder working across computer vision, machine learning, full-stack engineering and applied AI systems.

**Live site:** https://rianportfolio.netlify.app

## What's inside

- **Selected work, up front.** Three flagship projects (ErgoVigilance, MarmaAI, TradeGuard AI) get a full write-up on the homepage; the rest sit in a filterable archive below.
- **Case studies.** Every project opens a dialog covering the problem, what was built, how it works, screenshots, highlights, tech stack and what was learned. Deep-linkable, e.g. `/#work/ergovigilance`.
- **Real screenshots.** ErgoVigilance screenshots are captured from the running application, not mockups. Each one links to its full-resolution file because dense dashboards are unreadable on a phone otherwise.
- **Honest numbers.** Every figure on the site traces back to a repository, a test suite or a published evaluation file. There are no self-assigned skill percentages or invented awards.
- **Stack.** React 19 + Vite 6 + Tailwind v4 + TypeScript, type-checked with `tsc`. No animation library — the handful of entrance animations are CSS keyframes, which keeps the JS bundle at ~86 kB gzipped.

## Project layout

| Path | Purpose |
| --- | --- |
| [src/data/site.ts](src/data/site.ts) | Name, role, canonical URL and every outbound link — edit links in one place. |
| [src/data/projects.ts](src/data/projects.ts) | All project content, grouped into `flagship` and `more`. |
| [src/components/](src/components) | One component per section, plus shared pieces (`SectionHeading`, `Screenshot`, `PipelineFlow`). |
| [scripts/generate-og-image.py](scripts/generate-og-image.py) | Renders the 1200×630 social preview card. |
| [public/projects/](public/projects) | Optimised WebP screenshots. |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # typecheck (tsc --noEmit)
npm run build      # production build → dist/
npm run preview    # serve the production build
```

## Deploy

**Netlify (primary):** the repo is connected to Netlify — every push to `main` builds and publishes automatically to https://rianportfolio.netlify.app.

**GitHub Pages (alternate):** [.github/workflows/deploy.yml](.github/workflows/deploy.yml) builds and publishes on every push to `main`. It needs a one-time setup in **Repo → Settings → Pages → Source: GitHub Actions**; until that is done the workflow fails at `actions/configure-pages`, because Pages can only be enabled by a user or an admin token.

The workflow sets `BASE_PATH=/Portfolio/` so assets resolve under the project URL. If the repo is renamed, moved to a user site, or served from a root-served host (Netlify, Vercel, custom domain), set it to `/` instead.

## Social preview image

LinkedIn does not run JavaScript, so `og:image` points at a static file: [public/og-image.png](public/og-image.png). Regenerate it after changing the name, role or headline:

```bash
pip install pillow
python scripts/generate-og-image.py
```

The script downloads the Outfit and Inter variable fonts on first run and writes a 1200×630 card. `index.html` also carries absolute `og:*` / `twitter:*` tags and a `Person` JSON-LD block.

## Adding a project

Append an entry to the `projects` array in [src/data/projects.ts](src/data/projects.ts):

```ts
{
  slug: 'my-project',            // deep link: /#work/my-project
  title: 'My Project',
  tagline: 'One line that sells it',
  description: 'What the thing actually is, in one or two sentences.',
  category: 'ai',                // ai | web | policy | data
  tier: 'flagship',              // 'flagship' = full homepage write-up, 'more' = archive grid
  year: '2026',
  role: 'Full-stack engineer (team project)',
  period: '2026 — Present',
  accent: '#00d9ff',             // card and case-study accent colour
  stack: ['React', 'FastAPI'],
  problem: 'The problem being solved, and why it was worth solving.',
  built: ['Concrete thing I built…', 'Another…'],
  how: [{ label: 'Capture', detail: 'How this stage works.' }],   // optional pipeline diagram
  showcase: 'What a visitor can actually open or see.',           // optional
  learned: 'The hardest part and what it changed.',               // optional
  outcomes: ['Traceable highlight…'],
  screenshots: [{ src: '/projects/example.webp', alt: 'Descriptive alt text', caption: 'What this shows.' }],  // optional
  note: 'Any limits or disclaimers worth stating.',               // optional
  links: [{ label: 'Live App', url: 'https://…', kind: 'live' }],
}
```

Screenshots live in `public/projects/`. Export them as WebP at 1400 px wide (~80 quality) and always write descriptive `alt` text. Without screenshots, cards render a generated monogram cover.

**Accuracy rule:** only add figures that can be traced to a repository, a test run or a published evaluation. Where a number has limits, state them next to it — the ErgoVigilance case study is the reference example.
