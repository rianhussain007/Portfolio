import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  /** Accent colour for the eyebrow rule. */
  accent?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  accent = '#00d9ff',
  align = 'left',
  className = '',
}: Props) {
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      <p
        className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] ${centered ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
        <span style={{ color: accent }}>{eyebrow}</span>
      </p>
      <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {copy && <p className="mt-5 text-base leading-relaxed text-[#9fb0c9] sm:text-lg">{copy}</p>}
    </div>
  );
}
