# Rian Hussain — Portfolio

Personal portfolio and case-study site for **Rian Hussain** — AI/ML engineer and product builder working across computer vision, machine learning and product engineering.

**Live site:** https://rianportfolio.netlify.app

## What's inside

- **Three flagship builds, up front.** MarmaAI, Kisan360 and ErgoVigilance get large editorial showcases on the homepage, in that order. Everything else sits in "More experiments & builds" beneath them.
- **Nine-part case studies.** Every project opens a dialog built on the same structure: 01 Problem, 02 Approach, 03 My contribution, 04 System, 05 Engineering, 06 Product, 07 Challenges, 08 Current status, 09 Links. Deep-linkable, e.g. `/#work/marmaai`.
- **No card grid.** Flagship projects are full-width, alternating compositions: large display type, hairline rules, and a different visual per project (pipeline spine, service topology, real screenshots plus a recorded demo).
- **Print-grade palette.** Warm paper (`#F4F1EA`), ink (`#171714`), olive and terracotta accents, with a single dark contrast band for the contact section. Every text/background pair meets WCAG AA (4.5:1).
- **Real evidence.** Screenshots and the demo video are from the running systems. Every figure traces to a repository, a test suite or a published evaluation file — including the retracted MarmaAI accuracy figure and its corrected replacement.
- **Honest about what is missing.** MarmaAI's repository is private, so it shows "request a walkthrough" instead of a GitHub button that would 404.

## Tech

React 19 + Vite 6 + Tailwind v4 + TypeScript, type-checked with `tsc`. No animation library — the entrance animations are CSS keyframes, which keeps the bundle at ~94 kB gzipped. Fonts are Inter, Newsreader (display serif) and JetBrains Mono.

## Project layout

| Path | Purpose |
| --- | --- |
| [src/index.css](src/index.css) | Design tokens (`@theme`), fluid display type, entrance keyframes. |
| [src/data/site.ts](src/data/site.ts) | Name, role, status line, canonical URL, nav sections and outbound links. |
| [src/data/projects.ts](src/data/projects.ts) | All project content, grouped into `flagship` and `more`. |
| [src/components/](src/components) | One component per section, plus shared pieces (`SectionHeading`, `Screenshot`, `PipelineFlow`, `VideoCard`, `ProjectLinks`). |
| [scripts/generate-og-image.py](scripts/generate-og-image.py) | Renders the 1200×630 social preview card in the warm palette. |
| [public/projects/](public/projects) | Optimised WebP screenshots and the demo video poster. |
| [public/robots.txt](public/robots.txt), [public/sitemap.xml](public/sitemap.xml) | Crawler directives and the sitemap. |

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

## Social preview image

LinkedIn does not run JavaScript, so `og:image` points at a static file: [public/og-image.png](public/og-image.png). Regenerate it after changing the name, role or project list:

```bash
pip install pillow
python scripts/generate-og-image.py
```

The script downloads the Newsreader, Inter and JetBrains Mono variable fonts on first run and writes a 1200×630 card: name and role on the left, portrait top-right, the three flagship names in a banded row, and the discipline tagline along the bottom. `index.html` also carries absolute `og:*` / `twitter:*` tags and a `Person` JSON-LD block.

## Adding a project

Append an entry to the `projects` array in [src/data/projects.ts](src/data/projects.ts):

```ts
{
  slug: 'my-project',            // deep link: /#work/my-project
  title: 'My Project',
  subtitle: 'Programme or context',       // optional, shown under the title
  tagline: 'One line that sells it',
  description: 'What the thing actually is, in one or two sentences.',
  category: 'ai',                // ai | web | policy | data
  tier: 'flagship',             // 'flagship' = full editorial showcase, 'more' = experiments list
  year: '2026',
  role: 'Lead Developer & System Architect',
  period: '2026',
  status: 'Core demo path complete',      // optional
  accent: '#596b45',            // warm accent: olive, forest, graphite or clay
  stack: ['React', 'FastAPI'],
  specs: [{ label: 'Accepts', value: 'Value shown under the title' }],  // 3 read best
  problem: 'The problem that existed, and why it was worth solving.',
  idea: 'The approach, and why that approach.',            // optional
  contribution: 'What I personally designed or built.',    // optional
  collaborators: 'Who else was involved, stated plainly.', // optional
  built: ['Concrete thing built…', 'Another…'],            // optional
  how: [{ label: 'Capture', detail: 'How this stage works.' }],  // optional pipeline diagram
  engineering: ['Interesting implementation decision…'],    // optional
  metrics: { title: '…', note: '…', columns: ['A', 'B', 'C'], rows: [], footnotes: [] },  // optional
  product: 'What the product actually is, on screen.',     // optional
  screenshots: [{ src: '/projects/example.webp', alt: 'Descriptive alt text', caption: 'What this shows.' }],  // optional
  video: { url: 'https://…', title: '…', poster: '/projects/poster.webp', source: 'YouTube', caption: '…' },  // optional
  challenges: 'What was genuinely difficult.',             // optional
  learned: 'The hardest part and what it changed.',        // optional
  currentStatus: 'What works today, what is experimental.', // optional
  outcomes: ['Traceable highlight…'],
  note: 'Any limits or disclaimers worth stating.',        // optional
  links: [{ label: 'GitHub', url: 'https://…', kind: 'repo' }],
}
```

`kind` on a link drives its icon: `live`, `repo`, `demo`, `video`, `docs` or `contact`. Only add links that resolve — a private or missing repository must not render a button.

Screenshots live in `public/projects/`. Export them as WebP at 1400 px wide (~80 quality) and always write descriptive `alt` text.

**Accuracy rule:** only add figures that can be traced to a repository, a test run or a published evaluation, and state their limits next to them. The MarmaAI accuracy table (including the retracted 3.43 mm figure and its corrected 5.75 mm replacement) and the ErgoVigilance 87.6% figure are the reference examples.

**Wording rule:** MarmaAI is a project and product in development — never a company, and never a medical product. Affiliation sections state the role, what was personal work, and what was shared.
