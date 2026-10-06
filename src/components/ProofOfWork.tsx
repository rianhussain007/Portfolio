import { ExternalLink, FileText, Github, Globe, Linkedin, Mail, MonitorPlay } from 'lucide-react';
import { findProject } from '../data/projects';
import { site } from '../data/site';
import { SectionHeading } from './SectionHeading';
import { VideoCard } from './VideoCard';

interface ProofLink {
  title: string;
  description: string;
  href: string;
  meta: string;
  badge: string;
  icon: typeof Github;
  /** External links open in a new tab; mailto does not. */
  external: boolean;
}

interface ProofGroup {
  label: string;
  links: ProofLink[];
}

const github = site.github;
const k360 = 'https://github.com/Kissan-360/Kisan360_new';

const groups: ProofGroup[] = [
  {
    label: 'Profiles',
    links: [
      {
        title: 'GitHub',
        description:
          'Source for every project in this build log, including the full ErgoVigilance repository and its test suites.',
        href: github,
        meta: 'github.com/rianhussain007',
        badge: 'Code',
        icon: Github,
        external: true,
      },
      {
        title: 'LinkedIn',
        description: 'Where I write about what I am building and the engineering decisions behind it.',
        href: site.linkedin,
        meta: 'linkedin.com/in/rian-hussain-dev',
        badge: 'Profile',
        icon: Linkedin,
        external: true,
      },
      {
        title: 'Resume',
        description: 'One page: education, projects and the technical work in short form.',
        href: site.resume,
        meta: 'PDF · Google Drive',
        badge: 'PDF',
        icon: FileText,
        external: true,
      },
      {
        title: 'Email',
        description: 'The fastest way to reach me about a role, a collaboration or a technical question.',
        href: `mailto:${site.email}`,
        meta: site.email,
        badge: 'Contact',
        icon: Mail,
        external: false,
      },
    ],
  },
  {
    label: 'Live demos you can open right now',
    links: [
      {
        title: 'WattWise',
        description:
          'Enter a bill and a household profile, then watch appliance-level estimates and savings actions come out.',
        href: 'https://wattwiser-mwy6dxwdvtob3zebkpmmwu.streamlit.app/',
        meta: 'Streamlit · Python',
        badge: 'Live',
        icon: Globe,
        external: true,
      },
      {
        title: 'Cultural Diversity Multiplier',
        description:
          'Move the language-tier multipliers and watch recommendation scores, reach and the earnings gap recompute.',
        href: `${github}/cdm-prototype/`,
        meta: 'GitHub Pages · HTML + JS',
        badge: 'Live',
        icon: Globe,
        external: true,
      },
      {
        title: 'Velora',
        description:
          'A deployed task tracker with Gemini in the workflow, behind a real login. Free tier, so the first load may cold-start.',
        href: 'https://velora-0n1o.onrender.com/login',
        meta: 'Render · React + Gemini',
        badge: 'Live',
        icon: Globe,
        external: true,
      },
      {
        title: 'MediMind',
        description:
          'The Android build running in a browser emulator — review the guided workflow without installing anything.',
        href: 'https://appetize.io/app/b_arcto3zj4vfpqq4j3qvmnnevqm',
        meta: 'Appetize emulator · Java',
        badge: 'Demo',
        icon: MonitorPlay,
        external: true,
      },
    ],
  },
  {
    label: 'Repositories & documentation',
    links: [
      {
        title: 'Kisan360 — platform repository',
        description:
          'The public organisation repo: backend, web app, three FastAPI services, deployment configs and the team docs.',
        href: k360,
        meta: 'Node · React · Python',
        badge: 'Repo',
        icon: Github,
        external: true,
      },
      {
        title: 'Kisan360 — system architecture',
        description:
          'How the services fit together, and where the trust boundary between the calculator and the language model sits.',
        href: `${k360}/blob/master/SYSTEM_ARCHITECTURE.md`,
        meta: 'SYSTEM_ARCHITECTURE.md',
        badge: 'Docs',
        icon: FileText,
        external: true,
      },
      {
        title: 'Kisan360 — data model & trust',
        description:
          'The written rule that the LLM explains numbers the deterministic engine produced and never generates one.',
        href: `${k360}/blob/master/docs/DATA_MODEL_AND_TRUST.md`,
        meta: 'docs/ · Markdown',
        badge: 'Docs',
        icon: FileText,
        external: true,
      },
      {
        title: 'ErgoVigilance source',
        description:
          'React frontend, FastAPI backend, cloud core and the test suites — 765 tests across the three.',
        href: `${github}/Ergovigilance-`,
        meta: 'Full repository',
        badge: 'Repo',
        icon: Github,
        external: true,
      },
      {
        title: 'ErgoVigilance architecture & ops docs',
        description:
          'System architecture, pilot guide, data-collection workflow, operations runbook and production-readiness plan.',
        href: `${github}/Ergovigilance-/tree/master/docs`,
        meta: 'docs/ · Markdown',
        badge: 'Docs',
        icon: FileText,
        external: true,
      },
      {
        title: 'ErgoVigilance ground-truth evaluation',
        description:
          'The raw evaluation file behind the 87.6% figure — how it was measured and what it excludes.',
        href: `${github}/Ergovigilance-/blob/master/results/ground_truth_evaluation.json`,
        meta: 'results/ · JSON',
        badge: 'Evidence',
        icon: FileText,
        external: true,
      },
      {
        title: 'TradeGuard AI',
        description:
          'One-command setup and a seeded four-service Docker Compose demo, so the whole system runs locally.',
        href: `${github}/tradeguardai`,
        meta: 'Next.js + FastAPI',
        badge: 'Repo',
        icon: Github,
        external: true,
      },
      {
        title: 'MarmaAI — walkthrough by request',
        description:
          'The repository is private (internal research, not for distribution). I can walk through the architecture, the accuracy audit and the demos on a call.',
        href: 'mailto:786rianhussain@gmail.com?subject=MarmaAI%20walkthrough',
        meta: 'Private repository',
        badge: 'Request',
        icon: Mail,
        external: false,
      },
    ],
  },
];

export function ProofOfWork() {
  const demoVideo = findProject('ergovigilance')?.video;

  return (
    <section id="proof" className="mx-auto max-w-[84rem] scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        index="06"
        eyebrow="Proof of work"
        title="Everything here is checkable"
        copy="Recorded demos, running applications, repositories, architecture documents and the raw evaluation data behind the numbers on this page. Where something is private, it says so."
        accent="#9e4e26"
      />

      {demoVideo && (
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <VideoCard video={demoVideo} />
          </div>
          <div className="lg:col-span-5">
            <p className="meta-label text-ink-mute">Watch before you read</p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              A recorded walkthrough of the running ErgoVigilance system — the live posture pipeline,
              the supervisor view and the evaluated risk output. It is the fastest way to see what an
              end-to-end applied computer-vision build looks like here.
            </p>
          </div>
        </div>
      )}

      <div className="mt-20 space-y-14">
        {groups.map(group => (
          <div key={group.label}>
            <h3 className="meta-label border-b border-line pb-4 text-ink-mute">{group.label}</h3>
            <ul className="border-t border-line-soft">
              {group.links.map(link => {
                const Icon = link.icon;
                return (
                  <li key={link.href} className="border-b border-line-soft">
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      aria-label={`${link.title} — ${link.meta}${link.external ? ' (opens in a new tab)' : ''}`}
                      className="group grid gap-x-8 gap-y-2 py-5 transition-colors duration-200 hover:bg-sand/40 lg:grid-cols-12"
                    >
                      <span className="flex items-center gap-3 lg:col-span-4">
                        <Icon className="h-4 w-4 shrink-0 text-olive" aria-hidden="true" />
                        <span className="font-display text-lg font-medium tracking-tight text-ink">
                          {link.title}
                        </span>
                        {link.external && (
                          <ExternalLink
                            className="h-3.5 w-3.5 shrink-0 text-ink-mute transition-colors group-hover:text-ink"
                            aria-hidden="true"
                          />
                        )}
                      </span>
                      <span className="text-sm leading-relaxed text-ink-soft lg:col-span-5">
                        {link.description}
                      </span>
                      <span className="font-mono text-[11px] text-ink-mute lg:col-span-3 lg:text-right">
                        <span className="meta-label mr-3 text-olive lg:mr-0 lg:block">{link.badge}</span>
                        {link.meta}
                      </span>
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
