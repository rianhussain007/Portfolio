import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
} from 'lucide-react';
import { categories, type Project } from '../data/projects';

function linkIcon(kind: Project['links'][number]['kind']) {
  if (kind === 'repo') return Github;
  if (kind === 'demo') return MonitorPlay;
  return ExternalLink;
}

interface Props {
  project: Project | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  prev?: Project;
  next?: Project;
}

export function ProjectCaseStudy({ project, onClose, onNavigate, prev, next }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while a case study is open
  useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [project]);

  // ESC to close + focus the close button on open
  useEffect(() => {
    if (!project) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  // Reset scroll position when switching between case studies
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project?.slug]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center p-0 sm:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close case study"
            onClick={onClose}
            className="fixed inset-0 bg-[#030716]/85 backdrop-blur-md cursor-default"
          />

          {/* Sheet */}
          <motion.article
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl my-0 sm:my-4 bg-[#0d1528] border border-white/10 rounded-none sm:rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Top bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#0d1528]/90 backdrop-blur-xl border-b border-white/5">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold uppercase tracking-wider shrink-0"
                  style={{ color: project.accent, backgroundColor: `${project.accent}1a`, border: `1px solid ${project.accent}40` }}
                >
                  {categories[project.category].short}
                </span>
                <span className="text-sm font-medium text-[#bbc9ce] truncate">{project.title}</span>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="shrink-0 p-2 rounded-full bg-white/5 border border-white/10 text-[#bbc9ce] hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={scrollRef} className="relative">
              {/* Cover */}
              <div
                className="relative h-44 sm:h-60 overflow-hidden border-b border-white/5"
                style={{ background: `radial-gradient(120% 140% at 15% 0%, ${project.accent}33 0%, ${project.accent}0d 45%, #0b1326 100%)` }}
              >
                <div
                  className="absolute inset-0 opacity-[0.35]"
                  style={{
                    backgroundImage: `linear-gradient(${project.accent}22 1px, transparent 1px), linear-gradient(90deg, ${project.accent}22 1px, transparent 1px)`,
                    backgroundSize: '44px 44px',
                    maskImage: 'radial-gradient(80% 80% at 30% 20%, black, transparent)',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-end px-6 sm:px-10">
                  <span
                    className="font-display font-bold leading-none tracking-tighter select-none"
                    style={{ fontSize: 'clamp(4.5rem, 16vw, 9rem)', color: `${project.accent}1f`, WebkitTextStroke: `1px ${project.accent}33` }}
                  >
                    {project.title.replace(/[^A-Za-z0-9 ]/g, '').split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d1528] to-transparent" />
              </div>

              <div className="px-5 sm:px-8 pb-8 -mt-10 relative z-10">
                {/* Title + links */}
                <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-white mb-3 drop-shadow">
                  {project.title}
                </h2>
                <p className="text-lg sm:text-xl text-[#bbc9ce] leading-relaxed max-w-2xl mb-7">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {project.links.map(link => {
                    const Icon = linkIcon(link.kind);
                    const isPrimary = link.kind !== 'repo';
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                          isPrimary
                            ? 'text-[#060e20] hover:shadow-[0_0_24px_rgba(255,255,255,0.15)]'
                            : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                        }`}
                        style={isPrimary ? { backgroundColor: project.accent } : undefined}
                      >
                        <Icon className="w-4 h-4" />
                        {link.label}
                        <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </a>
                    );
                  })}
                </div>

                {/* Meta */}
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
                  {[
                    { icon: CalendarDays, label: 'Timeline', value: project.period },
                    { icon: UserRound, label: 'Role', value: project.role },
                    { icon: Layers, label: 'Year', value: project.year },
                    { icon: Check, label: 'Type', value: categories[project.category].label },
                  ].map(meta => (
                    <div key={meta.label} className="rounded-2xl bg-[#131b2e]/70 border border-white/5 p-4">
                      <dt className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#7f93ad] mb-1.5">
                        <meta.icon className="w-3 h-3" />
                        {meta.label}
                      </dt>
                      <dd className="text-sm font-medium text-white leading-snug">{meta.value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Overview */}
                <section className="mb-10">
                  <h3 className="font-display font-semibold text-xl text-white mb-4 flex items-center gap-3">
                    Overview
                    <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                  </h3>
                  <div className="space-y-4">
                    {project.overview.map((p, i) => (
                      <p key={i} className="text-[#bbc9ce] leading-relaxed">{p}</p>
                    ))}
                  </div>
                </section>

                {/* Outcomes */}
                <section className="mb-10">
                  <h3 className="font-display font-semibold text-xl text-white mb-4 flex items-center gap-3">
                    Highlights
                    <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.outcomes.map((o, i) => (
                      <li
                        key={i}
                        className="flex gap-3 rounded-2xl bg-[#131b2e]/60 border border-white/5 p-4 text-sm text-[#dae2fd] leading-relaxed"
                      >
                        <span
                          className="mt-0.5 shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                          style={{ backgroundColor: `${project.accent}22`, border: `1px solid ${project.accent}55` }}
                        >
                          <Check className="w-3 h-3" style={{ color: project.accent }} />
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Stack */}
                <section className="mb-10">
                  <h3 className="font-display font-semibold text-xl text-white mb-4 flex items-center gap-3">
                    Tech Stack
                    <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(s => (
                      <span
                        key={s}
                        className="text-xs font-mono px-3 py-1.5 rounded-full border"
                        style={{ backgroundColor: `${project.accent}0d`, borderColor: `${project.accent}33`, color: '#dae2fd' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Note */}
                {project.note && (
                  <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-[#8fa3bd] leading-relaxed italic mb-10">
                    {project.note}
                  </p>
                )}

                {/* Prev / next */}
                <nav className="flex items-stretch gap-3 pt-6 border-t border-white/5">
                  {[prev, next].map((sibling, i) =>
                    sibling ? (
                      <button
                        key={sibling.slug}
                        type="button"
                        onClick={() => onNavigate(sibling.slug)}
                        className={`group flex-1 flex items-center gap-3 rounded-2xl bg-[#131b2e]/60 border border-white/5 hover:border-white/15 p-4 transition-colors ${
                          i === 1 ? 'justify-end text-right' : ''
                        }`}
                      >
                        {i === 0 && (
                          <ArrowLeft className="w-4 h-4 text-[#7f93ad] group-hover:-translate-x-0.5 transition-transform shrink-0" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-[10px] font-mono uppercase tracking-widest text-[#7f93ad] mb-0.5">
                            {i === 0 ? 'Previous' : 'Next'}
                          </span>
                          <span className="block text-sm font-medium text-white truncate">{sibling.title}</span>
                        </span>
                        {i === 1 && (
                          <ArrowRight className="w-4 h-4 text-[#7f93ad] group-hover:translate-x-0.5 transition-transform shrink-0" />
                        )}
                      </button>
                    ) : (
                      <span key={i} className="flex-1" />
                    )
                  )}
                </nav>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
