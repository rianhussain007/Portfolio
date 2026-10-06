import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  X,
  ExternalLink,
  Github,
  MonitorPlay,
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarDays,
  UserRound,
  Layers,
  Lightbulb,
  Wrench,
  Images,
} from 'lucide-react';
import { categories, type Project } from '../data/projects';
import { PipelineFlow } from './PipelineFlow';
import { Screenshot } from './Screenshot';

function linkIcon(kind: Project['links'][number]['kind']) {
  if (kind === 'repo') return Github;
  if (kind === 'demo') return MonitorPlay;
  return ExternalLink;
}

function monogram(title: string) {
  return title
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function CaseSection({
  title,
  icon: Icon,
  accent,
  children,
}: {
  title: string;
  icon: typeof Check;
  accent: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12">
      <h3 className="mb-5 flex items-center gap-3 font-display text-lg font-semibold text-white">
        <Icon className="h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden="true" />
        {title}
        <span className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" aria-hidden="true" />
      </h3>
      {children}
    </section>
  );
}

interface Props {
  project: Project | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  prev?: Project;
  next?: Project;
}

const EXIT_MS = 180;

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

  const cover = project?.screenshots?.[0];
  const gallery = project?.screenshots?.slice(1) ?? [];

  return (
    <>
      {project && (
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
            className="fixed inset-0 cursor-default bg-[#030716]/85 backdrop-blur-md"
          />

          <article className="animate-dialog-in relative my-0 w-full max-w-4xl overflow-hidden rounded-none border border-white/10 bg-[#0d1528] shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:my-4 sm:rounded-3xl">
            {/* Top bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/5 bg-[#0d1528]/90 px-5 py-4 backdrop-blur-xl sm:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider"
                  style={{
                    color: project.accent,
                    backgroundColor: `${project.accent}1a`,
                    border: `1px solid ${project.accent}40`,
                  }}
                >
                  {categories[project.category].short}
                </span>
                <span className="truncate text-sm font-medium text-[#9fb0c9]">{project.title}</span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={requestClose}
                aria-label="Close case study"
                className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2 text-[#9fb0c9] transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="relative">
              {/* Cover — the first real screenshot when one exists, otherwise a typographic panel */}
              <div
                className="relative h-44 overflow-hidden border-b border-white/5 sm:h-64"
                style={{
                  background: `radial-gradient(120% 140% at 15% 0%, ${project.accent}33 0%, ${project.accent}0d 45%, #0b1326 100%)`,
                }}
              >
                {cover ? (
                  <>
                    <img
                      src={cover.src}
                      alt={cover.alt}
                      className="absolute inset-0 h-full w-full object-cover object-top opacity-60"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1528] via-[#0d1528]/55 to-transparent" />
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-[0.35]"
                      aria-hidden="true"
                      style={{
                        backgroundImage: `linear-gradient(${project.accent}22 1px, transparent 1px), linear-gradient(90deg, ${project.accent}22 1px, transparent 1px)`,
                        backgroundSize: '44px 44px',
                        maskImage: 'radial-gradient(80% 80% at 30% 20%, black, transparent)',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-end px-6 sm:px-10">
                      <span
                        className="select-none font-display font-bold leading-none tracking-tighter"
                        aria-hidden="true"
                        style={{
                          fontSize: 'clamp(4.5rem, 16vw, 9rem)',
                          color: `${project.accent}1f`,
                          WebkitTextStroke: `1px ${project.accent}33`,
                        }}
                      >
                        {monogram(project.title)}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d1528] to-transparent" />
                  </>
                )}
              </div>

              <div className="relative z-10 -mt-12 px-5 pb-8 sm:px-8">
                <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  {project.title}
                </h2>
                <p className="mb-7 max-w-2xl text-base leading-relaxed text-[#9fb0c9] sm:text-lg">
                  {project.description}
                </p>

                <div className="mb-10 flex flex-wrap gap-3">
                  {project.links.map(link => {
                    const Icon = linkIcon(link.kind);
                    const isPrimary = link.kind !== 'repo';
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} — ${link.label} (opens in a new tab)`}
                        className={`group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                          isPrimary
                            ? 'text-[#060e20] hover:brightness-110'
                            : 'border border-white/12 bg-white/5 text-white hover:border-white/25 hover:bg-white/10'
                        }`}
                        style={isPrimary ? { backgroundColor: project.accent } : undefined}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5 opacity-50 transition-all group-hover:opacity-100" aria-hidden="true" />
                      </a>
                    );
                  })}
                  {project.links.length === 0 && (
                    <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#9fb0c9]">
                      {project.status ?? 'Private project'} — code and demo are not public
                    </span>
                  )}
                </div>

                <dl className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: CalendarDays, label: 'Timeline', value: project.period },
                    { icon: UserRound, label: 'Role', value: project.role },
                    { icon: Layers, label: 'Discipline', value: categories[project.category].label },
                    { icon: Check, label: 'Status', value: project.status ?? project.year },
                  ].map(meta => (
                    <div key={meta.label} className="rounded-2xl border border-white/5 bg-[#131b2e]/70 p-4">
                      <dt className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#7f93ad]">
                        <meta.icon className="h-3 w-3" aria-hidden="true" />
                        {meta.label}
                      </dt>
                      <dd className="text-sm font-medium leading-snug text-white">{meta.value}</dd>
                    </div>
                  ))}
                </dl>

                {project.problem && (
                  <CaseSection title="The problem" icon={Lightbulb} accent={project.accent}>
                    <p className="leading-relaxed text-[#c3cee6]">{project.problem}</p>
                  </CaseSection>
                )}

                {project.built && project.built.length > 0 && (
                  <CaseSection title="What I built" icon={Wrench} accent={project.accent}>
                    <ul className="space-y-3">
                      {project.built.map(item => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#c3cee6]">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: project.accent }}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CaseSection>
                )}

                {project.how && project.how.length > 0 && (
                  <CaseSection title="How it works" icon={Layers} accent={project.accent}>
                    <PipelineFlow steps={project.how} accent={project.accent} label="Pipeline" />
                  </CaseSection>
                )}

                {gallery.length > 0 && (
                  <CaseSection title="Screenshots" icon={Images} accent={project.accent}>
                    <div className="space-y-6">
                      {gallery.map(shot => (
                        <Screenshot key={shot.src} shot={shot} linkToFullSize />
                      ))}
                    </div>
                  </CaseSection>
                )}

                <CaseSection title="Highlights" icon={Check} accent={project.accent}>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {project.outcomes.map(outcome => (
                      <li
                        key={outcome}
                        className="flex gap-3 rounded-2xl border border-white/5 bg-[#131b2e]/60 p-4 text-sm leading-relaxed text-[#dae2fd]"
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
                          style={{
                            backgroundColor: `${project.accent}22`,
                            border: `1px solid ${project.accent}55`,
                          }}
                        >
                          <Check className="h-3 w-3" style={{ color: project.accent }} aria-hidden="true" />
                        </span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </CaseSection>

                {project.showcase && (
                  <CaseSection title="What you can see" icon={ExternalLink} accent={project.accent}>
                    <p className="leading-relaxed text-[#c3cee6]">{project.showcase}</p>
                  </CaseSection>
                )}

                <CaseSection title="Tech stack" icon={Layers} accent={project.accent}>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="rounded-full border px-3 py-1.5 font-mono text-xs text-[#dae2fd]"
                        style={{
                          backgroundColor: `${project.accent}0d`,
                          borderColor: `${project.accent}33`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CaseSection>

                {project.learned && (
                  <CaseSection title="What I learned" icon={Lightbulb} accent={project.accent}>
                    <p className="leading-relaxed text-[#c3cee6]">{project.learned}</p>
                  </CaseSection>
                )}

                {project.note && (
                  <p className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm italic leading-relaxed text-[#8fa3bd]">
                    {project.note}
                  </p>
                )}

                <nav className="flex items-stretch gap-3 border-t border-white/5 pt-6" aria-label="Other case studies">
                  {[prev, next].map((sibling, i) =>
                    sibling ? (
                      <button
                        key={sibling.slug}
                        type="button"
                        onClick={() => onNavigate(sibling.slug)}
                        className={`group flex flex-1 items-center gap-3 rounded-2xl border border-white/5 bg-[#131b2e]/60 p-4 transition-colors hover:border-white/15 ${
                          i === 1 ? 'justify-end text-right' : ''
                        }`}
                      >
                        {i === 0 && (
                          <ArrowLeft
                            className="h-4 w-4 shrink-0 text-[#7f93ad] transition-transform group-hover:-translate-x-0.5"
                            aria-hidden="true"
                          />
                        )}
                        <span className="min-w-0">
                          <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-widest text-[#7f93ad]">
                            {i === 0 ? 'Previous' : 'Next'}
                          </span>
                          <span className="block truncate text-sm font-medium text-white">{sibling.title}</span>
                        </span>
                        {i === 1 && (
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-[#7f93ad] transition-transform group-hover:translate-x-0.5"
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
            </div>
          </article>
        </div>
      )}
    </>
  );
}
