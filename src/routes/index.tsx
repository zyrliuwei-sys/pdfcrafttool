import { createFileRoute } from '@tanstack/react-router';

import { faqJsonLd, pageHead, pdfcraftAppJsonLd } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { About } from '@/blocks/about';
import { CompareTeaser } from '@/blocks/compare-teaser';
import { CTA } from '@/blocks/cta';
import { Facts } from '@/blocks/facts';
import { FAQ, faqItems } from '@/blocks/faq';
import { Features } from '@/blocks/features';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { Hero } from '@/blocks/hero';
import { Platforms } from '@/blocks/platforms';
import { ProjectNotice } from '@/blocks/project-notice';
import { QuickTools } from '@/blocks/quick-tools';
import { Start } from '@/blocks/start';
import { TryOnline } from '@/blocks/try-online';
import { Who } from '@/blocks/who';

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
      scripts: [pdfcraftAppJsonLd(), faqJsonLd(faq)],
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
        <ProjectNotice />
        <QuickTools />
        <Facts />
        <About />
        <TryOnline />
        <Features />
        <Platforms />
        <CompareTeaser />
        <Start />
        <Who />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
