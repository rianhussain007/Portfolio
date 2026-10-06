import type { PipelineStep } from '../data/projects';

interface Props {
  steps: PipelineStep[];
  accent: string;
  /** Small mono heading above the chain, e.g. "How it works". */
  label?: string;
  /**
   * `grid` — a scannable chain of stage names plus the detail behind each one.
   * `spine` — a vertical numbered flow, used where the project has no screenshots
   * and the architecture is the main visual.
   */
  variant?: 'grid' | 'spine';
  className?: string;
}

/** Renders a pipeline as stage chips plus a numbered explanation of each stage. */
export function PipelineFlow({ steps, accent, label, variant = 'grid', className = '' }: Props) {
  if (variant === 'spine') {
    return (
      <div className={className}>
        {label && <p className="meta-label mb-6 text-ink-mute">{label}</p>}
        <ol className="relative">
          {steps.map((step, i) => (
            <li key={step.label} className="relative flex gap-5 pb-7 last:pb-0">
              {/* connector */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[11px] top-6 bottom-0 w-px"
                  style={{ backgroundColor: 'var(--color-line)' }}
                />
              )}
              <span
                aria-hidden="true"
                className="relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border bg-card text-[10px] font-medium tabular-nums"
                style={{ borderColor: accent, color: accent }}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold tracking-tight text-ink">
                  {step.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                  {step.detail}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <p className="meta-label mb-6 text-ink-mute">{label}</p>}

      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <span
              className="rounded-md border px-2.5 py-1.5 font-mono text-[11px] font-medium sm:text-xs"
              style={{ color: accent, borderColor: 'var(--color-line)', backgroundColor: '#fff' }}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-ink-mute">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {steps.map((step, i) => (
          <div key={step.label}>
            <dt className="flex items-baseline gap-2.5 text-sm font-semibold text-ink">
              <span className="font-mono text-[10px] tabular-nums" style={{ color: accent }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {step.label}
            </dt>
            <dd className="mt-1.5 pl-7 text-sm leading-relaxed text-ink-soft">{step.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
