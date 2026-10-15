import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { DOWNLOADS, PLATFORM_IDS, PLATFORM_NAMES } from '@/config/pdfcraft';
import { m } from '@/paraglide/messages.js';
import { PlatformIcon } from '@/components/platform-icon';
import { Reveal } from '@/components/reveal';

export function Platforms() {
  return (
    <section className="px-4 sm:px-6">
      <div className="bg-ink mx-auto max-w-7xl overflow-hidden rounded-[32px] px-6 py-16 text-white sm:px-12 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-balance sm:text-4xl">
              {m['pc.platforms.title']()}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              {m['pc.platforms.subtitle']()}
            </p>
            <Link
              href="/download"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-black transition-opacity hover:opacity-90"
            >
              {m['pc.platforms.cta']()}
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PLATFORM_IDS.map((id, i) => (
              <Reveal key={id} delay={i * 60}>
                <Link
                  href={`/download#${id}`}
                  className="group flex h-full flex-col gap-6 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10 transition hover:bg-white/[0.12]"
                >
                  <PlatformIcon platform={id} className="size-7 text-white" />
                  <div>
                    <p className="font-bold">{PLATFORM_NAMES[id]}</p>
                    <p className="mt-1 text-xs text-white/60">
                      {DOWNLOADS[id].find((a) => a.recommended)?.label}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
