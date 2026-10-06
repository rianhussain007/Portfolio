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
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-[#0b1326]/92 py-2.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)]'
          : 'border-transparent bg-[#0b1326]/55 py-4'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6">
        <a
          href="#home"
          aria-label="Rian Hussain — back to top"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[#00d9ff]/40 bg-[#00d9ff]/10 font-display text-sm font-bold text-[#00d9ff]">
            RH
          </span>
          <span className="font-display text-lg font-bold tracking-wide text-white transition-colors group-hover:text-[#00d9ff] sm:text-xl">
            Rian Hussain
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-[#9fb0c9] md:flex">
          {navSections.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-[#00d9ff] after:transition-all after:duration-300 hover:text-white hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-xl bg-white/5 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/12 transition-colors duration-200 hover:bg-white/10 hover:ring-white/25 md:inline-flex"
          >
            Get in touch
          </a>

          <button
            type="button"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMobileOpen(open => !open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-[#9fb0c9] transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="animate-menu-in absolute inset-x-0 top-full border-b border-white/10 bg-[#0b1326]/97 px-6 pb-6 pt-2 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col">
            {navSections.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-[#dae2fd] transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
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
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm font-medium text-[#9fb0c9] transition-colors hover:text-white"
                >
                  <Icon className="h-4 w-4 text-[#00d9ff]" aria-hidden="true" />
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
