import { SectionHeading } from './SectionHeading';

interface Affiliation {
  name: string;
  kind: string;
  role: string;
  mine: string;
  shared: string;
  note?: string;
}

const affiliations: Affiliation[] = [
  {
    name: 'ErgoVigilance',
    kind: 'Team project · 2026',
    role: 'Lead builder',
    mine: 'The pose pipeline and dual-core design, the biomechanical risk engine, the FastAPI backend, the four-role React dashboard, session replay, the hand-labelled evaluation harness and the Docker deployment.',
    shared: 'A team worked on the project with me and is credited in the repository.',
  },
  {
    name: 'MarmaAI',
    kind: 'Project in development · 2025 — Present',
    role: 'Product & Engineering Lead',
    mine: 'The 21-acupoint dictionary and localization modules, the ATEV verifier, the calibration flow, the evaluation engine, the 805-test suite and the canonical web front end.',
    shared:
      'Two contributors: dataset collection and evaluation are shared with @keerthan-ms; the repository is private research.',
    note: 'A project and product in development — not a company, and not a medical product.',
  },
  {
    name: 'Kissan 360 — GitHub organisation',
    kind: 'Organisation repo · 2026',
    role: 'Lead Developer & System Architect',
    mine: 'The architecture across the stack: the Express API and MongoDB models, the deterministic net-realization service, the price pipeline and its provenance handling, the FPO pooling maths and the React demo UI.',
    shared:
      'A second contributor works on the platform. The mobile Expo app is a legacy scaffold that is out of scope for the demo.',
    note: 'A GitHub organisation for one project — not a registered company.',
  },
  {
    name: 'Edunet Foundation — Skill4Future',
    kind: 'Programme · Feb 2026',
    role: 'Capstone engineer (Green AI track)',
    mine: 'WattWise: the three-model pipeline, the appliance-level estimates and the savings planner, benchmarked for CPU training time and CO₂ emissions rather than accuracy alone.',
    shared: 'Delivered as the capstone for the programme.',
  },
  {
    name: 'SDGs Youth Public Policy Innovation Challenge',
    kind: 'Submission · 2026',
    role: 'Co-author & prototype engineer',
    mine: 'The interactive Cultural Diversity Multiplier prototype — sliders that recompute recommendation scores, reach and the earnings gap in the browser.',
    shared: 'Submitted as a written policy proposal with the working model attached as evidence.',
  },
];

const stats = [
  { value: '3', label: 'flagship builds with full case studies' },
  { value: '805', label: 'automated tests in MarmaAI' },
  { value: '765', label: 'automated tests in ErgoVigilance' },
  { value: '87.6%', label: 'assessor agreement on 500 hand-labelled frames' },
];

export function Journey() {
  return (
    <section id="journey" className="mx-auto max-w-[84rem] scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        index="05"
        eyebrow="Journey"
        title="Built with teams & initiatives"
        copy="Secondary proof. For each one: my role, what I personally did, and what was shared or out of scope."
      />

      <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-line py-10 lg:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 block text-xs leading-relaxed text-ink-mute">{stat.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-4 border-t border-line">
        {affiliations.map(item => (
          <li key={item.name} className="border-b border-line-soft py-8">
            <div className="grid gap-x-8 gap-y-4 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {item.name}
                </h3>
                <p className="meta-label mt-2 text-ink-mute">{item.kind}</p>
                <p className="mt-4 text-sm font-medium text-ink">{item.role}</p>
                {item.note && (
                  <p className="mt-3 text-xs leading-relaxed text-ink-mute">{item.note}</p>
                )}
              </div>

              <div className="lg:col-span-4">
                <p className="meta-label text-olive">What I did</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.mine}</p>
              </div>

              <div className="lg:col-span-4">
                <p className="meta-label text-ink-mute">What was shared</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.shared}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-mute">
        No awards, traction, funding or partnerships are claimed anywhere on this page. These are
        programmes each project was entered into, the collaboration behind it, and the numbers that
        came out of measuring it.
      </p>
    </section>
  );
}
