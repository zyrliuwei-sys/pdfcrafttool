import { createFileRoute } from '@tanstack/react-router';

import { PDFCRAFT_VERSION } from '@/config/pdfcraft';
import { faqJsonLd, pageHead, pdfcraftAppJsonLd } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { downloadFaqItems, DownloadGuide } from '@/blocks/download-guide';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { ProjectNotice } from '@/blocks/project-notice';

export const Route = createFileRoute('/download')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['pc.dl.meta_title']({ version: PDFCRAFT_VERSION }, { locale }),
      description: m['pc.dl.meta_desc']({}, { locale }),
      faq: downloadFaqItems().map(({ q, a }) => ({ q, a })),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { faq, ...meta } = loaderData;
    return {
      ...pageHead({ ...meta, path: '/download' }),
      scripts: [pdfcraftAppJsonLd({ withRelease: true }), faqJsonLd(faq)],
    };
  },
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <>
      <Header />
      <main>
        <DownloadGuide notice={<ProjectNotice />} />
      </main>
      <Footer />
    </>
  );
}
