import { GraduationCap, Rocket, Globe, Target } from 'lucide-react';
import { projects } from '../data/projects';
import { SectionHeading } from './SectionHeading';

interface Milestone {
  title: string;
  context: string;
  detail: string;
  accent: string;
  icon: typeof Target;
}

const milestones: Milestone[] = [
  {
    title: 'Skill4Future Capstone — Green AI track',
    context: 'Edunet Foundation · Feb 2026',
    detail:
      'WattWise was built as the capstone deliverable, with the model pipeline benchmarked for CPU training time and CO₂ emissions rather than only for accuracy.',
    accent: '#b9f600',
    icon: GraduationCap,
  },
  {
    title: 'VYUHATECH 2.0 — national-level hackathon',
    context: 'Submission · Oct 2025',
    detail:
      'Kisan360 was submitted with on-device disease detection, a seven-day forecast and six live data integrations working end to end.',
    accent: '#00d9ff',
    icon: Rocket,
  },
  {
    title: 'SDGs Youth Public Policy Innovation Challenge 2026',
    context: 'Submission · 2026',
    detail:
      'The Digital Cultural Equity Act proposal was submitted alongside a working prototype, so the mechanism could be inspected rather than just described.',
    accent: '#ddb7ff',
    icon: Globe,
  },
  {
    title: '87.6% agreement with human assessors',
    context: 'ErgoVigilance · 500 hand-labelled frames',
    detail:
      'Measured against frames a person labelled by hand, reported for LOW/MEDIUM risk classes only, with the methodology and the limits published next to the number.',
    accent: '#00d9ff',
    icon: Target,
  },
];

/** Counted from the project data so these figures can never drift from the work. */
const liveDemoCount = projects.filter(p =>
  p.links.some(link => link.kind === 'live' || link.kind === 'demo'),
).length;

const stats = [
  { value: String(projects.length), label: 'projects documented in this build log' },
  { value: String(liveDemoCount), label: 'deployed apps and demos you can open' },
  { value: '765', label: 'automated tests in ErgoVigilance' },
  { value: '87.6%', label: 'assessor agreement on 500 labelled frames' },
];

export function Recognition() {
  return (
    <section id="recognition" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Track record"
        title="Where the work has been submitted and measured"
        copy="No awards are claimed here. These are the programmes each project was entered into and the figures that came out of evaluating it."
        accent="#b9f600"
      />

      <dl className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="rounded-3xl border border-white/8 bg-[#131b2e]/60 p-6 text-center"
          >
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2.5 block text-xs leading-relaxed text-[#9fb0c9]">{stat.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-8 grid gap-5 md:grid-cols-2">
        {milestones.map(item => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className="flex gap-5 rounded-3xl border border-white/8 bg-[#131b2e]/60 p-6 sm:p-7"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                style={{
                  backgroundColor: `${item.accent}14`,
                  border: `1px solid ${item.accent}33`,
                }}
              >
                <Icon className="h-5 w-5" style={{ color: item.accent }} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#7f93ad]">
                  {item.context}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#9fb0c9]">{item.detail}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
