import { createFileRoute } from '@tanstack/react-router';

import { faqJsonLd, pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import {
  alternativesFaqItems,
  AlternativesGuide,
} from '@/blocks/alternatives-guide';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { ProjectNotice } from '@/blocks/project-notice';

export const Route = createFileRoute('/alternatives')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['pc.alt.meta_title']({}, { locale }),
      description: m['pc.alt.meta_desc']({}, { locale }),
      faq: alternativesFaqItems().map(({ q, a }) => ({ q, a })),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { faq, ...meta } = loaderData;
    return {
      ...pageHead({ ...meta, path: '/alternatives' }),
      scripts: [faqJsonLd(faq)],
    };
  },
  component: AlternativesPage,
});

function AlternativesPage() {
  return (
    <>
      <Header />
      <main>
        <AlternativesGuide notice={<ProjectNotice />} />
      </main>
      <Footer />
    </>
  );
}
