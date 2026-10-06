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
}

const INTRINSIC_WIDTH = 1400;
const INTRINSIC_HEIGHT = 788;

export function Screenshot({
  shot,
  priority = false,
  className = '',
  showCaption = true,
  linkToFullSize = false,
}: Props) {
  const image = (
    <img
      src={shot.src}
      alt={shot.alt}
      width={INTRINSIC_WIDTH}
      height={INTRINSIC_HEIGHT}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="h-auto w-full"
    />
  );

  return (
    <figure className={className}>
      <div className="group/shot relative overflow-hidden rounded-2xl border border-white/10 bg-[#060e20]">
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
        {linkToFullSize && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#060e20]/85 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[#9fb0c9] opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/shot:opacity-100"
          >
            <Maximize2 className="h-3 w-3" />
            Full size
          </span>
        )}
      </div>
      {showCaption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-[#8fa3bd]">{shot.caption}</figcaption>
      )}
    </figure>
  );
}
