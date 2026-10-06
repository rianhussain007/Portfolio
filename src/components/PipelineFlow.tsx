import { ArrowRight } from 'lucide-react';
import type { PipelineStep } from '../data/projects';

interface Props {
  steps: PipelineStep[];
  accent: string;
  /** Small mono heading above the chain, e.g. "How it works". */
  label: string;
  className?: string;
}

/**
 * Renders a pipeline two ways at once: a scannable chain of stage names for the
 * shape of the system, and a numbered list with the detail behind each stage.
 */
export function PipelineFlow({ steps, accent, label, className = '' }: Props) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-[#0d1528]/70 p-6 sm:p-8 ${className}`}>
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-[#7f93ad]">{label}</p>

      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((step, i) => (
          <li key={step.label} className="flex items-center gap-2">
            <span
              className="rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-medium sm:text-xs"
              style={{ color: accent, backgroundColor: `${accent}14`, border: `1px solid ${accent}40` }}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#4a5c7a]" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>

      <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {steps.map((step, i) => (
          <div key={step.label}>
            <dt className="flex items-baseline gap-2.5 text-sm font-semibold text-white">
              <span className="font-mono text-[10px] tabular-nums" style={{ color: accent }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {step.label}
            </dt>
            <dd className="mt-1.5 pl-7 text-sm leading-relaxed text-[#9fb0c9]">{step.detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
