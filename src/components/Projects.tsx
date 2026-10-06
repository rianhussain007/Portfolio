import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Github, MonitorPlay, Plus } from 'lucide-react';
import { categories, projects, type CategoryId, type Project } from '../data/projects';
import { ProjectCaseStudy } from './ProjectCaseStudy';

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

function ProjectCover({ project }: { project: Project }) {
  return (
    <div
      className="relative h-44 sm:h-52 overflow-hidden"
      style={{
        background: `radial-gradient(120% 130% at 12% 0%, ${project.accent}30 0%, ${project.accent}0a 45%, #0b1326 100%)`,
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `linear-gradient(${project.accent}22 1px, transparent 1px), linear-gradient(90deg, ${project.accent}22 1px, transparent 1px)`,
              backgroundSize: '34px 34px',
              maskImage: 'radial-gradient(85% 85% at 25% 15%, black, transparent)',
            }}
          />
          <span
            className="absolute right-4 bottom-1 font-display font-bold leading-none tracking-tighter select-none transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 5rem)',
              color: `${project.accent}24`,
              WebkitTextStroke: `1px ${project.accent}40`,
            }}
          >
            {monogram(project.title)}
          </span>
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#131b2e] to-transparent" />
      <span
        className="absolute top-4 left-4 inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold uppercase tracking-widest backdrop-blur-sm"
        style={{ color: project.accent, backgroundColor: `${project.accent}1f`, border: `1px solid ${project.accent}4d` }}
      >
        {categories[project.category].short}
      </span>
      <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[#8fa3bd] bg-[#060e20]/70 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
        {project.year}
      </span>
    </div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Deep links: open a case study from #work/<slug>
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
    const present = new Set(projects.map(p => p.category));
    return (Object.keys(categories) as CategoryId[]).filter(c => present.has(c));
  }, []);

  const visible = useMemo(
    () => (activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory)),
    [activeCategory]
  );

  const openIndex = projects.findIndex(p => p.slug === openSlug);
  const openProjectData = openIndex >= 0 ? projects[openIndex] : null;

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-24 sm:py-32 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
      >
        <div>
          <span className="inline-block text-xs font-mono uppercase tracking-[0.25em] text-[#00d9ff] mb-4">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight drop-shadow">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#00687b]">Projects</span>
          </h2>
          <p className="text-[#bbc9ce] max-w-2xl text-lg md:text-xl leading-relaxed">
            Production systems, research prototypes and shipped products. Open any card for the full case study — architecture, decisions and results.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
          {(['all', ...availableCategories] as const).map(cat => {
            const label = cat === 'all' ? 'All' : categories[cat].label;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  isActive
                    ? 'bg-[#00d9ff]/10 border-[#00d9ff]/50 text-[#00d9ff] shadow-[0_0_16px_rgba(0,217,255,0.15)]'
                    : 'bg-white/5 border-white/10 text-[#bbc9ce] hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {visible.map((project, i) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, scale: 0.97, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: 'easeOut' }}
            className="group relative flex flex-col bg-[#131b2e]/60 border border-white/5 rounded-3xl overflow-hidden hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-all duration-300 ease-out"
          >
            <div className="transform-gpu transition-transform duration-500 group-hover:scale-[1.01]">
              <ProjectCover project={project} />
            </div>

            <div className="p-7 sm:p-8 flex flex-col flex-1">
              <h3 className="font-display font-semibold text-2xl mb-2 text-white transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-[#bbc9ce] leading-relaxed mb-6 line-clamp-2">
                {project.tagline}
              </p>

              <div className="flex flex-wrap gap-2 mb-7 mt-auto">
                {project.stack.slice(0, 4).map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 text-[#bbc9ce] border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 text-[#7f93ad] border border-white/10 inline-flex items-center gap-1">
                    <Plus className="w-3 h-3" />
                    {project.stack.length - 4}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/5">
                <span className="text-sm font-semibold text-[#00d9ff] inline-flex items-center gap-2 transition-transform duration-200 group-hover:translate-x-1">
                  View case study
                  <ArrowRight className="w-4 h-4" />
                </span>
                <div className="flex items-center gap-2 relative z-10">
                  {project.links.map(link => {
                    const Icon = link.kind === 'repo' ? Github : link.kind === 'demo' ? MonitorPlay : ExternalLink;
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} — ${link.label}`}
                        title={link.label}
                        onClick={e => e.stopPropagation()}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#bbc9ce] hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Whole-card click target for the case study (links above stay clickable) */}
            <button
              type="button"
              onClick={() => openProject(project.slug)}
              aria-label={`Open ${project.title} case study`}
              className="absolute inset-0 z-0 rounded-3xl cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#00d9ff]"
            />
          </motion.article>
        ))}
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
