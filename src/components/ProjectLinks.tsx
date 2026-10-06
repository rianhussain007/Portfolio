import { BookOpen, ExternalLink, Github, Mail, MonitorPlay, Play } from 'lucide-react';
import type { Project, ProjectLink } from '../data/projects';

export function linkIcon(kind: ProjectLink['kind']) {
  switch (kind) {
    case 'repo':
      return Github;
    case 'demo':
      return MonitorPlay;
    case 'video':
      return Play;
    case 'docs':
      return BookOpen;
    case 'contact':
      return Mail;
    default:
      return ExternalLink;
  }
}

interface Props {
  project: Project;
  size?: 'md' | 'sm';
  className?: string;
}

/**
 * Outbound links for a project. Only links that actually resolve are stored in
 * the data, so a private or missing repository never renders a dead button.
 */
export function ProjectLinkButtons({ project, size = 'md', className = '' }: Props) {
  if (project.links.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {project.links.map(link => {
        const Icon = linkIcon(link.kind);
        return (
          <a
            key={link.url}
            href={link.url}
            {...(link.url.startsWith('mailto:')
              ? {}
              : { target: '_blank', rel: 'noopener noreferrer' })}
            aria-label={`${project.title} — ${link.label}${
              link.url.startsWith('mailto:') ? '' : ' (opens in a new tab)'
            }`}
            className={`inline-flex items-center justify-center gap-2 rounded-md border border-line bg-card font-semibold text-ink transition-colors duration-200 hover:border-ink/30 hover:bg-sand/60 ${
              size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'
            }`}
          >
            <Icon className="h-4 w-4 text-olive" aria-hidden="true" />
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
