import { envConfigs } from '@/config';
import { locales, localizeUrl } from '@/paraglide/runtime.js';

/** Route `head` for a public page: title/description/OG + canonical + hreflang. */
export function pageHead({
  title,
  description,
  path,
  locale,
}: {
  title: string;
  description: string;
  /** Locale-free path, e.g. "/download" ("/" for home). */
  path: string;
  locale: string;
}) {
  const urlFor = (loc: string) =>
    localizeUrl(`${envConfigs.app_url}${path}`, {
      locale: loc as (typeof locales)[number],
    }).href;
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: urlFor(locale) },
      { property: 'og:site_name', content: envConfigs.app_name },
      { property: 'og:image', content: `${envConfigs.app_url}/og.jpg` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: `${envConfigs.app_url}/og.jpg` },
    ],
    links: [
      { rel: 'canonical', href: urlFor(locale) },
      ...locales.map((loc) => ({
        rel: 'alternate',
        hrefLang: loc,
        href: urlFor(loc),
      })),
      { rel: 'alternate', hrefLang: 'x-default', href: urlFor('en') },
    ],
  };
}
