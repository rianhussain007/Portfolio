export type CategoryId = 'ai' | 'web' | 'policy' | 'data' | 'goji';

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'repo' | 'demo';
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: CategoryId;
  year: string;
  role: string;
  period: string;
  stack: string[];
  overview: string[];
  outcomes: string[];
  note?: string;
  links: ProjectLink[];
  accent: string;
  image?: string;
}

export const categories: Record<CategoryId, { label: string; short: string }> = {
  ai: { label: 'AI / ML', short: 'AI/ML' },
  web: { label: 'Web & Product', short: 'Web' },
  policy: { label: 'Policy & Research', short: 'Policy' },
  data: { label: 'Data & Analytics', short: 'Data' },
  goji: { label: 'At Goji', short: 'Goji' },
};

const GH = 'https://github.com/rianhussain007';

export const projects: Project[] = [
  {
    slug: 'ergovigilance',
    title: 'ErgoVigilance',
    tagline: 'Real-time AI ergonomic risk screening for factory floors',
    category: 'ai',
    year: '2026',
    role: 'Sole engineer — vision pipeline, API, dashboard',
    period: '2026 — Present',
    accent: '#00d9ff',
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Recharts',
      'FastAPI',
      'Python 3.13',
      'MediaPipe',
      'YOLOv8',
      'ByteTrack',
      'scikit-learn',
      'PostgreSQL',
      'Docker Compose',
    ],
    overview: [
      'ErgoVigilance watches a worker through an ordinary webcam, detects body pose in real time with MediaPipe, converts the skeleton into biomechanical risk scores using the standard RULA/REBA methods, and turns them into plain-language guidance, alerts and audit-ready reports.',
      'It ships four role-based experiences on top of one pipeline: operators get live posture feedback and stretch reminders, supervisors get worker risk summaries and department heatmaps, safety managers get alert management and PDF audit reports, and admins get camera configuration and deployment health.',
      'The AI core runs in two modes — an on-premise path (MediaPipe 33 keypoints, YuNet face, SFace identity) and a cloud path (YOLOv8-pose + ByteTrack over RTSP streams) — behind a FastAPI service with 110+ endpoints and a React frontend spanning 40 routes.',
    ],
    outcomes: [
      '87.6% agreement with human assessors across 500 validated frames (LOW/MEDIUM classes)',
      '12 biomechanical features with temporal hysteresis so alerts never flicker',
      'Consent-first identity: face matching only after explicit, tenant-scoped consent records',
      'Four-service Docker Compose stack with fail-closed JWT auth (won\'t boot without a secret)',
    ],
    note: 'Screening aid, not a medical device. Thresholds are RULA/REBA-informed and heuristic — never clinically validated.',
    links: [{ label: 'GitHub', url: `${GH}/Ergovigilance-`, kind: 'repo' }],
  },
  {
    slug: 'tradeguard-ai',
    title: 'TradeGuard AI',
    tagline: 'Behavioral AI copilot that analyses the trader, not the market',
    category: 'ai',
    year: '2026',
    role: 'Full-stack + ML — model, RAG coach, product UI',
    period: '2026',
    accent: '#ddb7ff',
    stack: [
      'Next.js 15',
      'React',
      'TypeScript',
      'React Query',
      'WebSocket',
      'FastAPI',
      'SQLAlchemy',
      'PostgreSQL',
      'Random Forest',
      'FAISS',
      'Groq (Llama 3.3)',
      'Docker',
    ],
    overview: [
      'Trading platforms analyse markets; TradeGuard analyses the trader. A Random Forest profiler scores behavioural risk from 22 features — revenge trading, overtrading, size creep — and surfaces the patterns before they turn into financial mistakes.',
      'Explainability is a first-class surface: SHAP-style feature contributions render as waterfall charts, with a confidence engine and a risk reasoner that explains every score in plain language.',
      'An AI coach answers from eight curated behavioural-finance documents through a RAG pipeline (sentence-transformers + FAISS) on Groq with streaming, rate limits and fallbacks — and is explicitly forbidden from price predictions or buy/sell calls.',
    ],
    outcomes: [
      '22-feature ML behaviour profiler with real-time risk scoring and pattern detection',
      'RAG coach over 8 knowledge docs — streaming answers, refuses trade recommendations by design',
      'Real-time web layer: WebSocket event bus, 14 specialised hooks, 60+ React Query hooks',
      'One-command setup (`setup.sh`) and a 4-service Docker Compose demo with seeded data',
    ],
    links: [{ label: 'GitHub', url: `${GH}/tradeguardai`, kind: 'repo' }],
  },
  {
    slug: 'wattwise',
    title: 'WattWise',
    tagline: 'Green-AI analyzer that breaks a household power bill down appliance by appliance',
    category: 'ai',
    year: '2026',
    role: 'Capstone engineer — data, models, app',
    period: 'Feb 2026',
    accent: '#b9f600',
    stack: [
      'Python',
      'Streamlit',
      'scikit-learn',
      'K-Means',
      'Random Forest',
      'Isolation Forest',
      'pandas',
      'CodeCarbon',
    ],
    overview: [
      'WattWise takes a BESCOM electricity bill plus a short home profile and splits it into appliance-level usage (AC, geyser, washing machine, fridge, lighting, other), assigns the household to one of four Bangalore energy personas, and flags high-wastage homes with anomaly detection.',
      'The recommendations are concrete: specific actions with exact rupee savings per month, plus a target-bill mode that builds a personalised plan to hit a number the user chooses.',
      'Data grounds the models — 14 real Bangalore household surveys, 200 BEE-calibrated synthetic households, the BEE wattage database, KERC April-2025 tariffs and the CIA India emission factor for CO₂ estimates.',
    ],
    outcomes: [
      '3-model pipeline: K-Means personas → multi-output Random Forest → Isolation Forest anomaly detection',
      'Trained in ~60 seconds on CPU with <0.001 g CO₂ — a Green-AI design from the start',
      'Exact ₹/month savings per action with a target-bill action planner',
      'Built for the Edunet Foundation Skill4Future capstone, Green AI track (Feb 2026)',
    ],
    links: [
      {
        label: 'Live App',
        url: 'https://wattwiser-mwy6dxwdvtob3zebkpmmwu.streamlit.app/',
        kind: 'live',
      },
      { label: 'GitHub', url: `${GH}/wattwiser`, kind: 'repo' },
    ],
  },
  {
    slug: 'cultural-diversity-multiplier',
    title: 'Digital Cultural Equity Act',
    tagline: 'Interactive policy prototype for algorithmic language equity',
    category: 'policy',
    year: '2026',
    role: 'Co-author + prototype engineer',
    period: '2026',
    accent: '#ddb7ff',
    stack: ['HTML', 'JavaScript', 'Interactive Dashboard', 'Data Visualization', 'Policy Research'],
    overview: [
      'Recommendation systems — YouTube Up Next, Instagram Explore, TikTok For You — are trained mostly on English data, so content in minority languages is systematically underranked. A Bhojpuri creator earns ₹15–50 CPM where an identical English creator earns ₹80–250.',
      'The Cultural Diversity Multiplier is the corrective mechanism proposed under the Digital Cultural Equity Act: a tiered boost applied to a video\'s internal score before ranking, sized to remove the training-data penalty and designed to shrink to zero as platform language AI improves.',
      'This interactive prototype validates that mechanism — sliders adjust the Tier 2 and Tier 3 multipliers and the dashboard recomputes recommendation scores, reach comparisons and the earnings gap live in the browser.',
    ],
    outcomes: [
      'Submitted to the SDGs Youth Public Policy Innovation Challenge 2026',
      'Interactive model of 3-tier language weighting with live score recomputation',
      'Grounded in Kirdemir et al. (2021), an audit of 256,725 YouTube videos, and Lasser & Poechhacker (2025)',
      'Deployed on GitHub Pages as demo evidence for the proposal',
    ],
    links: [
      { label: 'Live Demo', url: `${GH}/cdm-prototype/`, kind: 'live' },
      { label: 'GitHub', url: `${GH}/cdm-prototype`, kind: 'repo' },
    ],
  },
  {
    slug: 'kisan360',
    title: 'Kisan360',
    tagline: 'AI smart-farming assistant for smallholder farmers in India',
    category: 'web',
    year: '2025',
    role: 'Full-stack engineer (team project)',
    period: 'Oct 2025',
    accent: '#b9f600',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Gemini AI',
      'TensorFlow.js',
      'PlantNet',
      'OpenWeatherMap',
      'Google Maps',
      'Agmarknet',
    ],
    overview: [
      'Kisan360 is a mobile-first web app that puts hyper-local farming advice on a smartphone: crop and season onboarding, a 7-day forecast wired into a daily task checklist, live commodity prices with charts, and GPS-based farm mapping.',
      'The crop disease scanner runs TensorFlow.js in the browser and confirms species through the PlantNet API, so a farmer can photograph a leaf and get an answer without a specialist visit.',
      'Gemini powers personalised tips across six live data integrations, and the whole experience is designed for low-bandwidth, local-language field conditions.',
    ],
    outcomes: [
      'VYUHATECH 2.0 national-level hackathon submission',
      'On-device disease detection (TensorFlow.js) with PlantNet API confirmation',
      'Six live integrations: weather, market prices, maps, plant ID, soil/season logic, Gemini',
      'Mobile-first UX with persistent checklists built for field connectivity',
    ],
    links: [{ label: 'GitHub', url: `${GH}/Kisan360`, kind: 'repo' }],
  },
  {
    slug: 'group-website',
    title: 'Group Storefront',
    tagline: 'Full e-commerce storefront — catalogue, cart and checkout flow',
    category: 'web',
    year: '2025',
    role: 'Frontend engineer (group project)',
    period: 'Apr 2025',
    accent: '#ff9e6c',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'REST API'],
    overview: [
      'A complete storefront build: product catalogue with search and filtering, product detail pages, a cart with persistent state, and a checkout flow — the whole shopping path in a React + TypeScript codebase.',
      'The project was built collaboratively as a group deliverable, with componentised UI, typed API contracts and a responsive layout that holds up from phone to desktop.',
    ],
    outcomes: [
      'End-to-end shopping flow: browse → detail → cart → checkout',
      'Typed React + TypeScript codebase with reusable component library',
      'Responsive across mobile and desktop breakpoints',
    ],
    links: [{ label: 'GitHub', url: `${GH}/group_website`, kind: 'repo' }],
  },
  {
    slug: 'interniq',
    title: 'InternIQ',
    tagline: 'Internship discovery platform with an automated scraper',
    category: 'web',
    year: '2025',
    role: 'Full-stack engineer',
    period: 'Aug 2025',
    accent: '#00d9ff',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'FastAPI',
      'BeautifulSoup',
      'Vercel',
      'Render',
    ],
    overview: [
      'InternIQ helps students find and track internships: a Python scraper collects fresh postings, a FastAPI backend serves them, and a React frontend makes them searchable by title, location and domain.',
      'Scraping can be triggered on demand from the UI — one click, toast notifications while it runs, fresh data when it finishes — so the board is never stale.',
      'The stack is deployed the way a real product would be: frontend on Vercel, backend on Render with CORS scoped to the frontend origin.',
    ],
    outcomes: [
      'Automated BeautifulSoup scraper with one-click manual refresh',
      'FastAPI + SQLite API with search, filters and typed responses',
      'Split deployment: Vercel (frontend) + Render (backend), CORS-scoped',
      'Responsive React/TypeScript UI with async toast feedback',
    ],
    links: [{ label: 'GitHub', url: `${GH}/interniq-dashboard_react`, kind: 'repo' }],
  },
  {
    slug: 'velora',
    title: 'Velora',
    tagline: 'Full-stack task tracker with AI-assisted workflows, live in production',
    category: 'web',
    year: '2025',
    role: 'Builder — full stack',
    period: 'May 2025',
    accent: '#ff9e6c',
    stack: ['React', 'TypeScript', 'Vite', 'Gemini API', 'Render'],
    overview: [
      'Velora is a task tracker built as a full-stack web experience with Google\'s Gemini API in the loop, wrapped in an auth-gated login flow rather than a bare open page.',
      'It went from AI Studio prototype to a deployed production URL on Render — real hosting, real routing, real session handling.',
    ],
    outcomes: [
      'Deployed to production on Render behind a login flow',
      'Gemini API integrated into the task workflow',
      'Shipped from prototype to live URL end-to-end',
    ],
    links: [
      { label: 'Live App', url: 'https://velora-0n1o.onrender.com/login', kind: 'live' },
      { label: 'GitHub', url: `${GH}/Velora`, kind: 'repo' },
    ],
  },
  {
    slug: 'medimind',
    title: 'MediMind',
    tagline: 'AI-assisted diagnostics companion, delivered as a mobile app',
    category: 'ai',
    year: '2025',
    role: 'Builder — Android app',
    period: 'Mar 2025',
    accent: '#00d9ff',
    stack: ['Android', 'Java', 'Gradle', 'AI-assisted workflows', 'Emulator deployment'],
    overview: [
      'MediMind is an Android application built with a Gradle/Java toolchain and shipped as an installable APK, demoable directly in the browser through an Appetize emulator session.',
      'It explores how an AI-assisted diagnostics workflow can sit on a phone in a clinical setting — fast to open, structured to guide, and available offline where connectivity is not.',
    ],
    outcomes: [
      'Native Android build (Java + Gradle), installable as an APK',
      'Live in-browser demo via Appetize emulator — no install needed to review it',
      'Structured, guided workflow designed for clinical settings',
    ],
    links: [
      { label: 'Live Demo', url: 'https://appetize.io/app/b_arcto3zj4vfpqq4j3qvmnnevqm', kind: 'demo' },
      { label: 'GitHub', url: `${GH}/MediMind`, kind: 'repo' },
    ],
  },
  {
    slug: 'bluestock-mf-capstone',
    title: 'Bluestock MF Capstone',
    tagline: 'Mutual-fund screening pipeline with reproducible reports',
    category: 'data',
    year: '2026',
    role: 'Data engineer — pipeline and analysis',
    period: 'Jun 2026',
    accent: '#b9f600',
    stack: ['Python', 'pandas', 'Jupyter', 'Data Pipeline', 'Reporting'],
    overview: [
      'A capstone analysis of mutual-fund data: raw datasets are ingested into a versioned `data/raw` layer, processed by a Python script pipeline, and rendered into shareable reports.',
      'The repo is deliberately reproducible — pinned requirements, scripted steps and generated reports instead of one-off notebooks, so the analysis can be re-run and audited.',
    ],
    outcomes: [
      'End-to-end pipeline: raw data → scripted transforms → generated reports',
      'Reproducible environment via pinned `requirements.txt`',
      'Report artefacts committed alongside the code for review',
    ],
    links: [{ label: 'GitHub', url: `${GH}/bluestock-mf-capstone`, kind: 'repo' }],
  },
];
