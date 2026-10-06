import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { site } from '../data/site';

const secondary = [
  { label: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { label: 'GitHub', href: site.github, icon: Github },
  { label: 'Resume', href: site.resume, icon: FileText },
];

export function CTA() {
  return (
    <section id="contact" className="mt-8 scroll-mt-24 bg-night text-cream">
      <div className="mx-auto max-w-[84rem] px-6 py-24 sm:py-32">
        <p className="meta-label text-cream-mute">Contact</p>

        <h2 className="mt-6 max-w-3xl text-balance font-display text-3xl font-medium leading-[1.1] tracking-tight text-cream sm:text-5xl">
          Interested in my work, or want to build something together?
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-mute sm:text-lg">
          I&rsquo;m glad to talk about applied AI and computer-vision engineering, product work, or a
          problem worth building a system around.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-cream px-6 py-3.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-white sm:text-base"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email me
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
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-3.5 text-sm font-semibold text-cream transition-colors duration-200 hover:border-white/40 hover:bg-white/5 sm:text-base"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </a>
            );
          })}
        </div>

        <p className="mt-8 font-mono text-xs text-cream-mute">{site.email}</p>
      </div>
    </section>
  );
}
