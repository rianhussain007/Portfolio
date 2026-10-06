import {
  BookOpen,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
  MonitorPlay,
} from 'lucide-react';
import { site } from '../data/site';
import { SectionHeading } from './SectionHeading';

interface ProofLink {
  title: string;
  description: string;
  href: string;
  meta: string;
  badge: string;
  icon: typeof Github;
  accent: string;
  /** External links open in a new tab; mailto does not. */
  external: boolean;
}

interface ProofGroup {
  label: string;
  links: ProofLink[];
}

const groups: ProofGroup[] = [
  {
    label: 'Profiles',
    links: [
      {
        title: 'GitHub',
        description: 'Source for every project in this build log, including the full ErgoVigilance repository.',
        href: site.github,
        meta: 'github.com/rianhussain007',
        badge: 'Code',
        icon: Github,
        accent: '#00d9ff',
        external: true,
      },
      {
        title: 'LinkedIn',
        description: 'Where I post about what I am building and the engineering decisions behind it.',
        href: site.linkedin,
        meta: 'linkedin.com/in/rian-hussain-dev',
        badge: 'Profile',
        icon: Linkedin,
        accent: '#ddb7ff',
        external: true,
      },
      {
        title: 'Resume',
        description: 'One-page summary: education, projects and the technical work in short form.',
        href: site.resume,
        meta: 'PDF · Google Drive',
        badge: 'PDF',
        icon: FileText,
        accent: '#b9f600',
        external: true,
      },
      {
        title: 'Email',
        description: 'The fastest way to reach me about a role, a collaboration or a technical question.',
        href: `mailto:${site.email}`,
        meta: site.email,
        badge: 'Contact',
        icon: Mail,
        accent: '#00d9ff',
        external: false,
      },
    ],
  },
  {
    label: 'Live demos you can open right now',
    links: [
      {
        title: 'WattWise',
        description: 'Enter a bill and household profile, then watch appliance-level estimates and savings actions come out.',
        href: 'https://wattwiser-mwy6dxwdvtob3zebkpmmwu.streamlit.app/',
        meta: 'Streamlit · Python',
        badge: 'Live',
        icon: Globe,
        accent: '#b9f600',
        external: true,
      },
      {
        title: 'Cultural Diversity Multiplier',
        description: 'Move the language-tier multipliers and watch recommendation scores, reach and the earnings gap recompute.',
        href: `${site.github}/cdm-prototype/`,
        meta: 'GitHub Pages · HTML + JS',
        badge: 'Live',
        icon: Globe,
        accent: '#ddb7ff',
        external: true,
      },
      {
        title: 'Velora',
        description: 'A deployed task tracker with Gemini in the workflow, behind a real login. Free tier, so the first load may cold-start.',
        href: 'https://velora-0n1o.onrender.com/login',
        meta: 'Render · React + Gemini',
        badge: 'Live',
        icon: Globe,
        accent: '#00d9ff',
        external: true,
      },
      {
        title: 'MediMind',
        description: 'The Android build running in a browser emulator — review the guided workflow without installing anything.',
        href: 'https://appetize.io/app/b_arcto3zj4vfpqq4j3qvmnnevqm',
        meta: 'Appetize emulator · Java',
        badge: 'Demo',
        icon: MonitorPlay,
        accent: '#ddb7ff',
        external: true,
      },
    ],
  },
  {
    label: 'Technical documentation',
    links: [
      {
        title: 'ErgoVigilance architecture & ops docs',
        description: 'System architecture, pilot guide, data-collection workflow, operations runbook and the production-readiness plan.',
        href: `${site.github}/Ergovigilance-/tree/master/docs`,
        meta: 'docs/ · Markdown',
        badge: 'Docs',
        icon: BookOpen,
        accent: '#00d9ff',
        external: true,
      },
      {
        title: 'ErgoVigilance ground-truth evaluation',
        description: 'The raw evaluation file behind the 87.6% figure — how it was measured and what it excludes.',
        href: `${site.github}/Ergovigilance-/blob/master/results/ground_truth_evaluation.json`,
        meta: 'results/ · JSON',
        badge: 'Evidence',
        icon: FileText,
        accent: '#b9f600',
        external: true,
      },
      {
        title: 'TradeGuard AI setup',
        description: 'Repository with one-command setup and a seeded four-service Docker Compose demo, so the whole system runs locally.',
        href: `${site.github}/tradeguardai`,
        meta: 'Next.js + FastAPI',
        badge: 'Repo',
        icon: Github,
        accent: '#b9f600',
        external: true,
      },
      {
        title: 'ErgoVigilance source',
        description: 'React frontend, FastAPI backend, cloud core and the test suites — 765 tests across the three.',
        href: `${site.github}/Ergovigilance-`,
        meta: 'Full repository',
        badge: 'Repo',
        icon: Github,
        accent: '#00d9ff',
        external: true,
      },
    ],
  },
];

export function ProofOfWork() {
  return (
    <section id="proof" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Proof of work"
        title="Everything is open — go and check"
        copy="Repositories, running applications, architecture documents and the raw evaluation data behind the numbers on this page."
        accent="#b9f600"
      />

      <div className="mt-12 space-y-12">
        {groups.map(group => (
          <div key={group.label}>
            <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-[#7f93ad]">
              {group.label}
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {group.links.map(link => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      aria-label={`${link.title} — ${link.meta}${link.external ? ' (opens in a new tab)' : ''}`}
                      className="group flex h-full flex-col rounded-2xl border border-white/8 bg-[#131b2e]/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-white/20"
                    >
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2.5">
                          <Icon className="h-4 w-4" style={{ color: link.accent }} aria-hidden="true" />
                          <span
                            className="rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest"
                            style={{
                              color: link.accent,
                              backgroundColor: `${link.accent}14`,
                              border: `1px solid ${link.accent}33`,
                            }}
                          >
                            {link.badge}
                          </span>
                        </span>
                        {link.external && (
                          <ExternalLink
                            className="h-3.5 w-3.5 shrink-0 text-[#4a5c7a] transition-colors group-hover:text-white"
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      <h4 className="font-display text-lg font-semibold text-white">{link.title}</h4>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9fb0c9]">{link.description}</p>
                      <p className="mt-4 truncate font-mono text-[11px] text-[#7f93ad]">{link.meta}</p>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
