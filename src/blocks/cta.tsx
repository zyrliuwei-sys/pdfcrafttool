import { ArrowRight, Download } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';

export function CTA() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="bg-brand relative mx-auto max-w-7xl overflow-hidden rounded-[32px] px-6 py-16 text-center text-white sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-80 rotate-12 rounded-3xl bg-white/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-16 size-72 -rotate-6 rounded-3xl bg-black/10"
        />
        <h2 className="relative text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {m['pc.cta.title']()}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">
          {m['pc.cta.subtitle']()}
        </p>
        <div className="relative mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/download"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-black transition-opacity hover:opacity-90"
          >
            <Download className="size-5" />
            {m['pc.common.download_free']()}
          </Link>
          <Link
            href="/online"
            className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-white px-6 font-semibold text-white transition-colors hover:bg-white/10"
          >
            {m['pc.common.open_online']()}
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
