import { Maximize2 } from 'lucide-react';
import type { ProjectShot } from '../data/projects';

interface Props {
  shot: ProjectShot;
  /** Above-the-fold screenshots should opt out of lazy loading. */
  priority?: boolean;
  className?: string;
  /** Hide the caption where surrounding copy already explains the image. */
  showCaption?: boolean;
  /**
   * Link the image to its full-resolution file. Product screenshots are dense,
   * and on a phone they render a few hundred pixels wide — this is how the
   * detail stays reachable.
   */
  linkToFullSize?: boolean;
  /** Browser chrome above the image. The label names the screen, never a URL. */
  frameLabel?: string;
}

export function Screenshot({
  shot,
  priority = false,
  className = '',
  showCaption = true,
  linkToFullSize = false,
  frameLabel,
}: Props) {
  const width = shot.width ?? 1400;
  const height = shot.height ?? 788;

  const image = (
    <img
      src={shot.src}
      alt={shot.alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="block h-auto w-full"
    />
  );

  return (
    <figure className={className}>
      <div className="group/shot overflow-hidden rounded-lg border border-line bg-card shadow-[0_1px_2px_rgba(23,23,20,0.05),0_18px_40px_-28px_rgba(23,23,20,0.35)]">
        <div className="flex items-center gap-3 border-b border-line-soft bg-sand/70 px-3.5 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-canvas" />
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-canvas" />
            <span className="h-2.5 w-2.5 rounded-full border border-line bg-canvas" />
          </span>
          {frameLabel && (
            <span className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
              {frameLabel}
            </span>
          )}
          {linkToFullSize && (
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute opacity-0 transition-opacity duration-200 group-hover/shot:opacity-100">
              <Maximize2 className="h-3 w-3" aria-hidden="true" />
              Full size
            </span>
          )}
        </div>

        {linkToFullSize ? (
          <a
            href={shot.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open full-size screenshot: ${shot.alt}`}
            className="block"
          >
            {image}
          </a>
        ) : (
          image
        )}
      </div>

      {showCaption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-ink-mute">{shot.caption}</figcaption>
      )}
    </figure>
  );
}
