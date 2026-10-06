import { FileText, Github, Linkedin, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navSections, site } from '../data/site';

const socialLinks = [
  { label: 'GitHub', href: site.github, icon: Github },
  { label: 'LinkedIn', href: site.linkedin, icon: Linkedin },
  { label: 'Resume', href: site.resume, icon: FileText },
];

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled || isMobileOpen ? 'border-line bg-canvas/95' : 'border-transparent bg-canvas/75'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex w-full max-w-[84rem] items-center justify-between gap-4 px-6 py-3.5"
      >
        <a href="#home" aria-label="Rian Hussain — back to top" className="group flex shrink-0 items-center gap-3">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ink font-mono text-[11px] font-medium tracking-tight text-cream">
            RH
          </span>
          <span className="font-display text-lg font-medium tracking-tight text-ink transition-colors group-hover:text-olive sm:text-xl">
            {site.name}
          </span>
        </a>

        <ul className="hidden items-center gap-4 md:flex lg:gap-7">
          {navSections.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="meta-label text-ink-soft transition-colors duration-200 underline-offset-[6px] hover:text-ink hover:underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {socialLinks.map(link => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (opens in a new tab)`}
                    className="grid h-9 w-9 place-items-center rounded-md text-ink-mute transition-colors duration-200 hover:bg-sand hover:text-ink"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-[#2c2c27] xl:inline-flex"
          >
            Get in touch
          </a>

          <button
            type="button"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMobileOpen(open => !open)}
            className="grid h-10 w-10 place-items-center rounded-md border border-line text-ink-soft transition-colors hover:bg-sand hover:text-ink md:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="animate-menu-in absolute inset-x-0 top-full border-b border-line bg-canvas px-6 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {navSections.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block border-b border-line-soft py-3.5 font-display text-xl font-medium text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileOpen(false)}
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-3.5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  <Icon className="h-4 w-4 text-olive" aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
