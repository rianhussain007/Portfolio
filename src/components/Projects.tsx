import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, ExternalLink, Github, Images, MonitorPlay, Plus } from 'lucide-react';
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
import { Screenshot } from './Screenshot';
import { SectionHeading } from './SectionHeading';

const HASH_PREFIX = '#work/';

function monogram(title: string) {
  return title
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function slugFromHash(hash: string) {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const slug = hash.slice(HASH_PREFIX.length);
  return projects.some(p => p.slug === slug) ? slug : null;
}

function LinkIcon({ kind }: { kind: Project['links'][number]['kind'] }) {
  const Icon = kind === 'repo' ? Github : kind === 'demo' ? MonitorPlay : ExternalLink;
  return <Icon className="h-4 w-4" aria-hidden="true" />;
}

function ExternalButtons({ project, size = 'md' }: { project: Project; size?: 'md' | 'sm' }) {
  return (
    <>
      {project.links.map(link => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} — ${link.label} (opens in a new tab)`}
          className={`inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 font-semibold text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/10 ${
            size === 'sm' ? 'px-4 py-2.5 text-sm' : 'px-5 py-3 text-sm'
          }`}
        >
          <LinkIcon kind={link.kind} />
          {link.label}
        </a>
      ))}
    </>
  );
}

/** Large, alternating presentation for the three projects worth reading in depth. */
function FlagshipCard({
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
  const shots = project.screenshots ?? [];
  const highlights = project.outcomes.slice(0, 4);
  const extra = project.stack.length - 6;

  return (
    <article id={project.slug} className="scroll-mt-28 border-t border-white/10 pt-14 sm:pt-20">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
          {shots.length > 0 ? (
            <div className="space-y-4">
              <Screenshot shot={shots[0]} linkToFullSize />
              {shots.length > 1 && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 font-mono text-[11px] uppercase tracking-widest text-[#8fa3bd]">
                    <Images className="h-3.5 w-3.5" aria-hidden="true" />
                    {shots.length} screenshots from the running app
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpen(project.slug)}
                    className="py-2 text-sm font-semibold text-[#00d9ff] underline-offset-4 hover:underline"
                  >
                    See them all in the case study
                  </button>
                </div>
              )}
            </div>
          ) : project.how ? (
            <PipelineFlow steps={project.how} accent={project.accent} label="How it works" />
          ) : null}
        </div>

        <div className={`lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className="font-mono text-xs tabular-nums"
              style={{ color: project.accent }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
              style={{
                color: project.accent,
                backgroundColor: `${project.accent}1a`,
                border: `1px solid ${project.accent}40`,
              }}
            >
              {categories[project.category].short}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7f93ad]">
              {project.period}
            </span>
            {project.status && (
              <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[#9fb0c9]">
                {project.status}
              </span>
            )}
          </div>

          <h3 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-[#9fb0c9] sm:text-lg">{project.description}</p>

          <dl className="mt-6">
            <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7f93ad]">Role</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-[#dae2fd]">{project.role}</dd>
          </dl>

          <ul className="mt-7 space-y-3">
            {highlights.map(item => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#c3cee6]">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: project.accent }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.stack.slice(0, 6).map(tech => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[#9fb0c9]"
              >
                {tech}
              </span>
            ))}
            {extra > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[#7f93ad]">
                <Plus className="h-3 w-3" aria-hidden="true" />
                {extra}
              </span>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onOpen(project.slug)}
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[#060e20] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              style={{ backgroundColor: project.accent }}
            >
              Read the case study
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
            <ExternalButtons project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

/** Typographic cover for projects that have no real screenshots to show. */
function ProjectCover({ project }: { project: Project }) {
  return (
    <div
      className="relative h-40 overflow-hidden sm:h-44"
      style={{
        background: `radial-gradient(120% 130% at 12% 0%, ${project.accent}30 0%, ${project.accent}0a 45%, #0b1326 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(${project.accent}22 1px, transparent 1px), linear-gradient(90deg, ${project.accent}22 1px, transparent 1px)`,
          backgroundSize: '34px 34px',
          maskImage: 'radial-gradient(85% 85% at 25% 15%, black, transparent)',
        }}
      />
      <span
        className="absolute right-4 bottom-1 select-none font-display font-bold leading-none tracking-tighter transition-transform duration-500 group-hover:-translate-y-1"
        style={{
          fontSize: 'clamp(3.25rem, 8vw, 4.5rem)',
          color: `${project.accent}24`,
          WebkitTextStroke: `1px ${project.accent}40`,
        }}
        aria-hidden="true"
      >
        {monogram(project.title)}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#131b2e] to-transparent" />
      <span
        className="absolute left-4 top-4 rounded-lg px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest"
        style={{
          color: project.accent,
          backgroundColor: `${project.accent}1f`,
          border: `1px solid ${project.accent}4d`,
        }}
      >
        {categories[project.category].short}
      </span>
      <span className="absolute right-4 top-4 rounded-md border border-white/5 bg-[#060e20]/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[#8fa3bd]">
        {project.year}
      </span>
    </div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
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

  const availableCategories = useMemo(() => {
    const present = new Set(archiveProjects.map(p => p.category));
    return (Object.keys(categories) as CategoryId[]).filter(c => present.has(c));
  }, []);

  const visibleArchive = useMemo(
    () =>
      activeCategory === 'all'
        ? archiveProjects
        : archiveProjects.filter(p => p.category === activeCategory),
    [activeCategory],
  );

  const openIndex = projects.findIndex(p => p.slug === openSlug);
  const openProjectData = openIndex >= 0 ? projects[openIndex] : null;

  return (
    <section id="work" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Selected work"
        title="Systems I designed, built and shipped"
        copy="Three projects carry most of the engineering depth — a computer-vision platform, an applied research product, and a behavioural ML system. Each one opens into a full case study: the problem, the architecture, the trade-offs and the results."
      />

      <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-24">
        {flagshipProjects.map((project, i) => (
          <FlagshipCard
            key={project.slug}
            project={project}
            index={i}
            reverse={i % 2 === 1}
            onOpen={openProject}
          />
        ))}
      </div>

      {/* Archive */}
      <div id="archive" className="mt-20 scroll-mt-28 border-t border-white/10 pt-14 sm:mt-28 sm:pt-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="More work"
            title="The rest of the build log"
            copy="Smaller in scope, same standard: shipped, documented and reviewable. Filter by discipline."
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by discipline">
            {(['all', ...availableCategories] as const).map(cat => {
              const label = cat === 'all' ? 'All' : categories[cat].label;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-[#00d9ff]/50 bg-[#00d9ff]/10 text-[#00d9ff]'
                      : 'border-white/10 bg-white/5 text-[#9fb0c9] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {visibleArchive.map(project => (
            <article
              key={project.slug}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#131b2e]/60 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/18 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#00d9ff]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <ProjectCover project={project} />

              <div className="flex flex-1 flex-col p-7 sm:p-8">
                <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">{project.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#9fb0c9]">{project.description}</p>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7f93ad]">
                  {project.role}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[#9fb0c9]"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-[#7f93ad]">
                      <Plus className="h-3 w-3" aria-hidden="true" />
                      {project.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/5 pt-5">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#00d9ff] transition-transform duration-200 group-hover:translate-x-1">
                    Read the case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="relative z-10 flex items-center gap-2">
                    <ExternalButtons project={project} size="sm" />
                  </div>
                </div>
              </div>

              {/* Whole-card click target; the buttons above stay clickable. */}
              <button
                type="button"
                onClick={() => openProject(project.slug)}
                aria-label={`Open the ${project.title} case study`}
                className="absolute inset-0 z-0 cursor-pointer rounded-3xl"
              />
            </article>
          ))}
        </div>
      </div>

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
