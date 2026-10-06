import type { ReactNode } from 'react';

interface Props {
  /** Optional running number, e.g. "02" — gives the page a publication feel. */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  /** Accent for the short rule before the eyebrow. */
  accent?: string;
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
  accent = '#596b45',
  className = '',
}: Props) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3 text-ink-mute">
        <span className="h-px w-8 shrink-0" style={{ backgroundColor: accent }} aria-hidden="true" />
        {index && <span className="meta-label tabular-nums">{index}</span>}
        <span className="meta-label" style={{ color: accent }}>
          {eyebrow}
        </span>
      </p>

      <h2 className="display-section mt-5 max-w-4xl text-balance text-ink">{title}</h2>

      {copy && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-[1.0625rem]">
          {copy}
        </p>
      )}
    </div>
  );
}
