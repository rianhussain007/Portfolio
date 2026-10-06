import { Play } from 'lucide-react';
import type { VideoRef } from '../data/projects';

interface Props {
  video: VideoRef;
  className?: string;
  /** Above-the-fold posters should opt out of lazy loading. */
  priority?: boolean;
}

/**
 * A linked video poster. The image is the real video thumbnail, so the card
 * shows what is actually in the recording instead of hiding it behind a text link.
 */
export function VideoCard({ video, className = '', priority = false }: Props) {
  return (
    <figure className={className}>
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${video.title} — watch on ${video.source} (opens in a new tab)`}
        className="group/video block overflow-hidden rounded-lg border border-line bg-card shadow-[0_1px_2px_rgba(23,23,20,0.05),0_18px_40px_-28px_rgba(23,23,20,0.35)] transition-colors duration-200 hover:border-ink/25"
      >
        <div className="relative aspect-video overflow-hidden bg-ink">
          <img
            src={video.poster}
            alt={`Video thumbnail: ${video.title}`}
            width={1280}
            height={720}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/video:scale-[1.02]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream/95 text-ink shadow-lg transition-transform duration-300 group-hover/video:scale-105"
          >
            <Play className="ml-0.5 h-5 w-5" />
          </span>
          <span className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cream">
              {video.title}
            </span>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-cream/80">
              {video.source}
            </span>
          </span>
        </div>
      </a>
      {video.caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-ink-mute">{video.caption}</figcaption>
      )}
    </figure>
  );
}
