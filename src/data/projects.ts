export type CategoryId = 'ai' | 'web' | 'policy' | 'data';

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'live' | 'repo' | 'demo' | 'video' | 'docs' | 'contact';
}

/** A real screenshot or diagram captured from the running product. */
export interface ProjectShot {
  src: string;
  alt: string;
  caption: string;
  /** Intrinsic size, so the browser can reserve space and avoid layout shift. */
  width?: number;
  height?: number;
}

/** One step in a pipeline, rendered as a connected flow diagram. */
export interface PipelineStep {
  label: string;
  detail: string;
}

/** One fact in the compact spec row under a flagship title. */
export interface ProjectSpec {
  label: string;
  value: string;
}

/** A published measurement table. Every row must be traceable to a repo artefact. */
export interface MetricRow {
  point: string;
  method: string;
  value: string;
  baseline?: string;
  flag?: string;
}

export interface MetricTable {
  title: string;
  note: string;
  columns: [string, string, string] | [string, string, string, string];
  rows: MetricRow[];
  footnotes: string[];
}

export interface VideoRef {
  url: string;
  title: string;
  poster: string;
  source: string;
  caption: string;
}

/**
 * An external, verifiable recognition — stored exactly as it was awarded.
 * The designation is never upgraded into "winner" or "first place".
 */
export interface Recognition {
  /** Official designation, as printed on the certificate. */
  designation: string;
  /** Awarding body and event, as printed on the certificate. */
  event: string;
  /** The category or theme the recognition was awarded under. */
  category: string;
  /** When the finals were held. */
  dates: string;
  year: string;
  /** Title of the recognized proposal. */
  proposal: string;
  /** One line of context for the case study, kept factual. */
  detail: string;
  /** The certificate itself — the visual proof. */
  image: ProjectShot;
}

export interface Project {
  slug: string;
  title: string;
  /** Small line above the title, e.g. "Research + Product Development". */
  subtitle?: string;
  /** One-line positioning used on cards and headings. */
  tagline: string;
  /** Slightly longer description of what the thing is. */
  description: string;
  category: CategoryId;
  /**
   * `flagship` projects get the full editorial showcase on the homepage.
   * `more` projects stay in the experiments list.
   */
  tier: 'flagship' | 'more';
  year: string;
  role: string;
  period: string;
  status?: string;
  accent: string;
  stack: string[];
  /** Three facts shown under the title in the showcase. */
  specs: ProjectSpec[];
  /** 01 — the real problem that existed. */
  problem: string;
  /** 02 — the approach, and why that approach. */
  idea?: string;
  /** 03 — what Rian personally designed, built or architected. */
  contribution?: string;
  /** Who else worked on it, stated plainly. */
  collaborators?: string;
  /** What was actually built. */
  built?: string[];
  /** 04 — how it works, step by step. Also rendered as a flow diagram. */
  how?: PipelineStep[];
  /** 05 — interesting implementation decisions. */
  engineering?: string[];
  /** 05 — published measurements, when they exist. */
  metrics?: MetricTable;
  /** 06 — what the product actually is, on screen. */
  product?: string;
  /** What a visitor can actually see or open. */
  showcase?: string;
  screenshots?: ProjectShot[];
  video?: VideoRef;
  /** External recognition, shown as a restrained badge and a case-study part. */
  recognition?: Recognition;
  /** 07 — what was genuinely difficult. */
  challenges?: string;
  /** The hardest part and what it taught. */
  learned?: string;
  /** 08 — what works today, what is experimental, what is planned. */
  currentStatus?: string;
  /** Highlights — every line must be traceable to the repo. */
  outcomes: string[];
  note?: string;
  links: ProjectLink[];
}

export const categories: Record<CategoryId, { label: string; short: string }> = {
  ai: { label: 'AI / ML', short: 'AI/ML' },
  web: { label: 'Web & Product', short: 'Web' },
  policy: { label: 'Policy & Research', short: 'Policy' },
  data: { label: 'Data & Analytics', short: 'Data' },
};

const GH = 'https://github.com/rianhussain007';
const K360 = 'https://github.com/Kissan-360/Kisan360_new';
const ERGO_DEMO = 'https://www.youtube.com/watch?v=ovniLZww4VY';
const DCEA_REPO = `${GH}/cdm-prototype`;
const DCEA_PROTOTYPE = 'https://rianhussain007.github.io/cdm-prototype/';

export const projects: Project[] = [
  /* -------------------------------------------------------------------------
     FLAGSHIP 01 — ErgoVigilance
     ------------------------------------------------------------------------- */
  {
    slug: 'ergovigilance',
    title: 'ErgoVigilance',
    subtitle: 'Real-time posture risk screening',
    tagline: 'Computer Vision for Workplace Ergonomics',
    description:
      'AI-powered workplace ergonomics platform using computer vision to identify posture risk and turn live camera data into actionable ergonomic insights.',
    category: 'ai',
    tier: 'flagship',
    year: '2026',
    role: 'Lead builder — computer vision pipeline, backend API and dashboard (team project)',
    period: '2026',
    status: 'TRL-6, closed',
    accent: '#3e4a44',
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
    specs: [
      { label: 'Agreement', value: '87.6% with assessors' },
      { label: 'Tests', value: '765 automated' },
      { label: 'API', value: '110+ endpoints' },
    ],
    problem:
      'Ergonomic risk is normally assessed by hand: someone watches a workstation, scores it once, and moves on. That is slow, inconsistent between assessors, and blind to how posture changes across a shift. The question behind ErgoVigilance was whether one ordinary webcam could produce continuous, explainable posture risk that a supervisor can act on — without shipping worker video to a third party.',
    idea:
      'One webcam, one continuous signal, no worker video leaving the site. Posture is measured rather than judged: joint angles become biomechanical features, features are scored against RULA/REBA-informed thresholds, dwell-based hysteresis keeps the alert level stable, and every score has to trace back to a measured angle and a documented threshold.',
    contribution:
      'I led the build: the pose pipeline and its dual-core design, the biomechanical feature set and risk scoring, the FastAPI backend, the React dashboard across four roles, session replay, the hand-labelled evaluation harness and the four-service Docker deployment. A team worked on the project with me and is credited in the repository.',
    collaborators: 'A team project — contributors are credited in the repository.',
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
        detail:
          'USB webcam or FFmpeg-ingested RTSP CCTV stream, with a setup wizard for framing and lighting.',
      },
      {
        label: 'Pose estimation',
        detail:
          'MediaPipe Pose (33 keypoints) on-premise, or YOLOv8-pose (17 COCO keypoints) with ByteTrack in the cloud core.',
      },
      {
        label: 'Biomechanical features',
        detail: 'Joint angles and alignment across neck, trunk, shoulders, knees, wrists and stance.',
      },
      {
        label: 'Risk scoring',
        detail:
          'RULA/REBA-informed thresholds with dwell-based hysteresis so risk levels stay stable.',
      },
      {
        label: 'Task + risk classification',
        detail: 'HistGradientBoosting classifiers label the activity and calibrate the risk band.',
      },
      {
        label: 'Actionable surface',
        detail:
          'Live operator feedback, supervisor heatmaps, alert lifecycle, PDF reports and session replay.',
      },
    ],
    engineering: [
      'Two pose paths exist for one reason: privacy. MediaPipe runs on-premise so worker video never leaves the site, while the YOLOv8 + ByteTrack cloud core exists for sites where no hardware can be installed. The dashboard behaves the same either way.',
      'Hysteresis is a product decision, not a smoothing detail. Dwell-based thresholds mean a risk level has to persist before it escalates or clears, so supervisors are not trained to ignore flickering alerts.',
      'The first accuracy number was circular — measured against auto-generated labels. I retired it, hand-labelled 500 frames and published 87.6% agreement with its limits stated on the validation page itself.',
      'Only LOW and MEDIUM risk classes were measured against human labels; the page says so rather than implying the whole scale is validated.',
      'Auth fails closed — the stack refuses to boot without AUTH_JWT_SECRET, and face identity is consent-gated and tenant-scoped, so matching runs only when an explicit consent record exists.',
      'Local inference by default: the Ollama layer explains risk scores in plain language without an external API call, which keeps both the data and the dependency footprint on site.',
    ],
    product:
      'A recorded walkthrough of the running system is below, and the four screens in the case study are captured from the application itself — the supervisor dashboard, the validation page, the model comparison view and the cloud camera configuration.',
    showcase:
      'The dashboard, validation, model-comparison and cloud-camera screens are screenshots captured from the running application — not mockups. The repository carries the full backend, cloud core, frontend, test suites and architecture docs, and the ground-truth evaluation file is published alongside the 87.6% figure.',
    screenshots: [
      {
        src: '/projects/ergovigilance-dashboard.webp',
        alt: 'ErgoVigilance supervisor dashboard showing live posture risk level, active alerts and team status',
        caption: 'Live dashboard — current risk level, active alerts and team status from a running session.',
        width: 1400,
        height: 788,
      },
      {
        src: '/projects/ergovigilance-validation.webp',
        alt: 'ErgoVigilance validation page reporting ground-truth evaluation against 500 labelled frames',
        caption: 'Validation page — the 87.6% figure with its methodology and limits stated on the page itself.',
        width: 1400,
        height: 788,
      },
      {
        src: '/projects/ergovigilance-model-dashboard.webp',
        alt: 'ErgoVigilance model dashboard comparing YOLO and MediaPipe pose output with model versioning controls',
        caption: 'Model dashboard — YOLO vs MediaPipe comparison with model versioning and export.',
        width: 1400,
        height: 788,
      },
      {
        src: '/projects/ergovigilance-cloud-cameras.webp',
        alt: 'ErgoVigilance cloud camera management screen listing configured RTSP endpoints and their health',
        caption: 'Cloud cameras — RTSP endpoint management, including honest empty states.',
        width: 1400,
        height: 788,
      },
    ],
    video: {
      url: ERGO_DEMO,
      title: 'ErgoVigilance — recorded walkthrough',
      poster: '/projects/ergovigilance-demo-poster.webp',
      source: 'YouTube',
      caption: 'A walkthrough of the running system recorded from the demo.',
    },
    challenges:
      'The model was the easy half. What took the longest was making the output trustworthy: every score has to trace back to a measured joint angle and a documented threshold, and the product has to state plainly what it does not claim. The harder moments were deciding to throw work away — the first accuracy number, and the assumption that the cloud path could reuse the on-premise keypoints.',
    learned:
      'Retiring a circular accuracy figure, labelling 500 frames by hand and publishing the honest 87.6% with its limits changed how I build: measurement and stated limits are product features, not fine print. It also showed me that the interesting engineering in applied CV is rarely the model — it is the ingestion, the thresholds, the failure modes and the interface that has to be trusted by someone who will not read the paper.',
    currentStatus:
      'TRL-6 and closed: 40 frontend routes and 110+ backend endpoints, 765 automated tests (106 frontend, 478 backend, 181 cloud core), a four-service Docker Compose stack, and the hand-labelled evaluation published in the repository. It is a screening aid, not a medical device, and only the LOW/MEDIUM risk classes have been measured against human labels.',
    outcomes: [
      '87.6% agreement with human assessors across 500 hand-labelled frames — LOW/MEDIUM risk classes only',
      '765 automated tests across frontend, backend and cloud core (106 + 478 + 181)',
      '40 frontend routes and 110+ backend endpoints running on one pipeline',
      'Dual-core design: an on-premise MediaPipe path for privacy, a cloud YOLOv8 path with no on-site hardware',
      'Consent-first identity — face matching only after an explicit, tenant-scoped consent record',
      'Fail-closed JWT auth: the stack refuses to boot without a secret',
    ],
    note: 'A screening aid, not a medical device. Thresholds are RULA/REBA-informed and heuristic, never clinically validated, and only the LOW/MEDIUM risk classes have been measured against human labels.',
    links: [
      { label: 'Watch demo', url: ERGO_DEMO, kind: 'video' },
      { label: 'GitHub', url: `${GH}/Ergovigilance-`, kind: 'repo' },
    ],
  },

  /* -------------------------------------------------------------------------
     FLAGSHIP 02 — MarmaAI
     Every figure below comes from the project's own README and canonical
     status document. The repository is private, so no GitHub link is shown.
     ------------------------------------------------------------------------- */
  {
    slug: 'marmaai',
    title: 'MarmaAI',
    subtitle: 'Research + Product Development',
    tagline: 'AI-Guided Self-Acupressure',
    description:
      'An experimental guided-interaction system that combines camera-based hand tracking, personalized acupressure-point localization and execution verification — so a session ends with a verified result instead of a guess.',
    category: 'ai',
    tier: 'flagship',
    year: '2025 — Present',
    role: 'Product & Engineering Lead (student project lead — not a company)',
    period: '2025 — Present',
    status: 'In development · Modules 1–5 complete',
    accent: '#9e4e26',
    stack: [
      'Python 3.10+',
      'MediaPipe 0.10.35 (Tasks API)',
      'OpenCV',
      'scikit-learn — Random Forest',
      'LOPO-CV evaluation',
      'Next.js 16',
      'Tailwind CSS 4',
      'Zustand',
      'Flask API',
      'Hono on Cloudflare Workers',
    ],
    specs: [
      { label: 'Acupoints', value: '21 modelled' },
      { label: 'Tests', value: '805 automated' },
      { label: 'Accuracy', value: '16-point table' },
    ],
    problem:
      'Acupressure guidance normally comes from a practitioner who knows where each point sits on a specific person. Doing it alone means guessing: you cannot see your own hand from the right angle, you are unsure the point is where it should be, and nothing tells you whether you actually held it correctly. MarmaAI asks whether a camera can close that loop — locate the hand, map the point onto this person rather than a generic diagram, guide the interaction, then verify that it actually happened.',
    idea:
      'Split the problem into five testable stages instead of one model: pose detection, point localization, AR guidance, execution verification (ATEV) and batch evaluation. Localization is per-person — a formula prediction is corrected by a measured calibration offset — and the honest numbers are published both ways, so the dependency on calibration is visible rather than hidden. Verification is a first-class module, not a confidence score.',
    contribution:
      'I lead the project and built the core pipeline: the 21-acupoint dictionary and its topological formulas, the localization modules, the ATEV execution verifier, the calibration flow, the batch evaluation engine and the 805-test suite. I also built the canonical web front end and its API path. The earlier Next.js port and the original front end are frozen and archived in-repo rather than deleted, so the history stays visible.',
    collaborators:
      'Two contributors: me (@rianhussain007) and @keerthan-ms, who works on dataset collection and evaluation.',
    built: [
      '21-acupoint dictionary — hand points defined by anatomical topology rather than pixel templates.',
      'Personal calibration — a capture flow (5–10 images) that measures a per-point residual offset and stores it as a profile the runtime loads automatically, with sanity checks for handedness swaps and implausible offsets.',
      'ATEV execution verification — contact detection, stability measurement and hold-duration tracking, so a completed hold is verified rather than assumed.',
      'AR guidance — a live overlay with colour-coded markers and pressure-zone visualization drawn on the hand.',
      'Batch evaluation engine — per-person breakdowns, leave-one-person-out cross-validation and generated Markdown reports.',
      '805 unit and smoke tests across the localizer, the ATEV verifier and the evaluation engine.',
      'Canonical web front end (Next.js 16 + Tailwind 4 + Zustand) against a Flask API, with the earlier front ends frozen and archived in-repo.',
    ],
    how: [
      {
        label: 'Camera',
        detail:
          'Live capture with framing and lighting checks before a session starts, at a documented 0.523227 mm/px calibration.',
      },
      {
        label: 'Hand landmark detection',
        detail:
          'MediaPipe Tasks API hand landmarker (7.8 MB model) — no markers, no wearables, no second device.',
      },
      {
        label: 'Personalized point localization',
        detail:
          'The 21-point dictionary plus a per-user calibration offset. A Random Forest acts as a verification gate on the prediction, not as the predictor itself.',
      },
      {
        label: 'Guided interaction',
        detail:
          'An AR overlay guides the hand to the point with live positioning feedback and colour-coded markers.',
      },
      {
        label: 'ATEV verification',
        detail:
          'Contact detection, stability and hold duration confirm the interaction actually engaged the intended point.',
      },
      {
        label: 'Session feedback',
        detail:
          'The session summary is saved through the therapy tracker, so a session ends with a record rather than a guess.',
      },
    ],
    engineering: [
      'The Random Forest is a verification gate, not the predictor. Localization comes from topological formulas plus a per-user residual offset; the model exists to check that a prediction is plausible before it reaches the user.',
      'Accuracy is reported honestly, per point and both ways. The headline figures are a 70/30 split across 11 seeds, published as mean ± standard deviation next to the formula-only held-out number for the same point.',
      'A published number was retracted. The earlier 3.43 mm Manibandha result used a non-comparable 1D metric; the audit found the bug, the figure was withdrawn, and the corrected 5.75 mm formula-only result is what ships in the table.',
      'The calibration dependency is measured, not assumed. Five of the sixteen points are served from per-person profiles only, because the bare formula does not generalize across people for them (Vidhura 32.63 mm and Snuffbox 60.58 mm LOPO without calibration).',
      'ATEV keeps the honesty boundary explicit: "contact consistency" means hold stability over time. The system never measures or claims to measure applied pressure — which is exactly why a pressure-sensing glove is a research direction rather than a shipped feature.',
      'Safety labels are declared temporary. The Rujakara/Kalantara classifications are literature-review-informed provisional labels, stated as not expert-reviewed, with a live expert consultation scheduled.',
      'The accuracy explainer runs the production localizer over the project\'s own ground-truth images and reads every millimetre straight out of the JSON files it cites on screen — nothing is recomputed or hardcoded for the demo.',
    ],
    metrics: {
      title: 'Canonical accuracy — 70/30 split, 11-seed mean ± standard deviation',
      note: 'This is the table the project audits itself against. The right-hand column is the same point predicted from the formula alone, without calibration, which is why the two differ so much.',
      columns: ['Point', 'Method', 'Calibrated', 'Formula-only held-out'],
      rows: [
        {
          point: 'Manibandha',
          method: '2-stage nudge + calibration',
          value: '3.65 ± 0.33 mm',
          baseline: '5.75 mm',
        },
        {
          point: 'Kshipra',
          method: 'Fitted nudge + calibration',
          value: '2.78 ± 0.31 mm',
          baseline: '4.62 mm',
        },
        { point: 'Kurcha', method: 'Calibration-only', value: '3.27 ± 0.30 mm', baseline: '15.79 mm' },
        {
          point: 'Hridaya (palmar)',
          method: '2-stage nudge + calibration',
          value: '1.79 ± 0.13 mm',
          baseline: '3.89 mm',
        },
        { point: 'Lohitaksha', method: 'Refit lerp + calibration', value: '1.01 ± 0.09 mm' },
        { point: 'Kanishka', method: 'Refit lerp + calibration', value: '1.02 ± 0.10 mm' },
        { point: 'Talahridaya (index)', method: 'Landmark + calibration', value: '1.50 ± 0.10 mm' },
        {
          point: 'Talahridaya (middle)',
          method: 'Landmark + calibration',
          value: '1.49 ± 0.19 mm',
          flag: 'Preliminary — 2 people',
        },
        { point: 'Talahridaya (thumb)', method: 'Landmark + calibration', value: '2.25 ± 0.17 mm' },
        {
          point: 'Talahridaya (ring)',
          method: 'Landmark + calibration',
          value: '4.31 ± 0.35 mm',
          flag: 'Borderline — closest to the 5 mm bar',
        },
        { point: 'Talahridaya (pinky)', method: 'Landmark + calibration', value: '2.16 ± 0.15 mm' },
        { point: 'Thada', method: 'Landmark + calibration', value: '1.68 ± 0.06 mm' },
        { point: 'Indravastisha', method: 'Refit 2-stage + calibration', value: '2.19 ± 0.16 mm' },
        {
          point: 'Vidhura',
          method: 'Calibration-only',
          value: '1.06 ± 0.08 mm',
          baseline: '32.63 mm (LOPO)',
        },
        {
          point: 'Snuffbox',
          method: 'Calibration-only',
          value: '1.68 ± 0.07 mm',
          baseline: '60.58 mm (LOPO)',
        },
        {
          point: 'Bala',
          method: 'Midpoint + calibration',
          value: '0.84 ± 0.06 mm',
          baseline: '17.82 mm (LOPO)',
        },
      ],
      footnotes: [
        'All calibrated sub-5 mm figures require per-user calibration from 5–10 images. They are not out-of-box accuracy, and the page says so.',
        'Target: under 5 mm. The in-repo literature benchmarks are Malekroodi et al. (<5 mm) and Zheng et al. (1.737 mm).',
        'A dash means the bare formula has no fitted parameters for that point, so no formula-only held-out number exists to publish.',
        '"Calibration-only" points do not generalize from the bare formula — the formula-only column is the honest comparison for them.',
      ],
    },
    product:
      'Five runnable demos: point-by-point guidance, ATEV verification, AR guidance, a guided calibration walkthrough with a before/after comparison, and a full four-point guided session that walks the pipeline end to end and saves a session summary. The web front end is served from Cloudflare Pages through a Hono Worker against the Flask API.',
    showcase:
      'The guided-session demo is the closest thing to the product experience today: it loads a calibration profile when one exists, shows a visible "no profile — using formula-only accuracy" note when one does not, and never reports pressure because it does not measure pressure.',
    challenges:
      'Two things are genuinely hard. First, verification: drawing a target on screen is easy, proving the person actually pressed the right place is not, and a camera cannot measure pressure — which is why the sensor belongs in the research plan instead of being faked. Second, generalization: a formula that works on one hand does not automatically work on another, and the fix — per-person calibration — is a real dependency I chose to publish rather than hide behind one favourable number.',
    learned:
      'Verification is where the engineering actually lives. Splitting the system into detection, localization, guidance and verification made every stage testable on its own, and it also made the limits of camera-only verification obvious. Publishing the retraction and the calibration-only points was uncomfortable, but a number you can audit is worth more than a number that looks better.',
    currentStatus:
      'Modules 1–5 are complete: pose detection, localization, AR guidance, ATEV verification and batch evaluation. Therapy analytics and behavioural personalization have not been started. Expert review of the provisional safety labels is scheduled. The project runs as local demos and a locally served web front end — this is a research build, not a shipped product, and the repository is private.',
    outcomes: [
      '16 hand points with published calibrated accuracy, four of them with a formula-only held-out comparison',
      '805 automated tests across the localizer, the ATEV verifier and the evaluation engine',
      'Best measured point: 0.84 ± 0.06 mm (Bala), at a documented 0.523227 mm/px camera calibration',
      'A retracted 3.43 mm figure replaced by the corrected 5.75 mm — kept in the audit trail rather than quietly dropped',
      'The calibration dependency is published: five points are served from per-person profiles only',
      'An explicit claim boundary in the product: no pressure is measured, and no treatment or diagnosis is claimed',
    ],
    note: 'MarmaAI is a project and product in development — not a registered company, not a healthcare company and not a medical product. It makes no diagnostic, treatment or clinical claims. The Rujakara/Kalantara safety labels are literature-informed provisional labels that have not yet been reviewed by a qualified Ayurveda expert. The pressure-sensing glove is experimental work in progress.',
    links: [
      {
        label: 'Request a walkthrough',
        url: 'mailto:786rianhussain@gmail.com?subject=MarmaAI%20walkthrough',
        kind: 'contact',
      },
    ],
  },

  /* -------------------------------------------------------------------------
     FLAGSHIP 03 — Kisan360
     Content comes from the Kissan-360 organisation repo README (SIH 2026).
     ------------------------------------------------------------------------- */
  {
    slug: 'kisan360',
    title: 'Kisan360',
    subtitle: 'SIH 2026 Internal Hackathon · Problem statement SIH26132',
    tagline: 'Market Linkages & Price Discovery for Farmers',
    description:
      'A market-intelligence and transaction-enablement platform for smallholder farmers. The headline feature is not "what is the mandi price" — it is what a farmer actually pockets after farmer-borne costs, across nearby mandis, ranked by take-home.',
    category: 'web',
    tier: 'flagship',
    year: '2026',
    role: 'Lead Developer & System Architect',
    period: '2026 · demoed 15 Sept 2026',
    status: 'Core demo path complete',
    accent: '#4e6b3f',
    stack: [
      'Node.js + Express',
      'MongoDB',
      'React + Vite + Tailwind',
      'Python FastAPI ×3',
      'Agmarknet price data',
      'Docker / Railway',
    ],
    specs: [
      { label: 'Services', value: '4-service stack' },
      { label: 'Snapshot', value: '85 real price rows' },
      { label: 'Headline', value: 'Net realization' },
    ],
    problem:
      'A farmer selling at the nearest mandi has less information than the market does. A published price says nothing about the transport, storage and other costs that come out of that price, and buyer-side commission is often quoted as though the farmer pays it. Add a stale price feed and no practical way to find a buyer, and the biggest financial decision of the season gets made on the least information in the chain.',
    idea:
      'Make the calculation — not the price — the headline. Compute net realization per mandi: gross sale value minus the costs the farmer actually bears, then rank mandis by take-home. Wrap transactions around that: buyer matching with explicit trust badges, lot creation, and FPO bulk pooling that shows the uplift from selling together. The AI is deliberately confined to explaining numbers a deterministic engine already produced.',
    contribution:
      'Lead developer and system architect. I own the architecture across the stack — the Express API and MongoDB models, the deterministic net-realization service, the price snapshot pipeline and its provenance handling, the FPO pooling maths, the demo auth path, and the React demo UI including the "Why?" drawer, tri-lingual copy and freshness badges. The other contributor is credited on the repository.',
    collaborators:
      'Two contributors, in the Kissan 360 GitHub organisation. The mobile Expo app is a legacy scaffold and is out of scope for the demo.',
    built: [
      'Net-realization calculator — a deterministic FastAPI service that ranks nearby mandis by estimated farmer take-home for a crop, district and quantity.',
      'Price pipeline with provenance — a live Agmarknet pull that falls back to a stamped offline snapshot, with freshness badges in the UI and a daily refresh script that appends to price history.',
      'Buyer matching and trade flow — buyer directory with four-tier trust badges, lot creation, offers and a payment state machine.',
      'FPO bulk-lot pooling — pooled versus individual uplift side by side, where the bulk transport tier engages at 40 quintals.',
      'Grievance workflow on a shared state machine: raise → open → under review → resolved.',
      'Secondary ML services: crop disease detection (CNN) and RAG advisory, plus weather and soil context endpoints.',
      'One-command local stack that starts only the services that are not already healthy, waits on each health check, and tears down what it started.',
    ],
    how: [
      {
        label: 'External sources',
        detail:
          'Agmarknet commodity prices plus weather and soil context. When the live pull fails, a stamped snapshot is served and the UI shows how old the data is.',
      },
      {
        label: 'Database',
        detail:
          'MongoDB stores the facts — price snapshots, price history, buyers, lots, offers, payments and grievances — behind an Express API.',
      },
      {
        label: 'Deterministic calculation',
        detail:
          'The net-realization service computes gross minus farmer-borne transport, storage and other charges. Buyer-side APMC commission is shown separately, never silently deducted.',
      },
      {
        label: 'Rules and ranking',
        detail:
          'Sale window, quality match and arrival intelligence rank mandis and options by estimated take-home for this crop and quantity.',
      },
      {
        label: 'Transactions',
        detail:
          'Buyer trust badges, lots, offers, the payment state machine and FPO pooling turn the number into a decision that can be acted on.',
      },
      {
        label: 'Explanation',
        detail:
          'The RAG service restates the calculator\'s own output in English, मराठी or हिंदी, tagged as an explanation. It never generates a number.',
      },
    ],
    engineering: [
      'The LLM is structurally forbidden from producing a number. External sources supply facts, the database stores facts, a deterministic engine calculates, rules recommend, and the model only restates the calculator\'s own output — tagged with an explainedBy field so the interface can prove where a figure came from. It is an architectural constraint, not an instruction in a prompt.',
      'Commission is modelled where the law puts it. Farmer net realization is gross minus farmer-borne costs; buyer-side APMC commission is reported separately, because under the Maharashtra APMC Act s.31 the commission is charged to the buyer. Deducting it from the farmer\'s take-home would have quietly misstated the headline number.',
      'Every price carries provenance. If the live pull fails the pipeline falls back to a stamped offline snapshot — 85 real soybean, onion and tomato rows for Maharashtra, fetched 2026-09-08 — and the interface surfaces the data date instead of hiding the fallback.',
      'Three FastAPI services sit behind one API surface: disease CNN (:8000), RAG advisory (:8001) and the net-realization calculator (:8002), orchestrated by the Express backend so the demo path is a single request.',
      'Honesty is encoded in the data model, not in a disclaimer. Buyer verification and payment status are simulated for the demo, and the UI says so rather than implying real KYC or real money movement.',
      'The trend endpoints describe the past and are named that way. A 7, 14 or 30-day window reports observed price movement; nothing in the system forecasts.',
      'Operationally the demo is one command: the dev script boots only what is not already healthy, waits on /health for each service and stops what it started, and a seed script loads mid-journey state so an offer can be accepted live during a presentation.',
    ],
    product:
      'Three screens carry the demo. /net-realization ranks mandi cards by take-home with a "Why?" drawer, an AI explanation and English/मराठी/हिंदी copy. /trade holds lots, buyer trust badges, offers and a payment timeline. /fpo puts pooled and individual outcomes side by side.',
    showcase:
      'The repository is public, including the architecture document and the team docs behind it — the pitch notes, the judge Q&A, the data-and-trust write-up and the demo runbook. The price snapshot in the repo is real Agmarknet data with its fetch date recorded.',
    challenges:
      'The calculator was the easy part. The hard part was the trust boundary: an AI feature in a financial workflow invites the model to invent a number, so the design had to make that impossible rather than unlikely, and then prove it in the interface. The second constraint was honesty under demo pressure — simulated payments and buyer verification had to be labelled in the product, not just mentioned in a pitch.',
    learned:
      'I came out of this with a much stricter idea of where a language model belongs. The most useful AI feature here explains a number that already exists, in the language the user reads. That is a smaller claim than "AI-powered pricing" and a far more defensible one.',
    currentStatus:
      'The core demo path is complete and was demoed: price snapshot with fallback, net-realization ranking, buyer directory, lots and offers, FPO pooling, grievances and the payment timeline. Disease detection and the advisory are secondary features. Payments and buyer verification are simulated for the demo, the mobile app is a legacy scaffold outside its scope, and nothing here claims that real farmers measured an improvement.',
    outcomes: [
      'Net realization ranked per mandi — gross minus farmer-borne transport, storage and other charges',
      '85 real price rows in the shipped snapshot (soybean, onion, tomato · Maharashtra) with provenance and freshness visible in the UI',
      'FPO bulk-lot pooling with a bulk transport tier that engages at 40 quintals',
      'Four-tier buyer trust badges behind a simulated, explicitly-labelled payment state machine',
      'Price trend windows of 7, 14 and 30 days that describe the past and never forecast',
      'A documented trust model: sources supply facts, the database stores facts, a deterministic engine calculates, rules recommend, and the model only explains',
    ],
    note: 'Hackathon build. Payment status and buyer verification are simulated — no real money moves and no real KYC happens. Price data is public Agmarknet data with the fetch date shown in the interface, and nothing here claims measured improvements for real farmers.',
    links: [
      { label: 'GitHub', url: K360, kind: 'repo' },
      { label: 'System architecture', url: `${K360}/blob/master/SYSTEM_ARCHITECTURE.md`, kind: 'docs' },
      { label: 'Data model & trust', url: `${K360}/blob/master/docs/DATA_MODEL_AND_TRUST.md`, kind: 'docs' },
    ],
  },

  /* -------------------------------------------------------------------------
     MORE EXPERIMENTS & BUILDS
     ------------------------------------------------------------------------- */
  {
    slug: 'tradeguard-ai',
    title: 'TradeGuard AI',
    tagline: 'Behavioural AI copilot that analyses the trader, not the market',
    description:
      'A behavioural-risk platform that profiles how a trader behaves, explains every score in plain language, and coaches through a retrieval-augmented assistant.',
    category: 'ai',
    tier: 'more',
    year: '2026',
    role: 'Full-stack and ML — model, explainability layer, RAG coach, product UI',
    period: '2026',
    accent: '#596b45',
    stack: [
      'Next.js 15',
      'React',
      'TypeScript',
      'React Query',
      'WebSocket',
      'FastAPI',
      'PostgreSQL',
      'Random Forest',
      'sentence-transformers',
      'FAISS',
      'Groq (Llama 3.3 70B)',
      'Docker Compose',
    ],
    specs: [
      { label: 'Features', value: '22 behavioural' },
      { label: 'Knowledge', value: '8 documents' },
      { label: 'Demo stack', value: '4 services' },
    ],
    problem:
      'Most trading tools analyse the market. The mistakes that actually cost traders money are behavioural — revenge trading after a loss, sizing up while winning, overtrading a bad day. Those patterns are invisible in a price chart and invisible to the trader while they are in them. TradeGuard asks whether a model can score the behaviour itself, explain the score in terms a person will accept, and coach without ever telling anyone what to buy.',
    idea:
      'Make the explanation the product. A risk score nobody trusts changes no behaviour, so the feature breakdown and the plain-language reasoning became the core surface rather than a report at the end.',
    contribution:
      'Built the full stack — the behavioural feature set and Random Forest profiler, the SHAP-style explainability layer, the grounded RAG coach with its guard rails, and the real-time React interface.',
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
      { label: 'Coaching', detail: 'Llama 3.3 70B streams an answer grounded in retrieved text — and refuses trade calls.' },
    ],
    challenges:
      'Explainability stopped being a reporting feature and became the product, which changed the UI priorities completely. The second challenge was restraint: the useful version of an AI coach for traders is one that explicitly refuses to predict prices, which meant designing the guard rails into retrieval and prompting rather than trusting the model to decline.',
    learned:
      'A risk score nobody trusts changes no behaviour. The waterfall breakdown and the plain-language reasoning became the core surface rather than an afterthought, and the guard rails had to be architectural instead of hopeful.',
    currentStatus:
      'The repository contains the full Next.js application, the FastAPI service, the ML pipeline and a seeded four-service Docker Compose demo, so the profiling and coaching flows can be run locally end to end.',
    outcomes: [
      '22-feature behavioural-risk profiler with real-time scoring and pattern detection',
      'Retrieval-augmented coach over 8 knowledge documents that refuses trade recommendations by design',
      'Explainability as a first-class UI surface, not a buried report',
      'WebSocket event bus with 14 specialised hooks and 60+ React Query hooks',
      'One-command setup plus a seeded 4-service Docker Compose demo',
    ],
    links: [{ label: 'GitHub', url: `${GH}/tradeguardai`, kind: 'repo' }],
  },
  {
    slug: 'wattwise',
    title: 'WattWise',
    tagline: 'Green-AI analyser that breaks a household power bill down appliance by appliance',
    description:
      'A bill analyzer that decomposes household electricity use into appliance-level estimates, assigns an energy persona and plans concrete savings actions.',
    category: 'ai',
    tier: 'more',
    year: '2026',
    role: 'Capstone engineer — data, models, app',
    period: 'Feb 2026',
    accent: '#4e6b3f',
    stack: ['Python', 'Streamlit', 'scikit-learn', 'K-Means', 'Random Forest', 'Isolation Forest', 'pandas', 'CodeCarbon'],
    specs: [
      { label: 'Models', value: '3 in one pipeline' },
      { label: 'Training', value: '~60 s on CPU' },
      { label: 'Live app', value: 'Streamlit' },
    ],
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
    currentStatus:
      'Deployed as a public Streamlit app that anyone can open and run with their own bill, built for the Edunet Foundation Skill4Future capstone (Green AI track, Feb 2026).',
    outcomes: [
      'Three-model pipeline: K-Means personas → multi-output Random Forest → Isolation Forest anomaly detection',
      'Trained in ~60 seconds on CPU with measured emissions under 0.001 g CO₂',
      'Exact ₹/month savings per action with a target-bill action planner',
      'Built for the Edunet Foundation Skill4Future capstone, Green AI track (Feb 2026)',
    ],
    links: [
      { label: 'Live app', url: 'https://wattwiser-mwy6dxwdvtob3zebkpmmwu.streamlit.app/', kind: 'live' },
      { label: 'GitHub', url: `${GH}/wattwiser`, kind: 'repo' },
    ],
  },
  {
    slug: 'cultural-diversity-multiplier',
    title: 'Digital Cultural Equity Act',
    subtitle:
      'Honorable Proposal · Global Development Public Policy Youth Innovation Contest Finals 2026',
    tagline:
      'Policy framework and interactive prototype exploring linguistic equity in algorithmically governed digital platforms',
    description:
      'The written proposal — "Silenced by the Algorithm" — with a working simulator attached: move the proposed language multiplier and recommendation scores, reach and creator earnings recompute live in the browser.',
    category: 'policy',
    tier: 'more',
    year: '2026',
    role: 'Co-author and prototype engineer',
    period: '2026',
    accent: '#9e4e26',
    stack: ['HTML', 'JavaScript', 'Interactive dashboard', 'Data visualization', 'Policy research'],
    recognition: {
      designation: 'Honorable Proposal',
      event: 'Global Development Public Policy Youth Innovation Contest Finals',
      category: 'Protection of Cultural Diversity',
      dates: '21–22 July 2026',
      year: '2026',
      proposal:
        'Silenced by the Algorithm: A Policy Framework for Linguistic Cultural Equity in Digital Platform Governance',
      detail:
        '"Honorable Proposal" is the official designation printed on the certificate — not a winner or a first-place award.',
      image: {
        src: '/projects/dcea-honorable-proposal.webp',
        alt: 'Certificate designating "Silenced by the Algorithm" an Honorable Proposal at the Global Development Public Policy Youth Innovation Contest Finals, Protection of Cultural Diversity, 21–22 July 2026',
        caption:
          'The certificate — the designation, the category and the dates exactly as issued at the finals.',
        width: 1400,
        height: 1002,
      },
    },
    specs: [
      { label: 'Tiers', value: '3 language tiers' },
      { label: 'Prototype', value: 'Live on GitHub Pages' },
      { label: 'Recognition', value: 'Honorable Proposal · 2026' },
    ],
    problem:
      'Recommendation systems are trained mostly on English data, so content in minority languages is systematically under-ranked. A Bhojpuri creator earns ₹15–50 CPM where an identical English creator earns ₹80–250. A policy fix is only credible if the mechanism can be inspected, so the proposal needed a prototype anyone can operate.',
    built: [
      'The Cultural Diversity Multiplier as a concrete mechanism: a tiered boost applied to a video\'s internal score before ranking, sized to remove the training-data penalty and designed to shrink to zero as platform language AI improves.',
      'An interactive dashboard where sliders adjust the Tier 2 and Tier 3 multipliers and the numbers recompute in the browser — recommendation scores, reach comparisons and the earnings gap.',
      'A written policy proposal grounded in the published literature, with the prototype attached as the worked demonstration.',
    ],
    how: [
      { label: 'Audit the gap', detail: 'Published research on 256,725 YouTube videos quantifies the language penalty.' },
      { label: 'Define the mechanism', detail: 'A tiered multiplier applied to the internal ranking score before ordering.' },
      { label: 'Build the prototype', detail: 'Sliders recompute scores, reach and earnings in the browser.' },
      { label: 'Publish the proposal', detail: 'The written policy and the working model ship together.' },
    ],
    currentStatus:
      'Entered into the Global Development Public Policy Youth Innovation Contest 2026 and recognized as an Honorable Proposal in the Protection of Cultural Diversity category at the finals held 21–22 July 2026. The written framework and the simulator stay public, with the simulator deployed on GitHub Pages as working evidence.',
    outcomes: [
      'Honorable Proposal — Global Development Public Policy Youth Innovation Contest Finals 2026, Protection of Cultural Diversity category',
      'Interactive model of three-tier language weighting with live score recomputation',
      'Grounded in Kirdemir et al. (2021), an audit of 256,725 YouTube videos, and Lasser & Poechhacker (2025)',
      'The written framework, the simulator and the certificate are all public',
    ],
    note: 'The simulator demonstrates the mechanism described in the proposal — a policy prototype, not a deployed platform feature.',
    links: [
      { label: 'View Interactive Prototype', url: DCEA_PROTOTYPE, kind: 'live' },
      { label: 'View Policy Project on GitHub', url: DCEA_REPO, kind: 'repo' },
    ],
  },
  {
    slug: 'interniq',
    title: 'InternIQ',
    tagline: 'Internship discovery platform with an automated scraper',
    description: 'A searchable internship board fed by a Python scraper, deployable as two independent services.',
    category: 'web',
    tier: 'more',
    year: '2025',
    role: 'Full-stack engineer',
    period: 'Aug 2025',
    accent: '#3e4a44',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'FastAPI', 'BeautifulSoup', 'Vercel', 'Render'],
    specs: [
      { label: 'Deploys as', value: '2 services' },
      { label: 'Scraper', value: 'BeautifulSoup' },
      { label: 'API', value: 'FastAPI + SQLite' },
    ],
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
    accent: '#596b45',
    stack: ['React', 'TypeScript', 'Vite', 'Gemini API', 'Render'],
    specs: [
      { label: 'Status', value: 'Deployed' },
      { label: 'Hosting', value: 'Render' },
      { label: 'Auth', value: 'Login-gated' },
    ],
    problem:
      'Most side projects stop at a local build. Velora started as a prototype and the goal was to carry it all the way to a hosted, authenticated URL.',
    built: [
      'A task tracker with Google\'s Gemini API in the loop, wrapped in an auth-gated login flow rather than a bare open page.',
      'A real deployment on Render with real hosting, routing and session handling.',
    ],
    currentStatus:
      'Live on Render behind a login flow. It runs on a free tier, so the first request may cold-start.',
    outcomes: [
      'Deployed to production on Render behind a login flow',
      'Gemini API integrated into the task workflow',
      'Shipped from prototype to live URL end to end',
    ],
    links: [
      { label: 'Live app', url: 'https://velora-0n1o.onrender.com/login', kind: 'live' },
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
    accent: '#9e4e26',
    stack: ['Android', 'Java', 'Gradle', 'Guided workflow UI', 'Emulator deployment'],
    specs: [
      { label: 'Platform', value: 'Native Android' },
      { label: 'Build', value: 'Java + Gradle' },
      { label: 'Demo', value: 'Browser emulator' },
    ],
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
      { label: 'Live demo', url: 'https://appetize.io/app/b_arcto3zj4vfpqq4j3qvmnnevqm', kind: 'demo' },
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
    accent: '#4e6b3f',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'REST API'],
    specs: [
      { label: 'Flow', value: 'Browse → checkout' },
      { label: 'Codebase', value: 'Typed React' },
      { label: 'Built by', value: 'A team' },
    ],
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
    accent: '#3e4a44',
    stack: ['Python', 'pandas', 'Jupyter', 'Data pipeline', 'Reporting'],
    specs: [
      { label: 'Pipeline', value: 'Scripted steps' },
      { label: 'Environment', value: 'Pinned deps' },
      { label: 'Output', value: 'Generated reports' },
    ],
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
