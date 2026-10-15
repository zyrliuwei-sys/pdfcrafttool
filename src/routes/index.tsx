import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import {
  PDFCRAFT_OFFICIAL,
  PDFCRAFT_REPO,
  PDFCRAFT_VERSION,
} from '@/config/pdfcraft';
import { pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { CompareTeaser } from '@/blocks/compare-teaser';
import { CTA } from '@/blocks/cta';
import { FAQ, faqItems } from '@/blocks/faq';
import { Features } from '@/blocks/features';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { Hero } from '@/blocks/hero';
import { Platforms } from '@/blocks/platforms';
import { TutorialsTeaser } from '@/blocks/tutorials-teaser';
import { Why } from '@/blocks/why';

export const Route = createFileRoute('/')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['common.metadata.title']({}, { locale }),
      description: m['common.metadata.description']({}, { locale }),
      faq: faqItems().map(({ q, a }) => ({ q, a })),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { locale, title, description, faq } = loaderData;
    return {
      ...pageHead({ title, description, path: '/', locale }),
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'PdfCraft',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Windows, macOS, Linux, FreeBSD, Web',
            softwareVersion: PDFCRAFT_VERSION,
            license: 'https://opensource.org/licenses/MIT',
            url: PDFCRAFT_OFFICIAL,
            downloadUrl: `${envConfigs.app_url}/download`,
            codeRepository: PDFCRAFT_REPO,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          }),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Platforms />
        <CompareTeaser />
        <TutorialsTeaser />
        <Why />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
