import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { categories, type Project } from '../data/projects';
import { PipelineFlow } from './PipelineFlow';
import { ProjectLinkButtons } from './ProjectLinks';
import { Screenshot } from './Screenshot';
import { VideoCard } from './VideoCard';

interface Props {
  project: Project | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  prev?: Project;
  next?: Project;
}

const EXIT_MS = 180;

/** One numbered part of the case study: 01 Problem, 02 Approach, ... */
function Part({
  index,
  title,
  accent,
  children,
}: {
  index: number;
  title: string;
  accent: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line py-9 first:border-t-0 first:pt-2">
      <div className="flex items-baseline gap-4">
        <span className="meta-label tabular-nums" style={{ color: accent }}>
          {String(index).padStart(2, '0')}
        </span>
        <h3 className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
          {title}
        </h3>
      </div>
      <div className="mt-4 sm:pl-10">{children}</div>
    </section>
  );
}

function MetricTable({ project }: { project: Project }) {
  const table = project.metrics;
  if (!table) return null;

  return (
    <div className="mt-2">
      <p className="meta-label text-ink-mute">{table.title}</p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">{table.note}</p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">{table.title}</caption>
          <thead>
            <tr className="border-y border-line">
              {table.columns.map(col => (
                <th key={col} scope="col" className="meta-label py-2.5 pr-4 font-normal text-ink-mute">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map(row => (
              <tr key={row.point} className="border-b border-line-soft">
                <th scope="row" className="py-3 pr-4 align-top text-sm font-medium text-ink">
                  {row.point}
                  {row.flag && (
                    <span className="mt-1 block font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-ink-mute">
                      {row.flag}
                    </span>
                  )}
                </th>
                <td className="py-3 pr-4 align-top text-sm text-ink-soft">{row.method}</td>
                <td className="py-3 pr-4 align-top font-mono text-xs text-ink">{row.value}</td>
                {table.columns.length === 4 && (
                  <td className="py-3 align-top font-mono text-xs text-ink-mute">
                    {row.baseline ?? '—'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-5 space-y-2">
        {table.footnotes.map(note => (
          <li key={note} className="flex gap-3 text-xs leading-relaxed text-ink-mute">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-olive" aria-hidden="true" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectCaseStudy({ project, onClose, onNavigate, prev, next }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);

  // Play a short exit animation, then let the parent unmount the dialog.
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    timerRef.current = window.setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  useEffect(() => {
    closingRef.current = false;
    setClosing(false);
  }, [project?.slug]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  // Lock body scroll while a case study is open
  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [project]);

  // ESC to close + move focus into the dialog on open
  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, requestClose]);

  // Reset scroll position when switching between case studies
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project?.slug]);

  if (!project) return <></>;

  const shots = project.screenshots ?? [];

  /* The nine-part structure. Sections are numbered in the order they render, so
     a project with fewer parts is still numbered 01..0N with no gaps. */
  const parts: { title: string; body: ReactNode }[] = [];

  parts.push({ title: 'Problem', body: <p className="leading-relaxed text-ink-soft">{project.problem}</p> });

  if (project.idea) {
    parts.push({ title: 'Approach', body: <p className="leading-relaxed text-ink-soft">{project.idea}</p> });
  }

  if (project.contribution || project.built) {
    parts.push({
      title: 'My contribution',
      body: (
        <div className="space-y-5">
          {project.contribution && (
            <p className="leading-relaxed text-ink-soft">{project.contribution}</p>
          )}
          {project.built && (
            <ul className="space-y-3">
              {project.built.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {project.collaborators && (
            <p className="border-l-2 border-line pl-4 text-sm leading-relaxed text-ink-mute">
              {project.collaborators}
            </p>
          )}
        </div>
      ),
    });
  }

  if (project.how) {
    parts.push({
      title: 'System',
      body: (
        <PipelineFlow
          steps={project.how}
          accent={project.accent}
          label="Stage by stage"
          className="rounded-lg border border-line bg-card p-6 sm:p-7"
        />
      ),
    });
  }

  if (project.engineering || project.metrics) {
    parts.push({
      title: 'Engineering',
      body: (
        <div className="space-y-6">
          {project.engineering && (
            <ul className="space-y-3.5">
              {project.engineering.map(item => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: project.accent }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
          <MetricTable project={project} />
        </div>
      ),
    });
  }

  if (shots.length > 0 || project.video || project.product || project.showcase) {
    parts.push({
      title: 'Product',
      body: (
        <div className="space-y-6">
          {project.product && <p className="leading-relaxed text-ink-soft">{project.product}</p>}
          {project.video && <VideoCard video={project.video} />}
          {shots.map((shot, i) => (
            <Screenshot
              key={shot.src}
              shot={shot}
              linkToFullSize
              priority={i === 0}
              frameLabel={project.title}
            />
          ))}
          {project.showcase && (
            <p className="border-l-2 border-line pl-4 text-sm leading-relaxed text-ink-mute">
              {project.showcase}
            </p>
          )}
        </div>
      ),
    });
  }

  if (project.challenges || project.learned) {
    parts.push({
      title: 'Challenges',
      body: (
        <div className="space-y-4">
          {project.challenges && <p className="leading-relaxed text-ink-soft">{project.challenges}</p>}
          {project.learned && (
            <p className="border-l-2 border-line pl-4 leading-relaxed text-ink-soft">
              {project.learned}
            </p>
          )}
        </div>
      ),
    });
  }

  parts.push({
    title: 'Current status',
    body: (
      <div className="space-y-5">
        {project.currentStatus && (
          <p className="leading-relaxed text-ink-soft">{project.currentStatus}</p>
        )}
        <ul className="grid gap-3 sm:grid-cols-2">
          {project.outcomes.map(outcome => (
            <li key={outcome} className="border-l-2 border-line pl-4 text-sm leading-relaxed text-ink-soft">
              {outcome}
            </li>
          ))}
        </ul>
        {project.note && (
          <p className="rounded-md border border-line bg-sand/60 p-4 text-sm italic leading-relaxed text-ink-mute">
            {project.note}
          </p>
        )}
      </div>
    ),
  });

  if (project.recognition) {
    const recognition = project.recognition;
    parts.push({
      title: 'Recognition',
      body: (
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-base font-medium leading-relaxed text-ink">
              {recognition.designation} — {recognition.event}, {recognition.year}
            </p>
            <p className="leading-relaxed text-ink-soft">
              &quot;{recognition.proposal}&quot; was recognized as an {recognition.designation} in
              the {recognition.category} category.
            </p>
            <p className="meta-label text-ink-mute">
              {recognition.category} · {recognition.dates}
            </p>
            <p className="text-sm leading-relaxed text-ink-mute">{recognition.detail}</p>
          </div>

          {/* The certificate is the proof, so it is shown whole and opens at full size. */}
          <Screenshot shot={recognition.image} linkToFullSize frameLabel="Certificate" />
        </div>
      ),
    });
  }

  parts.push({
    title: 'Links',
    body: (
      <div className="space-y-4">
        <ProjectLinkButtons project={project} />
        <p className="max-w-2xl text-sm leading-relaxed text-ink-mute">
          {project.links.length === 0
            ? 'There is no public link for this work. '
            : 'Everything above is verifiable from the links provided. '}
          Anything not published is either private or still in development, and is described that way
          on the page rather than implied to be open.
        </p>
      </div>
    ),
  });

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-0 sm:p-6 ${
        closing ? 'animate-dialog-out' : 'animate-fade'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      <button
        type="button"
        aria-label="Close case study"
        onClick={requestClose}
        className="fixed inset-0 cursor-default bg-[#171714]/55 backdrop-blur-sm"
      />

      <article className="animate-dialog-in relative my-0 w-full max-w-4xl border border-line bg-canvas shadow-[0_40px_120px_rgba(23,23,20,0.35)] sm:my-4 sm:rounded-lg">
        <div
          ref={scrollRef}
          className="max-h-none overflow-visible sm:max-h-[calc(100vh-5rem)] sm:overflow-y-auto sm:rounded-lg"
        >
          {/* Masthead */}
          <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-line bg-canvas/95 px-5 py-4 backdrop-blur-md sm:px-9">
            <div className="flex min-w-0 items-center gap-3">
              <span className="meta-label" style={{ color: project.accent }}>
                {categories[project.category].short}
              </span>
              <span className="truncate text-sm text-ink-mute">{project.title}</span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={requestClose}
              aria-label="Close case study"
              className="shrink-0 rounded-md border border-line p-2 text-ink-soft transition-colors hover:bg-sand hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <header className="px-5 pb-8 pt-9 sm:px-9">
            <h2 className="display-section text-ink">{project.title}</h2>
            <p className="mt-3 text-lg font-medium tracking-tight text-ink-soft">{project.tagline}</p>
            {project.subtitle && (
              <p className="meta-label mt-3" style={{ color: project.accent }}>
                {project.subtitle}
              </p>
            )}
            <p className="mt-5 max-w-3xl leading-relaxed text-ink-soft">{project.description}</p>

            <dl className="mt-8 grid gap-x-8 gap-y-5 border-y border-line py-6 sm:grid-cols-3">
              {[
                { label: 'Role', value: project.role },
                { label: 'Timeline', value: project.period },
                { label: 'Status', value: project.status ?? project.year },
              ].map(meta => (
                <div key={meta.label}>
                  <dt className="meta-label text-ink-mute">{meta.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink">{meta.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span
                  key={tech}
                  className="rounded-full border border-line bg-card px-3 py-1.5 font-mono text-[11px] text-ink-soft"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <div className="px-5 pb-8 sm:px-9">
            {parts.map((part, i) => (
              <Part key={part.title} index={i + 1} title={part.title} accent={project.accent}>
                {part.body}
              </Part>
            ))}
          </div>

          <nav
            className="flex items-stretch gap-3 border-t border-line px-5 py-6 sm:px-9"
            aria-label="Other case studies"
          >
            {[prev, next].map((sibling, i) =>
              sibling ? (
                <button
                  key={sibling.slug}
                  type="button"
                  onClick={() => onNavigate(sibling.slug)}
                  className={`group flex flex-1 items-center gap-3 rounded-md border border-line bg-card p-4 text-left transition-colors hover:border-ink/30 ${
                    i === 1 ? 'justify-end text-right' : ''
                  }`}
                >
                  {i === 0 && (
                    <ArrowLeft
                      className="h-4 w-4 shrink-0 text-ink-mute transition-transform group-hover:-translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                  <span className="min-w-0">
                    <span className="meta-label mb-1 block text-ink-mute">
                      {i === 0 ? 'Previous' : 'Next'}
                    </span>
                    <span className="block truncate font-display text-base text-ink">
                      {sibling.title}
                    </span>
                  </span>
                  {i === 1 && (
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                </button>
              ) : (
                <span key={i} className="flex-1" />
              ),
            )}
          </nav>
        </div>
      </article>
    </div>
  );
}
