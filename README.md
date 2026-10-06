# Rian Hussain — Portfolio

Personal portfolio and case-study site for **Rian Hussain** — AI/ML engineer and product builder working across computer vision, machine learning and product engineering.

**Live site:** https://rianportfolio.netlify.app

## What's inside

- **Three flagship builds, up front.** ErgoVigilance, MarmaAI and Kisan360 get large editorial showcases on the homepage, in that order (array order in `projects.ts` is the single source of truth for that sequence). Everything else sits in "More experiments & builds" beneath them.
- **Nine-part case studies.** Every project opens a dialog built on the same structure: 01 Problem, 02 Approach, 03 My contribution, 04 System, 05 Engineering, 06 Product, 07 Challenges, 08 Current status, 09 Links.
- **Real routes, not just hashes.** Every project is also a static page at `/work/<slug>/` with its own title, description, canonical URL, Open Graph tags, JSON-LD and share card, written at build time by [scripts/prerender-routes.ts](scripts/prerender-routes.ts). The legacy `#work/<slug>` links still work.
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
| [scripts/generate-og-image.py](scripts/generate-og-image.py) | Renders the site card and the per-project cards in `public/og/`. |
| [scripts/prerender-routes.ts](scripts/prerender-routes.ts) | Vite plugin: writes one HTML file per project route plus `sitemap.xml`. |
| [src/lib/seo.ts](src/lib/seo.ts) | Page titles, shared by the app and the prerender step. |
| [public/projects/](public/projects) | Optimised WebP screenshots and the demo video poster. |
| [public/og/](public/og) | 1200×630 share cards for the three flagships and the policy project. |
| [public/resume.pdf](public/resume.pdf), [public/404.html](public/404.html) | The resume served from the site itself, and the page Netlify returns for a missing URL. |
| [public/robots.txt](public/robots.txt) | Crawler directives. The sitemap is generated into `dist/` on every build. |
| [netlify.toml](netlify.toml) | Build settings, the `/work/:slug` → `/work/:slug/` redirect, and cache headers. |

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

## Real routes

The case studies are dialogs, so without help a link preview would only ever show the homepage card. The build therefore emits a real file per project:

| URL | Served from |
| --- | --- |
| `/` | `dist/index.html` (the app) |
| `/work/marmaai/` | `dist/work/marmaai/index.html` — same app, MarmaAI metadata |
| anything else | `dist/404.html` with a 404 status |

The plugin replaces the block in `index.html` between `<!-- route:meta:start` and `<!-- route:meta:end -->`. **Those markers are load-bearing:** the build fails if they are removed, so a page can never ship with the wrong `<head>`. Each route also carries a `<noscript>` summary of the case study, so a reader (or crawler) that runs no JavaScript still gets the text rather than an empty `#root`.

Adding a project needs no extra step — routes and the sitemap come from the `projects` array.

## Social preview images

LinkedIn does not run JavaScript, so `og:image` points at a static file. The site card is [public/og-image.png](public/og-image.png); the flagships and the policy project have their own in [public/og/](public/og), selected by the optional `shareImage` field on a project. A missing card falls back to the site card and warns during the build rather than shipping a broken preview. Regenerate them after changing the name, role, a title, a tagline or the specs:

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
  recognition: {                                            // optional — a verifiable external recognition only
    designation: 'Honorable Proposal',           // exactly as awarded, never "winner" or "first place"
    event: 'Awarding body and event name',
    category: 'Category or theme it was awarded under',
    dates: '21–22 July 2026',
    year: '2026',
    proposal: 'Title of the recognized proposal',
    detail: 'One factual line of context, including what the designation is not.',
    image: { src: '/projects/certificate.webp', alt: '…', caption: '…', width: 1400, height: 1002 },
  },
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

**Recognition rule:** a recognition is stored exactly as it was awarded — an `Honorable Proposal` stays an `Honorable Proposal` and is never upgraded to a win or a placement. It renders as one small badge on the project row, one numbered part inside the case study, and one line in the Journey list, so it never competes with the flagship builds. The certificate image is the proof; if there is no document, there is no block.
