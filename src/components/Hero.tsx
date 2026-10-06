import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { flagshipProjects } from '../data/projects';
import { site } from '../data/site';

/** Staggered entrance. Reduced-motion is handled in CSS, so no JS is involved. */
const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section id="home" className="mx-auto max-w-[84rem] scroll-mt-24 px-6 pb-14 pt-10 sm:pt-16">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <p className="animate-rise meta-label text-ink-mute">
            Applied AI <span aria-hidden="true">×</span> Computer Vision{' '}
            <span aria-hidden="true">×</span> Product Engineering
          </p>

          <h1 className="animate-rise display-hero mt-7 text-ink" style={delay(0.06)}>
            {site.name}
          </h1>

          <p
            className="animate-rise mt-6 text-lg font-medium tracking-tight text-olive sm:text-xl"
            style={delay(0.1)}
          >
            {site.role}
          </p>

          <p
            className="animate-rise mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl sm:leading-relaxed"
            style={delay(0.14)}
          >
            I build intelligent systems that combine computer vision, machine learning and product
            engineering to solve real-world problems.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={delay(0.2)}>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-[#2c2c27] sm:text-base"
            >
              Explore my work
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rian Hussain on GitHub (opens in a new tab)"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-card px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink/30 sm:text-base"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>

          <div
            className="animate-rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm"
            style={delay(0.24)}
          >
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rian Hussain on LinkedIn (opens in a new tab)"
              className="inline-flex items-center gap-2 py-2 font-medium text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 py-2 font-medium text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {site.email}
            </a>
          </div>

          <p
            className="animate-rise mt-8 flex items-center gap-3 text-sm text-ink-mute"
            style={delay(0.28)}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-olive" aria-hidden="true" />
            {site.status}
          </p>
        </div>

        <div className="animate-rise lg:col-span-4 lg:justify-self-end" style={delay(0.3)}>
          <figure className="w-[13.5rem] sm:w-[15rem]">
            <div className="overflow-hidden rounded-lg border border-line bg-card p-2">
              {photoOk ? (
                <img
                  src={site.photo}
                  alt="Portrait of Rian Hussain"
                  width={200}
                  height={200}
                  loading="eager"
                  decoding="async"
                  onError={() => setPhotoOk(false)}
                  className="block h-auto w-full rounded-[4px] object-cover"
                />
              ) : (
                <div className="grid aspect-square w-full place-items-center rounded-[4px] bg-sand">
                  <span className="font-display text-3xl font-semibold text-olive">RH</span>
                </div>
              )}
            </div>
            <figcaption className="meta-label mt-3 text-ink-mute">
              AI/ML Engineer &amp; Product Builder
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Index of the three builds — the fastest way to see what matters here. */}
      <nav aria-label="Flagship builds" className="mt-14 border-t border-line sm:mt-20">
        <p className="meta-label pt-6 text-ink-mute">Three flagship builds</p>
        <ul className="mt-3">
          {flagshipProjects.map((project, i) => (
            <li key={project.slug}>
              <a
                href={`#${project.slug}`}
                className="group flex items-baseline gap-4 border-b border-line-soft py-4 transition-colors duration-200 hover:bg-sand/50 sm:gap-8 sm:py-5"
              >
                <span className="font-mono text-xs text-ink-mute tabular-nums sm:text-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
                  {project.title}
                </span>
                <span className="ml-auto hidden text-right text-sm text-ink-soft sm:block">
                  {project.tagline}
                </span>
                <span
                  className="ml-auto shrink-0 text-ink-mute transition-transform duration-200 group-hover:translate-x-1 sm:ml-6"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
