/**
 * Page titles, in one place.
 *
 * The prerender step (scripts/prerender-routes.ts) writes these into the static
 * HTML of every route, and the app writes the same string into `document.title`
 * during client-side navigation — so a shared route and a clicked route agree.
 * Change the rule here and both follow.
 */
import type { Project } from '../data/projects';
import { site } from '../data/site';

export const HOME_TITLE = `${site.name} — ${site.role}`;

const SUFFIX = ` | ${site.name}`;

/**
 * Descriptive when it stays readable, otherwise just the project name — a
 * title that gets truncated in a search result is worse than a short one.
 */
export function caseStudyTitle(project: Project) {
  const descriptive = `${project.title} — ${project.tagline}${SUFFIX}`;
  return descriptive.length <= 90 ? descriptive : `${project.title}${SUFFIX}`;
}
