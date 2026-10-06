import { navSections, site } from '../data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night pb-12 text-cream">
      <div className="mx-auto max-w-[84rem] px-6">
        <div className="flex flex-col gap-8 border-t border-white/12 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-xl font-medium tracking-tight text-cream">{site.name}</p>
            <p className="mt-1.5 text-sm text-cream-mute">{site.role}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {navSections.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="meta-label inline-block py-2 text-cream-mute transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="text-xs leading-relaxed text-cream-mute">
          &copy; {year} {site.name}. Built with React, TypeScript and Tailwind CSS. No metric,
          award or partnership on this site is invented — every figure is traceable to a repository,
          a published evaluation file or a running application.
        </p>
      </div>
    </footer>
  );
}
