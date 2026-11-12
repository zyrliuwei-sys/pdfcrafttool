import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { baseLocale, locales, localizeUrl } from '@/paraglide/runtime.js';
import { getLocalPosts, getPostLocales } from '@/content/posts/catalog';

const STATIC_PATHS = [
  '',
  '/download',
  '/online',
  '/tutorials',
  '/pdfcraft-vs-adobe-acrobat',
  '/alternatives',
  '/privacy-policy',
  '/terms-of-service',
  '/about',
  '/blog',
];

type Entry = {
  path: string;
  availableLocales?: readonly string[];
  lastModified?: string;
  changeFrequency: string;
  priority: number;
};

function urlFor(path: string, locale: string): string {
  return localizeUrl(`${envConfigs.app_url}${path || '/'}`, {
    locale: locale as (typeof locales)[number],
  }).href;
}

// One <url> per language version, each listing every alternate (Google's
// recommended hreflang form) — so /zh pages are real <loc>s that crawlers and
// the IndexNow sitemap submit pick up, not just alternates of the en page.
function entryXml(e: Entry): string {
  const entryLocales = e.availableLocales ?? locales;
  const alternates = [
    ...entryLocales.map(
      (loc) =>
        `    <xhtml:link rel="alternate" hreflang="${loc}" href="${urlFor(e.path, loc)}"/>`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(e.path, baseLocale)}"/>`,
  ].join('\n');
  return entryLocales
    .map((loc) =>
      [
        '  <url>',
        `    <loc>${urlFor(e.path, loc)}</loc>`,
        alternates,
        e.lastModified ? `    <lastmod>${e.lastModified}</lastmod>` : null,
        `    <changefreq>${e.changeFrequency}</changefreq>`,
        `    <priority>${e.priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n');
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = STATIC_PATHS.map((path) => ({
          path,
          changeFrequency: path === '/blog' ? 'daily' : 'weekly',
          priority: path === '' ? 1 : 0.8,
        }));

        const localPosts = getLocalPosts(baseLocale);
        entries.push({
          path: '/contact',
          availableLocales: ['en'],
          changeFrequency: 'monthly',
          priority: 0.5,
        });
        for (const post of localPosts) {
          entries.push({
            path: `/blog/${post.slug}`,
            availableLocales: getPostLocales(post.slug),
            lastModified: post.createdAt,
            changeFrequency: 'monthly',
            priority: 0.7,
          });
        }
        // Database posts override local posts with the same slug, as in the blog.
        // Template demo posts are absent from the published catalog.
        try {
          const { listPublishedArticles } =
            await import('@/modules/posts/service');
          const rows = await listPublishedArticles().catch(() => []);
          for (const post of rows) {
            const existing = entries.find(
              (entry) => entry.path === `/blog/${post.slug}`
            );
            const lastModified = new Date(post.createdAt).toISOString();
            if (existing) existing.lastModified = lastModified;
            else
              entries.push({
                path: `/blog/${post.slug}`,
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.6,
              });
          }
        } catch {
          // Database unreachable — keep the static project pages.
        }

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
          ...entries.map(entryXml),
          '</urlset>',
          '',
        ].join('\n');

        return new Response(xml, {
          headers: { 'Content-Type': 'application/xml' },
        });
      },
    },
  },
});
