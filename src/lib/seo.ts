import { envConfigs } from '@/config';
import {
  PDFCRAFT_OFFICIAL,
  PDFCRAFT_RELEASE_DATE,
  PDFCRAFT_RELEASES,
  PDFCRAFT_REPO,
  PDFCRAFT_VERSION,
} from '@/config/pdfcraft';
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

export type FaqItem = { q: string; a: string };

/**
 * FAQPage JSON-LD. Pass the exact strings the page renders: Google requires
 * the marked-up answers to match the visible text.
 */
export function faqJsonLd(items: FaqItem[]) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    }),
  };
}

/**
 * SoftwareApplication JSON-LD describing the upstream PdfCraft app
 * (github.com/storytold/pdfcraft). Every value comes from src/config/pdfcraft.ts.
 */
export function pdfcraftAppJsonLd({
  withRelease,
}: { withRelease?: boolean } = {}) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'PdfCraft',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows, macOS, Linux, FreeBSD',
      softwareVersion: PDFCRAFT_VERSION,
      ...(withRelease
        ? {
            datePublished: PDFCRAFT_RELEASE_DATE,
            releaseNotes: PDFCRAFT_RELEASES,
          }
        : {}),
      license: 'https://opensource.org/licenses/MIT',
      url: PDFCRAFT_OFFICIAL,
      sameAs: [PDFCRAFT_REPO],
      author: {
        '@type': 'Organization',
        name: 'ArtCraft',
        url: 'https://getartcraft.com',
      },
      screenshot: `${envConfigs.app_url}/imgs/pdfcraft/viewer-1600.webp`,
      downloadUrl: `${PDFCRAFT_RELEASES}/tag/v${PDFCRAFT_VERSION}`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    }),
  };
}
