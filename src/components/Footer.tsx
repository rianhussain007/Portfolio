import { Github, Linkedin, Mail } from 'lucide-react';
import { navSections, site } from '../data/site';

const socials = [
  { label: 'GitHub', href: site.github, icon: Github },
  { label: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${site.email}`, icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-white/8 bg-[#060e20] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-bold tracking-wide text-white">{site.name}</p>
          <p className="mt-1 text-sm text-[#7f93ad]">{site.role}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-medium text-[#9fb0c9]">
            {navSections.map(link => (
              <li key={link.href}>
                <a href={link.href} className="inline-block py-2 transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2">
          {socials.map(social => {
            const Icon = social.icon;
            const external = !social.href.startsWith('mailto:');
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={`${social.label}${external ? ' (opens in a new tab)' : ''}`}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#9fb0c9] transition-colors hover:border-white/25 hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mx-auto mt-8 max-w-7xl px-6 text-center text-xs text-[#61718c] md:text-left">
        &copy; {year} {site.name}. Built with React, TypeScript and Tailwind CSS.
      </p>
    </footer>
  );
}
