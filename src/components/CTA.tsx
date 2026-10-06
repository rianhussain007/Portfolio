import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { site } from '../data/site';

const primary = {
  label: 'Email me',
  href: `mailto:${site.email}`,
  icon: Mail,
};

const secondary = [
  { label: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { label: 'GitHub', href: site.github, icon: Github },
  { label: 'Resume', href: site.resume, icon: FileText },
];

export function CTA() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1528] p-9 text-center sm:p-14">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d9ff]/60 to-transparent"
          aria-hidden="true"
        />

        <p className="flex items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#00d9ff]">
          <span className="h-px w-8 bg-[#00d9ff]" aria-hidden="true" />
          Get in touch
        </p>

        <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.12]">
          Interested in my work or want to build something together?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#9fb0c9] sm:text-lg">
          I&rsquo;m always glad to talk about AI/ML and computer-vision engineering, product work, or a
          problem worth building a system around.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={primary.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00d9ff] to-[#00b4d8] px-7 py-3.5 text-sm font-semibold text-[#060e20] transition-all duration-200 hover:shadow-[0_0_28px_rgba(0,217,255,0.4)] hover:brightness-110 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            <primary.icon className="h-4 w-4" aria-hidden="true" />
            {primary.label}
          </a>

          {secondary.map(link => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} (opens in a new tab)`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/25 hover:bg-white/10 sm:w-auto sm:text-base"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </a>
            );
          })}
        </div>

        <p className="mt-8 font-mono text-xs text-[#7f93ad]">{site.email}</p>
      </div>
    </section>
  );
}
