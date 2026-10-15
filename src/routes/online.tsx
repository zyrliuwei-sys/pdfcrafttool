import { createFileRoute } from '@tanstack/react-router';

import { pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { OnlineApp } from '@/blocks/online-app';

export const Route = createFileRoute('/online')({
  loader: () => {
    const locale = getLocale();
    return {
      locale,
      title: m['pc.online.meta_title']({}, { locale }),
      description: m['pc.online.meta_desc']({}, { locale }),
    };
  },
  head: ({ loaderData }) =>
    loaderData ? pageHead({ ...loaderData, path: '/online' }) : {},
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
