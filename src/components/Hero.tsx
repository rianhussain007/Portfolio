import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { site } from '../data/site';

const currentlyBuilding = [
  { name: 'ErgoVigilance', detail: 'real-time ergonomic risk screening from ordinary cameras' },
  { name: 'MarmaAI', detail: 'AI-guided self-acupressure, in active development' },
];

/** Staggered entrance. Reduced-motion is handled in CSS, so no JS is involved. */
const delay = (seconds: number) => ({ animationDelay: `${seconds}s` });

export function Hero() {
  const [photoLoaded, setPhotoLoaded] = useState(true);

  return (
    <section id="home" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16 pt-8 sm:pb-24 sm:pt-14">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="animate-rise mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[#7f93ad]">
            Computer Vision · Applied AI · Full-stack
          </p>

          <h1 className="animate-rise font-display tracking-tight" style={delay(0.06)}>
            <span className="block text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              {site.name}
            </span>
            <span className="mt-3 block text-lg font-semibold text-[#00d9ff] sm:mt-4 sm:text-2xl lg:text-3xl">
              {site.role}
            </span>
          </h1>

          <p
            className="animate-rise mt-7 max-w-2xl text-base leading-relaxed text-[#9fb0c9] sm:text-lg"
            style={delay(0.12)}
          >
            I build intelligent systems that connect computer vision, machine learning, backend
            engineering, and thoughtful product design — turning technical ideas into working products.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={delay(0.18)}>
            <a
              href="#work"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#00b4d8] px-6 py-3.5 text-sm font-semibold text-[#060e20] transition-all duration-200 hover:shadow-[0_0_28px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-[0.98] sm:text-base"
            >
              View My Work
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/10 sm:text-base"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>

          <div className="animate-rise mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm" style={delay(0.24)}>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rian Hussain on LinkedIn (opens in a new tab)"
              className="inline-flex items-center gap-2 py-2.5 font-medium text-[#9fb0c9] transition-colors hover:text-white"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 py-2.5 font-medium text-[#9fb0c9] transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </div>

        <div className="animate-rise lg:col-span-5 lg:justify-self-end" style={delay(0.3)}>
          <div className="flex items-center gap-6 lg:flex-col lg:items-end">
            <div className="relative shrink-0">
              <div className="absolute -inset-3 rounded-full bg-[#00d9ff]/10 blur-2xl" aria-hidden="true" />
              <div className="relative h-[150px] w-[150px] overflow-hidden rounded-2xl border border-white/10 bg-[#171f33] sm:h-[200px] sm:w-[200px]">
                {photoLoaded ? (
                  <img
                    src={site.photo}
                    alt="Portrait of Rian Hussain"
                    width={200}
                    height={200}
                    loading="eager"
                    decoding="async"
                    onError={() => setPhotoLoaded(false)}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#0f1a2f]">
                    <span className="font-display text-4xl font-bold text-[#00d9ff]">RH</span>
                  </div>
                )}
              </div>
            </div>

            <dl className="min-w-0 text-sm lg:max-w-xs lg:text-right">
              <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7f93ad]">
                Currently building
              </dt>
              {currentlyBuilding.map(item => (
                <dd key={item.name} className="mt-2 leading-relaxed text-[#9fb0c9]">
                  <span className="font-semibold text-white">{item.name}</span> — {item.detail}
                </dd>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
