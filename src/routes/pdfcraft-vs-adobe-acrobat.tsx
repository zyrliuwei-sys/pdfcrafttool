import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { AcrobatCompare } from '@/blocks/acrobat-compare';
import { CTA } from '@/blocks/cta';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';

export const Route = createFileRoute('/pdfcraft-vs-adobe-acrobat')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['pc.cmp.meta_title']({}, { locale }),
      description: m['pc.cmp.meta_desc']({}, { locale }),
    };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({ ...loaderData, path: '/pdfcraft-vs-adobe-acrobat' })
      : {},
  component: ComparePage,
});

function ComparePage() {
  return (
    <>
      <Header />
      <main>
        <AcrobatCompare />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
