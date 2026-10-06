export type CategoryId = 'ai' | 'web' | 'policy' | 'data';

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'repo' | 'demo';
}

/** A real screenshot captured from the running product. */
export interface ProjectShot {
  src: string;
  alt: string;
  caption: string;
}

/** One step in a pipeline, rendered as a connected flow diagram. */
export interface PipelineStep {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One-line positioning used on cards. */
  tagline: string;
  /** Slightly longer description of what the thing is. */
  description: string;
  category: CategoryId;
  /**
   * `flagship` projects get the full write-up on the homepage.
   * `more` projects stay in the archive grid.
   */
  tier: 'flagship' | 'more';
  year: string;
  role: string;
  period: string;
  status?: string;
  stack: string[];
  /** The problem being solved — feeds the case study's "The problem" section. */
  problem?: string;
  /** What was actually built. */
  built?: string[];
  /** How it works, step by step. Also rendered as a flow diagram. */
  how?: PipelineStep[];
  /** What a visitor can actually see or open. */
  showcase?: string;
  /** The hardest part and what it taught. */
  learned?: string;
  /** Highlights — every line must be traceable to the repo. */
  outcomes: string[];
  screenshots?: ProjectShot[];
  note?: string;
  links: ProjectLink[];
  accent: string;
}

export const categories: Record<CategoryId, { label: string; short: string }> = {
  ai: { label: 'AI / ML', short: 'AI/ML' },
  web: { label: 'Web & Product', short: 'Web' },
  policy: { label: 'Policy & Research', short: 'Policy' },
  data: { label: 'Data & Analytics', short: 'Data' },
};

const GH = 'https://github.com/rianhussain007';

export const projects: Project[] = [
  {
    slug: 'ergovigilance',
    title: 'ErgoVigilance',
    tagline: 'Real-time computer-vision ergonomic risk screening for factory floors',
    description:
      'AI-powered workplace ergonomics platform using computer vision to identify posture risk and turn live camera data into actionable ergonomic insights.',
    category: 'ai',
    tier: 'flagship',
    year: '2026',
    role: 'Lead builder — computer vision pipeline, backend API and dashboard (team project)',
    period: '2026 — Present',
    status: 'TRL-6, closed',
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
      'YuNet / SFace',
      'HistGradientBoosting',
      'SQLite / PostgreSQL',
      'Ollama',
      'Docker Compose',
    ],
    problem:
      'Ergonomic risk is normally assessed by hand: someone watches a workstation, scores it once, and moves on. That is slow, inconsistent between assessors, and blind to how posture changes across a shift. The question behind ErgoVigilance was whether one ordinary webcam could produce continuous, explainable posture risk that a supervisor can act on — without shipping worker video to a third party.',
    built: [
      'Real-time pose pipeline — MediaPipe Pose (33 keypoints) over a USB webcam, plus a cloud path using YOLOv8-pose (17 COCO keypoints) and ByteTrack worker tracking over RTSP CCTV.',
      'Risk engine — 12 biomechanical features across neck, trunk, shoulders, knees, wrists and stance, scored against RULA/REBA-informed thresholds, with temporal hysteresis so alert levels do not flicker frame to frame.',
      'Four role-based experiences in one React app: operators get live feedback and stretch reminders, supervisors get worker risk summaries and department heatmaps, safety managers get alert management and PDF audit reports, admins get camera configuration and deployment health.',
      'Session history and replay — recorded sessions replay with the skeleton overlay, frame-by-frame video review with temporal smoothing and keypoint interpolation.',
      'FastAPI backend with 110+ endpoints, badge/QR and consent-gated face identity, an alert lifecycle with audit trail, and Playwright-rendered PDF safety reports.',
      'Local AI layer — an Ollama integration turns raw risk scores into plain-language explanations without calling an external API.',
      'Operational work — four-service Docker Compose stack, fail-closed JWT auth, health and readiness probes, retention policy, AES-256 encrypted backups, CSP headers and non-root containers.',
    ],
    how: [
      {
        label: 'Capture',
        detail: 'USB webcam or FFmpeg-ingested RTSP CCTV stream, with a setup wizard for framing and lighting.',
      },
      {
        label: 'Pose estimation',
        detail: 'MediaPipe Pose (33 keypoints) on-premise, or YOLOv8-pose (17 COCO keypoints) with ByteTrack in the cloud core.',
      },
      {
        label: 'Biomechanical features',
        detail: 'Joint angles and alignment across neck, trunk, shoulders, knees, wrists and stance.',
      },
      {
        label: 'Risk scoring',
        detail: 'RULA/REBA-informed thresholds with dwell-based hysteresis so risk levels stay stable.',
      },
      {
        label: 'Task + risk classification',
        detail: 'HistGradientBoosting classifiers label the activity and calibrate the risk band.',
      },
      {
        label: 'Actionable surface',
        detail: 'Live operator feedback, supervisor heatmaps, alert lifecycle, PDF reports and session replay.',
      },
    ],
    showcase:
      'The dashboard, validation, model-comparison and cloud-camera screens are screenshots captured from the running application — not mockups. The repository carries the full backend, cloud core, frontend, test suites and architecture docs.',
    learned:
      'The model turned out to be the easy half. What took the longest was making the output trustworthy: every score has to trace back to a measured joint angle and a documented threshold, and the product has to state plainly what it does not claim. My first headline accuracy number was circular — computed against auto-generated labels. Retiring it, labelling 500 frames by hand and publishing the honest 87.6% with its limits changed how I build: measurement and stated limits are product features, not fine print.',
    outcomes: [
      '87.6% agreement with human assessors across 500 hand-labelled frames — LOW/MEDIUM risk classes only',
      '765 automated tests across frontend, backend and cloud core (106 + 478 + 181)',
      '40 frontend routes and 110+ backend endpoints running on one pipeline',
      'Dual-core design: an on-premise MediaPipe path for privacy, a cloud YOLOv8 path with no on-site hardware',
      'Consent-first identity — face matching only after an explicit, tenant-scoped consent record',
      'Fail-closed JWT auth: the stack refuses to boot without a secret',
    ],
    screenshots: [
      {
        src: '/projects/ergovigilance-dashboard.webp',
        alt: 'ErgoVigilance supervisor dashboard showing live posture risk level, active alerts and team status',
        caption: 'Live dashboard — current risk level, active alerts and team status from a running session.',
      },
      {
        src: '/projects/ergovigilance-validation.webp',
        alt: 'ErgoVigilance validation page reporting ground-truth evaluation against 500 labelled frames',
        caption: 'Validation page — the 87.6% figure with its methodology and limits stated on the page itself.',
      },
      {
        src: '/projects/ergovigilance-model-dashboard.webp',
        alt: 'ErgoVigilance model dashboard comparing YOLO and MediaPipe pose output with model versioning controls',
        caption: 'Model dashboard — YOLO vs MediaPipe comparison with model versioning and export.',
      },
      {
        src: '/projects/ergovigilance-cloud-cameras.webp',
        alt: 'ErgoVigilance cloud camera management screen listing configured RTSP endpoints and their health',
        caption: 'Cloud cameras — RTSP endpoint management, including honest empty states.',
      },
    ],
    note: 'A screening aid, not a medical device. Thresholds are RULA/REBA-informed and heuristic, never clinically validated, and only the LOW/MEDIUM risk classes have been measured against human labels.',
    links: [{ label: 'GitHub', url: `${GH}/Ergovigilance-`, kind: 'repo' }],
  },
  {
    slug: 'marmaai',
    title: 'MarmaAI',
    tagline: 'AI-Guided Self-Acupressure — Research & Product Development',
    description:
      'A guided interaction system exploring camera-based hand-point localization, personalized guidance, and verification of user interaction.',
    category: 'ai',
    tier: 'flagship',
    year: '2025 — Present',
    role: 'Research and product development — interaction design, vision pipeline, verification',
    period: '2025 — Present',
    status: 'In development',
    accent: '#ddb7ff',
    stack: [
      'Python',
      'Computer vision',
      'Hand landmark detection',
      'Camera calibration',
      'Personalized mapping',
      'Interaction verification (ATEV)',
      'Session analytics',
    ],
    problem:
      'Acupressure guidance normally comes from a practitioner who knows where each point sits on a specific body. Doing it alone means guessing: you cannot see your own back, you are unsure whether your hand is in the right place, and you have no way of knowing whether you held it correctly. MarmaAI explores whether a camera can close that loop — locate the hand, map the point to this person rather than a generic diagram, guide the interaction, then verify that it actually happened.',
    built: [
      'A guided session flow that takes a user from camera setup through to a completed, verified interaction.',
      'Camera-based hand landmark detection, so the system works without markers, wearables or a second device.',
      'Personalized point localization — mapping anatomical reference points onto the individual rather than a fixed chart.',
      'Step-by-step guided interaction with live positioning feedback while the user moves.',
      'ATEV interaction verification — checking that the intended point was actually engaged instead of trusting that the instruction was followed.',
      'Session feedback that reports what was completed, so a session ends with a result rather than a guess.',
      'Ongoing development: a pressure-sensing glove as a research direction for measuring applied pressure directly.',
    ],
    how: [
      { label: 'Camera', detail: 'Live capture with framing and lighting checks before a session begins.' },
      { label: 'Hand landmark detection', detail: 'Locates the user\u2019s hand in frame — no markers, no wearables.' },
      { label: 'Personalized point localization', detail: 'Maps reference points onto the individual\u2019s body instead of a fixed diagram.' },
      { label: 'Guided interaction', detail: 'Step-by-step positioning guidance with live feedback as the user moves.' },
      { label: 'ATEV verification', detail: 'Confirms the interaction actually engaged the intended point.' },
      { label: 'Session feedback', detail: 'Summarizes the session so progress is visible rather than assumed.' },
    ],
    showcase:
      'MarmaAI is in active development, so the work is presented as an architecture and a staged build rather than a public demo. The planned pressure-sensing glove is an experimental direction for direct pressure measurement, not a shipped feature.',
    learned:
      'Verification is the genuinely hard part. Drawing a target on screen is easy; proving the person actually pressed the right place is not. Splitting the system into detection, localization, guidance and verification made each stage testable on its own — and made the limits of camera-only verification obvious, which is exactly why a pressure sensor is part of the research direction rather than a nice-to-have.',
    outcomes: [
      'Interaction pipeline defined end to end: detection → localization → guidance → verification → feedback',
      'Designed around a camera alone — no markers or wearables required for the core loop',
      'Personalization treated as a first-class stage rather than a fixed anatomical chart',
      'Verification built in from the start, so guidance quality is measurable',
    ],
    note: 'MarmaAI is a project and product in development — not a registered company, and not a medical product. It makes no diagnostic or treatment claims. The pressure-sensing glove is experimental work in progress.',
    links: [],
  },
  {
    slug: 'tradeguard-ai',
    title: 'TradeGuard AI',
    tagline: 'Behavioral AI copilot that analyses the trader, not the market',
    description:
      'A behavioural-risk platform that profiles how a trader behaves, explains every score in plain language, and coaches through a retrieval-augmented assistant.',
    category: 'ai',
    tier: 'flagship',
    year: '2026',
    role: 'Full-stack and ML — model, explainability layer, RAG coach, product UI',
    period: '2026',
    accent: '#b9f600',
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
      'sentence-transformers',
      'FAISS',
      'Groq (Llama 3.3 70B)',
      'Docker Compose',
    ],
    problem:
      'Most trading tools analyse the market. The mistakes that actually cost traders money are behavioural — revenge trading after a loss, sizing up while winning, overtrading a bad day. Those patterns are invisible in a price chart and invisible to the trader while they are in them. TradeGuard asks whether a model can score the behaviour itself, explain the score in terms a person will accept, and coach without ever telling anyone what to buy.',
    built: [
      'A Random Forest profiler scoring behavioural risk from 22 features — loss-chasing, size creep, overtrading, session drift and related patterns.',
      'An explainability layer that renders SHAP-style feature contributions as waterfall charts, so each score shows which behaviours drove it.',
      'A grounded AI coach built on retrieval-augmented generation: sentence-transformers embeddings over eight curated behavioural-finance documents, retrieved through FAISS and answered by Llama 3.3 70B on Groq with streaming, rate limits and fallbacks.',
      'A guard-railed assistant — the prompt and retrieval design refuse price predictions and buy/sell calls rather than hoping the model declines.',
      'A real-time web layer: a WebSocket event bus, 14 specialised hooks and 60+ React Query hooks keeping the UI consistent with live scoring.',
      'One-command setup and a four-service Docker Compose demo with seeded data, so the whole system is reviewable without an account.',
    ],
    how: [
      { label: 'Trade events', detail: 'Positions, fills and session timing ingested into a normalised event store.' },
      { label: 'Feature extraction', detail: '22 behavioural features derived per session — timing, sizing, sequence and loss response.' },
      { label: 'Risk profiling', detail: 'Random Forest scores behavioural risk and detects recurring patterns.' },
      { label: 'Explainability', detail: 'SHAP-style contributions rendered as waterfall charts with a confidence estimate.' },
      { label: 'Retrieval', detail: 'sentence-transformers embeddings over 8 curated documents searched through FAISS.' },
      { label: 'Coaching', detail: 'Llama 3.3 70B on Groq streams an answer that is grounded in retrieved text — and refuses trade calls.' },
    ],
    showcase:
      'The repository contains the full Next.js application, the FastAPI service, the ML pipeline and a seeded four-service Docker Compose demo, so the profiling and coaching flows can be run locally end to end.',
    learned:
      'Explainability stopped being a reporting feature and became the product. A risk score nobody trusts changes no behaviour, so the waterfall breakdown and the plain-language reasoning became the core surface rather than an afterthought. The second lesson was about restraint: the useful version of an AI coach for traders is one that explicitly refuses to predict prices, which meant designing the guard rails into retrieval and prompting instead of trusting them to the model.',
    outcomes: [
      '22-feature behavioural-risk profiler with real-time scoring and pattern detection',
      'Retrieval-augmented coach over 8 knowledge documents — streaming answers that refuse trade recommendations by design',
      'Explainability as a first-class UI surface, not a buried report',
      'WebSocket event bus with 14 specialised hooks and 60+ React Query hooks',
      'One-command setup plus a seeded 4-service Docker Compose demo',
    ],
    links: [{ label: 'GitHub', url: `${GH}/tradeguardai`, kind: 'repo' }],
  },
  {
    slug: 'wattwise',
    title: 'WattWise',
    tagline: 'Green-AI analyzer that breaks a household power bill down appliance by appliance',
    description:
      'A bill analyzer that decomposes household electricity use into appliance-level estimates, assigns an energy persona and plans concrete savings actions.',
    category: 'ai',
    tier: 'more',
    year: '2026',
    role: 'Capstone engineer — data, models, app',
    period: 'Feb 2026',
    accent: '#b9f600',
    stack: ['Python', 'Streamlit', 'scikit-learn', 'K-Means', 'Random Forest', 'Isolation Forest', 'pandas', 'CodeCarbon'],
    problem:
      'A household electricity bill arrives as one number, which is useless for deciding what to change. WattWise asked whether a bill plus a short home profile is enough to say where the units actually go, and which single change saves the most money.',
    built: [
      'A third-model pipeline: K-Means personas, a multi-output Random Forest for appliance-level usage, and an Isolation Forest to flag high-wastage homes.',
      'Concrete recommendations — named actions with rupee savings per month, plus a target-bill mode that builds a plan to hit a number the user chooses.',
      'Models grounded in real data: 14 Bangalore household surveys, 200 BEE-calibrated synthetic households, the BEE wattage database, KERC April-2025 tariffs and the CIA India emission factor for CO₂ estimates.',
    ],
    how: [
      { label: 'Bill + profile', detail: 'Units consumed, tariff slab and a short house profile from the user.' },
      { label: 'Household persona', detail: 'K-Means assigns one of four Bangalore energy personas.' },
      { label: 'Appliance split', detail: 'Multi-output Random Forest estimates usage per appliance category.' },
      { label: 'Anomaly flag', detail: 'Isolation Forest flags high-wastage households for attention.' },
      { label: 'Action plan', detail: 'Ranked actions with exact ₹/month savings, plus a target-bill planner.' },
    ],
    learned:
      'Fourteen real surveys is a small dataset, and the interesting work was making the synthetic data defensible — BEE wattage references, published tariffs and a documented emission factor — instead of inventing plausible numbers. The project is also deliberately cheap to run: the full pipeline trains on CPU in about 60 seconds and is measured for CO₂, because a sustainability tool that burns compute is not making its own point.',
    outcomes: [
      'Three-model pipeline: K-Means personas → multi-output Random Forest → Isolation Forest anomaly detection',
      'Trained in ~60 seconds on CPU with measured emissions under 0.001 g CO₂',
      'Exact ₹/month savings per action with a target-bill action planner',
      'Built for the Edunet Foundation Skill4Future capstone, Green AI track (Feb 2026)',
    ],
    links: [
      { label: 'Live App', url: 'https://wattwiser-mwy6dxwdvtob3zebkpmmwu.streamlit.app/', kind: 'live' },
      { label: 'GitHub', url: `${GH}/wattwiser`, kind: 'repo' },
    ],
  },
  {
    slug: 'kisan360',
    title: 'Kisan360',
    tagline: 'AI smart-farming assistant for smallholder farmers in India',
    description:
      'A mobile-first farming assistant with on-device crop disease detection, hyper-local forecasts and live commodity prices.',
    category: 'web',
    tier: 'more',
    year: '2025',
    role: 'Full-stack engineer (team project)',
    period: 'Oct 2025',
    accent: '#00d9ff',
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
    problem:
      'Smallholder farmers make decisions with less information than the market has: a disease identified too late, no local forecast, and commodity prices discovered after selling. Kisan360 puts those three on the phone the farmer already carries, in conditions where bandwidth is not guaranteed.',
    built: [
      'Crop and season onboarding, a seven-day forecast wired into a daily task checklist, live commodity prices with charts, and GPS-based farm mapping.',
      'A crop disease scanner that runs TensorFlow.js in the browser and confirms species through the PlantNet API, so a leaf photo returns an answer without a specialist visit.',
      'Gemini-generated tips across six live data integrations, designed for low-bandwidth, local-language field conditions.',
    ],
    how: [
      { label: 'Onboard', detail: 'Crop, season and farm location captured once.' },
      { label: 'Scan', detail: 'Leaf photo classified on-device with TensorFlow.js, confirmed via PlantNet.' },
      { label: 'Forecast', detail: 'Seven-day weather converted into a daily task checklist.' },
      { label: 'Market', detail: 'Agmarknet commodity prices charted for the nearest market.' },
      { label: 'Advise', detail: 'Gemini composes guidance from all six live sources.' },
    ],
    outcomes: [
      'VYUHATECH 2.0 national-level hackathon submission',
      'On-device disease detection (TensorFlow.js) with PlantNet API confirmation',
      'Six live integrations: weather, market prices, maps, plant ID, soil/season logic and Gemini',
      'Mobile-first UX with persistent checklists built for field connectivity',
    ],
    links: [{ label: 'GitHub', url: `${GH}/Kisan360`, kind: 'repo' }],
  },
  {
    slug: 'cultural-diversity-multiplier',
    title: 'Digital Cultural Equity Act',
    tagline: 'Interactive policy prototype for algorithmic language equity',
    description:
      'A working dashboard that lets you move the proposed language multiplier and watch recommendation scores, reach and earnings recompute live.',
    category: 'policy',
    tier: 'more',
    year: '2026',
    role: 'Co-author and prototype engineer',
    period: '2026',
    accent: '#ddb7ff',
    stack: ['HTML', 'JavaScript', 'Interactive dashboard', 'Data visualization', 'Policy research'],
    problem:
      'Recommendation systems are trained mostly on English data, so content in minority languages is systematically under-ranked. A Bhojpuri creator earns ₹15–50 CPM where an identical English creator earns ₹80–250. A policy fix is only credible if the mechanism can be inspected, so the proposal needed a prototype anyone can operate.',
    built: [
      'The Cultural Diversity Multiplier as a concrete mechanism: a tiered boost applied to a video\u2019s internal score before ranking, sized to remove the training-data penalty and designed to shrink to zero as platform language AI improves.',
      'An interactive dashboard where sliders adjust the Tier 2 and Tier 3 multipliers and the numbers recompute in the browser — recommendation scores, reach comparisons and the earnings gap.',
      'A written policy proposal grounded in the published literature, with the prototype attached as the worked demonstration.',
    ],
    outcomes: [
      'Submitted to the SDGs Youth Public Policy Innovation Challenge 2026',
      'Interactive model of three-tier language weighting with live score recomputation',
      'Grounded in Kirdemir et al. (2021), an audit of 256,725 YouTube videos, and Lasser & Poechhacker (2025)',
      'Deployed on GitHub Pages as working evidence for the proposal',
    ],
    links: [
      { label: 'Live Demo', url: `${GH}/cdm-prototype/`, kind: 'live' },
      { label: 'GitHub', url: `${GH}/cdm-prototype`, kind: 'repo' },
    ],
  },
  {
    slug: 'interniq',
    title: 'InternIQ',
    tagline: 'Internship discovery platform with an automated scraper',
    description:
      'A searchable internship board fed by a Python scraper, deployable as two independent services.',
    category: 'web',
    tier: 'more',
    year: '2025',
    role: 'Full-stack engineer',
    period: 'Aug 2025',
    accent: '#00d9ff',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'BeautifulSoup', 'Vercel', 'Render'],
    problem:
      'Internship listings go stale fast, and manually re-checking a dozen sources is worse than not checking at all. InternIQ needed to collect postings on a schedule and make them searchable immediately.',
    built: [
      'A BeautifulSoup scraper that collects fresh postings, triggerable on demand from the UI with toast feedback while it runs.',
      'A FastAPI backend with search, filters and typed responses, and a React frontend to browse by title, location and domain.',
      'A split deployment the way a real product ships: frontend on Vercel, backend on Render with CORS scoped to the frontend origin.',
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
    tagline: 'Full-stack task tracker with AI-assisted workflows, running in production',
    description: 'A deployed task tracker with Google Gemini in the workflow, behind an auth-gated login.',
    category: 'web',
    tier: 'more',
    year: '2025',
    role: 'Builder — full stack',
    period: 'May 2025',
    accent: '#b9f600',
    stack: ['React', 'TypeScript', 'Vite', 'Gemini API', 'Render'],
    problem:
      'Most side projects stop at a local build. Velora started as a prototype and the goal was to carry it all the way to a hosted, authenticated URL.',
    built: [
      'A task tracker with Google\u2019s Gemini API in the loop, wrapped in an auth-gated login flow rather than a bare open page.',
      'A real deployment on Render with real hosting, routing and session handling.',
    ],
    outcomes: [
      'Deployed to production on Render behind a login flow',
      'Gemini API integrated into the task workflow',
      'Shipped from prototype to live URL end to end',
    ],
    links: [
      { label: 'Live App', url: 'https://velora-0n1o.onrender.com/login', kind: 'live' },
      { label: 'GitHub', url: `${GH}/Velora`, kind: 'repo' },
    ],
  },
  {
    slug: 'medimind',
    title: 'MediMind',
    tagline: 'Guided clinical workflow, delivered as an installable Android app',
    description: 'A native Android app with a structured guided workflow, demoable in-browser through an emulator session.',
    category: 'ai',
    tier: 'more',
    year: '2025',
    role: 'Builder — Android app',
    period: 'Mar 2025',
    accent: '#ddb7ff',
    stack: ['Android', 'Java', 'Gradle', 'Guided workflow UI', 'Emulator deployment'],
    problem:
      'A workflow tool only matters if it is open when someone needs it. MediMind explored what a guided clinical workflow looks like as a native phone app — fast to open, structured to follow, and usable without a live connection.',
    built: [
      'A native Android application built with a Gradle/Java toolchain and shipped as an installable APK.',
      'A structured, guided workflow that walks a user through each step instead of presenting a blank form.',
      'An in-browser Appetize emulator session, so the app can be reviewed without installing anything.',
    ],
    outcomes: [
      'Native Android build (Java + Gradle), installable as an APK',
      'Live in-browser demo via the Appetize emulator — nothing to install to review it',
      'Guided workflow designed for fast, offline-friendly use',
    ],
    links: [
      { label: 'Live Demo', url: 'https://appetize.io/app/b_arcto3zj4vfpqq4j3qvmnnevqm', kind: 'demo' },
      { label: 'GitHub', url: `${GH}/MediMind`, kind: 'repo' },
    ],
  },
  {
    slug: 'group-website',
    title: 'Group Storefront',
    tagline: 'Full e-commerce storefront — catalogue, cart and checkout flow',
    description: 'A complete React + TypeScript storefront built as a group deliverable.',
    category: 'web',
    tier: 'more',
    year: '2025',
    role: 'Frontend engineer (group project)',
    period: 'Apr 2025',
    accent: '#ff9e6c',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'REST API'],
    problem:
      'A storefront has to hold together across an entire path — browse, decide, cart, pay — and a break anywhere loses the sale. The brief was to build that whole path in one typed codebase as a team.',
    built: [
      'Product catalogue with search and filtering, product detail pages, a cart with persistent state, and a checkout flow.',
      'A componentised React + TypeScript UI with typed API contracts, built collaboratively and responsive from phone to desktop.',
    ],
    outcomes: [
      'End-to-end shopping flow: browse → detail → cart → checkout',
      'Typed React + TypeScript codebase with a reusable component library',
      'Responsive across mobile and desktop breakpoints',
    ],
    links: [{ label: 'GitHub', url: `${GH}/group_website`, kind: 'repo' }],
  },
  {
    slug: 'bluestock-mf-capstone',
    title: 'Bluestock MF Capstone',
    tagline: 'Mutual-fund screening pipeline with reproducible reports',
    description: 'A scripted analysis pipeline that turns raw mutual-fund data into reviewable, reproducible reports.',
    category: 'data',
    tier: 'more',
    year: '2026',
    role: 'Data engineer — pipeline and analysis',
    period: 'Jun 2026',
    accent: '#b9f600',
    stack: ['Python', 'pandas', 'Jupyter', 'Data pipeline', 'Reporting'],
    problem:
      'Analysis that lives in one-off notebooks cannot be audited or re-run by anyone else, which makes the conclusions hard to trust. The brief was a pipeline that produces the same reports on demand.',
    built: [
      'A scripted pipeline: raw datasets land in a versioned data/raw layer, transforms run as Python scripts, and reports are generated as artefacts.',
      'A reproducible environment with pinned requirements, so the analysis can be re-run and checked rather than taken on faith.',
    ],
    outcomes: [
      'End-to-end pipeline: raw data → scripted transforms → generated reports',
      'Reproducible environment via pinned requirements.txt',
      'Report artefacts committed alongside the code for review',
    ],
    links: [{ label: 'GitHub', url: `${GH}/bluestock-mf-capstone`, kind: 'repo' }],
  },
];

export const flagshipProjects = projects.filter(p => p.tier === 'flagship');
export const archiveProjects = projects.filter(p => p.tier === 'more');

export function findProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
