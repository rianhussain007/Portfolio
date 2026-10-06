import { SectionHeading } from './SectionHeading';

interface SkillGroup {
  title: string;
  accent: string;
  skills: string[];
  usedIn: string;
}

const groups: SkillGroup[] = [
  {
    title: 'AI / Computer Vision',
    accent: '#00d9ff',
    skills: ['Python', 'OpenCV', 'MediaPipe', 'Machine learning', 'Model evaluation'],
    usedIn: 'ErgoVigilance, Kisan360, WattWise',
  },
  {
    title: 'Backend',
    accent: '#ddb7ff',
    skills: ['FastAPI', 'Flask', 'REST APIs', 'SQL', 'Authentication'],
    usedIn: 'ErgoVigilance, TradeGuard AI, InternIQ',
  },
  {
    title: 'Frontend',
    accent: '#b9f600',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    usedIn: 'ErgoVigilance, TradeGuard AI, Kisan360, Velora',
  },
  {
    title: 'AI Systems',
    accent: '#00d9ff',
    skills: ['RAG', 'LLM integrations', 'Embeddings', 'Local inference'],
    usedIn: 'TradeGuard AI, ErgoVigilance, Kisan360',
  },
  {
    title: 'Infrastructure / Tools',
    accent: '#ddb7ff',
    skills: ['Git', 'GitHub', 'Docker', 'Cloud and deployment tooling'],
    usedIn: 'ErgoVigilance, TradeGuard AI, InternIQ',
  },
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Skills"
        title="What I actually work with"
        copy="No self-assigned percentages — every item below appears in the projects on this page, and the projects are the real evidence of depth."
      />

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(group => (
          <li
            key={group.title}
            className="flex flex-col rounded-3xl border border-white/8 bg-[#131b2e]/60 p-7 transition-colors duration-200 hover:border-white/18"
          >
            <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-white">
              <span
                className="h-4 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: group.accent }}
                aria-hidden="true"
              />
              {group.title}
            </h3>

            <ul className="mt-5 flex flex-wrap gap-2">
              {group.skills.map(skill => (
                <li
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[#dae2fd]"
                >
                  {skill}
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-white/5 pt-5 text-xs leading-relaxed text-[#8fa3bd]">
              <span className="font-mono uppercase tracking-[0.2em] text-[#7f93ad]">Used in</span>
              <br />
              {group.usedIn}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
