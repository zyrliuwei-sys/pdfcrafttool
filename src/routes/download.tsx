import { createFileRoute } from '@tanstack/react-router';

import { PDFCRAFT_VERSION } from '@/config/pdfcraft';
import { pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { DownloadGuide } from '@/blocks/download-guide';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';

export const Route = createFileRoute('/download')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['pc.dl.meta_title']({ version: PDFCRAFT_VERSION }, { locale }),
      description: m['pc.dl.meta_desc']({}, { locale }),
    };
  },
  head: ({ loaderData }) =>
    loaderData ? pageHead({ ...loaderData, path: '/download' }) : {},
  component: DownloadPage,
});

function DownloadPage() {
  return (
    <>
      <Header />
      <main>
        <DownloadGuide />
      </main>
      <Footer />
    </>
  );
}
