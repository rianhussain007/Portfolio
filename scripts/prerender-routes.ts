/**
 * Emits a real, crawlable HTML file for every project.
 *
 * The site is a single-page app: the case studies live behind a dialog that
 * only exists once JavaScript has run. That is fine for a human, and useless
 * for a link preview — LinkedIn, Slack, WhatsApp and every other crawler read
 * the `<head>` of a static file and never execute any script.
 *
 * This plugin runs after `vite build` and, for each project, copies the built
 * `index.html` with the block between the `route:meta` markers replaced by that
 * project's own title, description, canonical URL, Open Graph tags and
 * JSON-LD. It also injects a `<noscript>` summary so a client that runs no
 * JavaScript still gets the case study as text, and regenerates the sitemap
 * from the same data.
 *
 * The metadata markers in `index.html` are load-bearing: the build throws if
 * they are missing, so a silently wrong `<head>` cannot ship.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { categories, projects, type Project } from '../src/data/projects';
import { site } from '../src/data/site';
import { caseStudyTitle } from '../src/lib/seo';

const START = '<!-- route:meta:start';
const END = '<!-- route:meta:end -->';

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Trim to a meta-description length without cutting mid-word. */
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(' ');
  return `${cut.slice(0, space > max * 0.6 ? space : max).trimEnd()}…`;
}

function routeUrl(project: Project) {
  return `${site.url}/work/${project.slug}/`;
}

/** The whole per-route `<head>` region, replacing the homepage block. */
function metaBlock(project: Project, shareImage: string) {
  const url = routeUrl(project);
  const title = caseStudyTitle(project);
  const description = clip(`${project.tagline}. ${project.description}`, 205);
  const image = `${site.url}${shareImage}`;
  const imageAlt = `${project.title} — ${project.tagline}. A ${categories[
    project.category
  ].label.toLowerCase()} case study by ${site.name}.`;
  const repo = project.links.find(link => link.kind === 'repo')?.url;

  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: `${project.title} — ${project.tagline}`.slice(0, 110),
    description,
    url,
    inLanguage: 'en',
    image,
    author: { '@type': 'Person', name: site.name, url: `${site.url}/` },
    isPartOf: { '@type': 'WebSite', name: `${site.name} — ${site.role}`, url: `${site.url}/` },
    keywords: project.stack.slice(0, 10),
  };
  if (repo) jsonLd.codeRepository = repo;
  if (project.recognition) {
    jsonLd.award = `${project.recognition.designation} — ${project.recognition.event}, ${project.recognition.year}`;
  }

  return [
    `${START} -->`,
    `    <title>${esc(title)}</title>`,
    `    <meta name="description" content="${esc(description)}" />`,
    `    <link rel="canonical" href="${url}" />`,
    '    <meta property="og:type" content="article" />',
    `    <meta property="og:url" content="${url}" />`,
    `    <meta property="og:site_name" content="${esc(site.name)}" />`,
    `    <meta property="og:title" content="${esc(title)}" />`,
    `    <meta property="og:description" content="${esc(description)}" />`,
    `    <meta property="og:image" content="${image}" />`,
    '    <meta property="og:image:type" content="image/png" />',
    '    <meta property="og:image:width" content="1200" />',
    '    <meta property="og:image:height" content="630" />',
    `    <meta property="og:image:alt" content="${esc(imageAlt)}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${esc(title)}" />`,
    `    <meta name="twitter:description" content="${esc(description)}" />`,
    `    <meta name="twitter:image" content="${image}" />`,
    `    <script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`,
    END,
  ].join('\n');
}

/**
 * The same case study as plain text, for clients that never run JavaScript —
 * crawlers, AI readers, and anyone browsing with scripts off.
 */
function staticSummary(project: Project) {
  const heading = (label: string, body?: string) =>
    body ? `<h2>${esc(label)}</h2><p>${esc(body)}</p>` : '';
  const items = (label: string, list?: string[]) =>
    list && list.length > 0
      ? `<h2>${esc(label)}</h2><ul>${list.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`
      : '';

  const parts = [
    `<h1>${esc(project.title)}</h1>`,
    `<p><strong>${esc(project.tagline)}</strong></p>`,
    `<p>${esc(project.description)}</p>`,
    heading('Role', `${project.role} — ${project.period}`),
  ];

  if (project.recognition) {
    parts.push(
      `<p><strong>${esc(
        `${project.recognition.designation} — ${project.recognition.event}, ${project.recognition.year}`,
      )}</strong></p>`,
      `<p>${esc(project.recognition.detail)}</p>`,
    );
  }

  parts.push(
    heading('Problem', project.problem),
    heading('Approach', project.idea),
    heading('My contribution', project.contribution),
    items('What was built', project.built),
    heading('Challenges', project.challenges),
    heading('Current status', project.currentStatus),
    items('Highlights', project.outcomes),
    `<h2>Links</h2><ul>${project.links
      .map(link => `<li><a href="${esc(link.url)}">${esc(link.label)}</a></li>`)
      .join('')}</ul>`,
    `<p><a href="${site.url}/">Back to the portfolio</a></p>`,
  );

  return `<noscript><article>${parts.join('')}</article></noscript>`;
}

/**
 * The homepage as text: what a crawler that runs no JavaScript sees instead of
 * an empty `#root`. Kept deliberately small — it is a summary, not a duplicate.
 */
function homepageSummary() {
  const flagship = projects.filter(project => project.tier === 'flagship');
  const recognized = projects.find(project => project.recognition)?.recognition;

  const parts = [
    `<h1>${esc(site.name)}</h1>`,
    `<p><strong>${esc(site.role)}</strong></p>`,
    `<p>${esc(site.status)}</p>`,
    `<h2>Selected work</h2>`,
    `<ul>${flagship
      .map(
        project =>
          `<li><a href="${routeUrl(project)}">${esc(project.title)}</a> — ${esc(
            project.tagline,
          )}. ${esc(clip(project.description, 150))}</li>`,
      )
      .join('')}</ul>`,
  ];

  if (recognized) {
    parts.push(
      '<h2>Recognition</h2>',
      `<p>${esc(
        `${recognized.designation} — ${recognized.event}, ${recognized.year} (${recognized.category}).`,
      )}</p>`,
    );
  }

  parts.push(
    '<h2>Elsewhere</h2>',
    `<ul><li><a href="${site.github}">GitHub</a></li><li><a href="${site.linkedin}">LinkedIn</a></li><li><a href="mailto:${site.email}">${site.email}</a></li><li><a href="${site.url}/resume.pdf">Resume (PDF)</a></li></ul>`,
  );

  return `<noscript><article>${parts.join('')}</article></noscript>`;
}

function sitemap(today: string) {
  const entries = [
    { loc: `${site.url}/`, priority: '1.0' },
    ...projects.map(project => ({
      loc: routeUrl(project),
      priority: project.tier === 'flagship' ? '0.9' : '0.6',
    })),
  ];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.flatMap(entry => [
      '  <url>',
      `    <loc>${entry.loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${entry.priority}</priority>`,
      '  </url>',
    ]),
    '</urlset>',
    '',
  ].join('\n');
}

export function prerenderRoutes(): Plugin {
  let outDir = path.resolve('dist');
  let publicDir = path.resolve('public');

  return {
    name: 'rian-prerender-routes',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
      publicDir = config.publicDir;
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html');
      const source = fs.readFileSync(indexPath, 'utf8');

      const start = source.indexOf(START);
      const end = source.indexOf(END);
      if (start === -1 || end === -1) {
        throw new Error(
          `[prerender-routes] ${indexPath} is missing the "${START}" / "${END}" markers`,
        );
      }
      const sourceBlock = source.slice(start, end + END.length);

      /**
       * A card only ships if the file is actually there — a renamed or deleted
       * asset falls back to the site card instead of a broken preview.
       */
      const shareImageFor = (project: Project) => {
        if (!project.shareImage) return '/og-image.png';
        const onDisk = path.join(publicDir, project.shareImage.replace(/^\//, ''));
        if (fs.existsSync(onDisk)) return project.shareImage;
        console.warn(
          `[prerender-routes] ${project.shareImage} is missing — using the site card for ${project.slug}`,
        );
        return '/og-image.png';
      };

      const routes: string[] = [];
      for (const project of projects) {
        const html = source
          .replace(sourceBlock, metaBlock(project, shareImageFor(project)))
          .replace('<div id="root"></div>', `<div id="root"></div>\n    ${staticSummary(project)}`);

        const dir = path.join(outDir, 'work', project.slug);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), html);

        const written = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
        if (written.includes(sourceBlock) || !written.includes(`/work/${project.slug}/`)) {
          throw new Error(
            `[prerender-routes] /work/${project.slug}/ did not get its own metadata`,
          );
        }
        routes.push(`/work/${project.slug}/`);
      }

      // The homepage gets the same no-JavaScript treatment as a project route.
      fs.writeFileSync(
        indexPath,
        source.replace('<div id="root"></div>', `<div id="root"></div>\n    ${homepageSummary()}`),
      );

      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        sitemap(new Date().toISOString().slice(0, 10)),
      );

      console.log(`\n  prerendered ${routes.length} project routes + sitemap.xml`);
      for (const route of routes) console.log(`    ${route}`);
      console.log('');
    },
  };
}
