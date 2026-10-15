import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { CTA } from '@/blocks/cta';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { TutorialsGuide } from '@/blocks/tutorials-guide';

export const Route = createFileRoute('/tutorials')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['pc.tut.meta_title']({}, { locale }),
      description: m['pc.tut.meta_desc']({}, { locale }),
    };
  },
  head: ({ loaderData }) =>
    loaderData ? pageHead({ ...loaderData, path: '/tutorials' }) : {},
  component: TutorialsPage,
});

function TutorialsPage() {
  return (
    <>
      <Header />
      <main>
        <TutorialsGuide />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
