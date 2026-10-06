import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import {
  archiveProjects,
  categories,
  flagshipProjects,
  projects,
  type CategoryId,
  type Project,
} from '../data/projects';
import { PipelineFlow } from './PipelineFlow';
import { ProjectCaseStudy } from './ProjectCaseStudy';
import { ProjectLinkButtons } from './ProjectLinks';
import { Screenshot } from './Screenshot';
import { SectionHeading } from './SectionHeading';
import { VideoCard } from './VideoCard';

const HASH_PREFIX = '#work/';

function slugFromHash(hash: string) {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const slug = hash.slice(HASH_PREFIX.length);
  return projects.some(p => p.slug === slug) ? slug : null;
}

/** Compact view of the published accuracy table — real rows, not a summary claim. */
function AccuracyPanel({ project }: { project: Project }) {
  const table = project.metrics;
  if (!table) return null;

  return (
    <div className="rounded-lg border border-line bg-card p-6 sm:p-7">
      <p className="meta-label text-ink-mute">{table.title}</p>

      {/* A stacked list rather than a table: the point names and both numbers
          stay readable at 320px without any horizontal scrolling. */}
      <ul className="mt-5 border-t border-line">
        {table.rows.slice(0, 5).map(row => (
          <li key={row.point} className="border-b border-line-soft py-2.5">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-ink">{row.point}</span>
              <span className="shrink-0 font-mono text-[11px] text-ink">{row.value}</span>
            </div>
            <div className="mt-1 flex items-baseline justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-mute">
                Formula-only
              </span>
              <span className="shrink-0 font-mono text-[11px] text-ink-mute">
                {row.baseline ?? '—'}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-ink-mute">
        {table.rows.length} points are published in full in the case study. Every calibrated figure
        requires per-user calibration (5–10 images) — none of these are out-of-box accuracy.
      </p>
    </div>
  );
}

/** The Kisan360 service topology — the architecture, drawn from the actual services. */
function SystemPanel({ accent }: { accent: string }) {
  const stages = [
    { name: 'Agmarknet + weather', detail: 'External sources supply facts, stamped with a fetch date.' },
    { name: 'Express API :5000 + MongoDB', detail: 'The facts are stored; routes orchestrate the rest.' },
    {
      name: 'Net-realization service :8002',
      detail: 'A deterministic engine calculates — the only place a number is produced.',
    },
    { name: 'Rules + ranking', detail: 'Sale window, quality match and FPO pooling rank the options.' },
    { name: 'React web app :3000', detail: 'Net realization, trade and FPO screens read the result.' },
  ];

  return (
    <div className="rounded-lg border border-line bg-card p-6 sm:p-7">
      <p className="meta-label text-ink-mute">Service topology</p>

      <ol className="mt-6">
        {stages.map((stage, i) => (
          <li key={stage.name} className="relative flex gap-5 pb-6 last:pb-0">
            {i < stages.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[11px] top-6 bottom-0 w-px bg-line"
              />
            )}
            <span
              aria-hidden="true"
              className="relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border bg-card font-mono text-[10px] tabular-nums"
              style={{ borderColor: accent, color: accent }}
            >
              {i + 1}
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-xs text-ink">{stage.name}</span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{stage.detail}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-2 border-t border-line-soft pt-5">
        <p className="meta-label text-ink-mute">
          Disease CNN :8000 · RAG advisory :8001 — secondary services
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">The trust boundary:</span> the language model
          explains numbers the calculator already produced. It never produces one.
        </p>
      </div>
    </div>
  );
}

function FlagshipVisual({ project }: { project: Project }) {
  if (project.slug === 'kisan360') {
    return <SystemPanel accent={project.accent} />;
  }

  if (project.slug === 'marmaai') {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-line bg-card p-6 sm:p-7">
          <PipelineFlow
            steps={project.how ?? []}
            accent={project.accent}
            label="System"
            variant="spine"
          />
        </div>
        <AccuracyPanel project={project} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {project.screenshots?.[0] && (
        <Screenshot shot={project.screenshots[0]} priority frameLabel="Supervisor dashboard" />
      )}
      {project.video && <VideoCard video={project.video} />}
    </div>
  );
}

function FlagshipShowcase({
  project,
  index,
  reverse,
  onOpen,
}: {
  project: Project;
  index: number;
  reverse: boolean;
  onOpen: (slug: string) => void;
}) {
  return (
    <article id={project.slug} className="scroll-mt-24">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-line pt-5">
        <span className="meta-label tabular-nums text-ink-mute">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="meta-label" style={{ color: project.accent }}>
          {categories[project.category].short}
        </span>
        {project.status && <span className="meta-label text-ink-mute">{project.status}</span>}
        <span className="meta-label ml-auto text-ink-mute">{project.period}</span>
      </div>

      <div className="mt-9 grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className={`min-w-0 lg:col-span-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
          <h3 className="display-project text-ink">{project.title}</h3>

          <p className="mt-4 text-lg font-medium tracking-tight text-ink-soft sm:text-xl">
            {project.tagline}
          </p>
          {project.subtitle && (
            <p className="meta-label mt-3 text-ink-mute" style={{ color: project.accent }}>
              {project.subtitle}
            </p>
          )}

          <p className="mt-6 text-base leading-relaxed text-ink-soft">{project.description}</p>

          <dl className="mt-9 grid grid-cols-1 gap-4 border-y border-line py-6 sm:grid-cols-3">
            {project.specs.map(spec => (
              <div key={spec.label}>
                <dt className="meta-label text-ink-mute">{spec.label}</dt>
                <dd className="mt-2 font-display text-lg leading-tight text-ink sm:text-xl">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          <dl className="mt-8">
            <dt className="meta-label text-ink-mute">Role</dt>
            <dd className="mt-2 text-sm font-medium text-ink">{project.role}</dd>
            {project.collaborators && (
              <dd className="mt-2 text-sm leading-relaxed text-ink-mute">{project.collaborators}</dd>
            )}
          </dl>

          <ul className="mt-7 space-y-2.5">
            {project.outcomes.slice(0, 3).map(outcome => (
              <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                <Check
                  className="mt-1 h-3.5 w-3.5 shrink-0"
                  style={{ color: project.accent }}
                  aria-hidden="true"
                />
                {outcome}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpen(project.slug)}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-[#2c2c27]"
            >
              Read the case study
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <ProjectLinkButtons project={project} />
          </div>

          <p className="mt-6 font-mono text-[11px] leading-relaxed text-ink-mute">
            {project.stack.slice(0, 6).join(' · ')}
            {project.stack.length > 6 && ` · +${project.stack.length - 6} more`}
          </p>
        </div>

        <div className={`min-w-0 lg:col-span-6 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
          <FlagshipVisual project={project} />
        </div>
      </div>
    </article>
  );
}

function MoreBuilds({ onOpen }: { onOpen: (slug: string) => void }) {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');

  const availableCategories = useMemo(() => {
    const present = new Set(archiveProjects.map(p => p.category));
    return (Object.keys(categories) as CategoryId[]).filter(c => present.has(c));
  }, []);

  const visible = useMemo(
    () =>
      activeCategory === 'all'
        ? archiveProjects
        : archiveProjects.filter(p => p.category === activeCategory),
    [activeCategory],
  );

  return (
    <div id="more" className="mt-24 scroll-mt-24 border-t border-line pt-14 sm:mt-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          index="02"
          eyebrow="More experiments & builds"
          title="Smaller in scope, same standard"
          copy="Shipped, documented and reviewable — deliberately kept secondary so they do not compete with the three builds above."
          accent="#9e4e26"
        />
        <div
          className="flex flex-wrap gap-x-2 gap-y-1"
          role="group"
          aria-label="Filter projects by discipline"
        >
          {(['all', ...availableCategories] as const).map(cat => {
            const label = cat === 'all' ? 'All' : categories[cat].label;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`meta-label px-2 py-2 transition-colors duration-200 underline-offset-[6px] ${
                  isActive
                    ? 'text-ink underline decoration-olive decoration-2'
                    : 'text-ink-mute hover:text-ink hover:underline'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-12 border-t border-line">
        {visible.map((project, i) => (
          <li key={project.slug} className="border-b border-line-soft">
            <div className="grid gap-x-6 gap-y-3 py-7 sm:grid-cols-12 sm:items-start">
              <span className="meta-label tabular-nums text-ink-mute sm:col-span-1">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="sm:col-span-4">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  <button
                    type="button"
                    onClick={() => onOpen(project.slug)}
                    className="inline-block py-1.5 text-left underline-offset-4 transition-colors hover:text-olive hover:underline"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="meta-label mt-2 text-ink-mute">
                  {categories[project.category].short} · {project.period}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-ink-soft sm:col-span-4">
                {project.tagline}
              </p>

              <div className="sm:col-span-3 sm:justify-self-end">
                <ProjectLinkButtons project={project} size="sm" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SelectedWork() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Deep links: open a case study straight from #work/<slug>
  useEffect(() => {
    const sync = () => setOpenSlug(slugFromHash(window.location.hash));
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const openProject = useCallback((slug: string) => {
    setOpenSlug(slug);
    if (window.location.hash !== `${HASH_PREFIX}${slug}`) {
      window.history.replaceState(null, '', `${HASH_PREFIX}${slug}`);
    }
  }, []);

  const closeProject = useCallback(() => {
    setOpenSlug(null);
    if (window.location.hash.startsWith(HASH_PREFIX)) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const openIndex = projects.findIndex(p => p.slug === openSlug);
  const openProjectData = openIndex >= 0 ? projects[openIndex] : null;

  return (
    <section id="work" className="mx-auto max-w-[84rem] scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Systems I've taken from ideas and problem statements toward working products."
        copy="Three builds carry the engineering depth: a computer-vision system, an applied research product and a market platform for farmers. Each one opens into a full case study — problem, approach, my contribution, architecture, engineering decisions, product, challenges, current status and links."
      />

      <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
        {flagshipProjects.map((project, i) => (
          <FlagshipShowcase
            key={project.slug}
            project={project}
            index={i}
            reverse={i % 2 === 1}
            onOpen={openProject}
          />
        ))}
      </div>

      <MoreBuilds onOpen={openProject} />

      <ProjectCaseStudy
        project={openProjectData}
        onClose={closeProject}
        onNavigate={openProject}
        prev={openIndex > 0 ? projects[openIndex - 1] : undefined}
        next={openIndex >= 0 && openIndex < projects.length - 1 ? projects[openIndex + 1] : undefined}
      />
    </section>
  );
}
