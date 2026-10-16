import { createFileRoute } from '@tanstack/react-router';

import { faqJsonLd, pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { OnlineApp, onlineFaqItems } from '@/blocks/online-app';

export const Route = createFileRoute('/online')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['pc.online.meta_title']({}, { locale }),
      description: m['pc.online.meta_desc']({}, { locale }),
      faq: onlineFaqItems().map(({ q, a }) => ({ q, a })),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { faq, ...meta } = loaderData;
    return {
      ...pageHead({ ...meta, path: '/online' }),
      scripts: [faqJsonLd(faq)],
    };
  },
  component: OnlinePage,
});

function OnlinePage() {
  return (
    <>
      <Header />
      <main>
        <OnlineApp />
      </main>
      <Footer />
    </>
  );
}
