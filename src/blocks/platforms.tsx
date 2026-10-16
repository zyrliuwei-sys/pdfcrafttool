import { ArrowRight, Download } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { DOWNLOADS, PLATFORM_IDS, PLATFORM_NAMES } from '@/config/pdfcraft';
import { m } from '@/paraglide/messages.js';
import { PlatformIcon } from '@/components/platform-icon';
import { Reveal } from '@/components/reveal';

export function Platforms() {
  return (
    <section className="bg-card border-border border-y px-4 py-24 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium text-balance sm:text-5xl">
            {m['pc.platforms.title']()}
          </h2>
          <p className="text-muted-foreground mt-6 text-[17px] leading-[1.75]">
            {m['pc.platforms.body']()}
          </p>
          <p className="text-muted-foreground mt-4 text-sm">
            {m['pc.hero.dl_note']()}
          </p>
          <Link
            href="/download"
            className="text-brand mt-8 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            {m['pc.platforms.cta']()}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
        <ul className="min-w-0 self-center">
          {PLATFORM_IDS.map((id, i) => {
            const rec = DOWNLOADS[id].find((a) => a.recommended)!;
            return (
              <Reveal key={id} delay={i * 50}>
                <li className="border-border flex items-center gap-5 border-b py-5">
                  <PlatformIcon
                    platform={id}
                    className="text-muted-foreground size-6 shrink-0"
                  />
                  <a href={rec.url} className="group min-w-0 flex-1">
                    <span className="font-display group-hover:text-brand block text-xl font-medium transition">
                      {PLATFORM_NAMES[id]}
                    </span>
                    <span className="text-muted-foreground block truncate text-sm">
                      {rec.label}, {rec.sizeMb} MB
                    </span>
                  </a>
                  <Link
                    href={`/download#${id}`}
                    className="text-muted-foreground hover:text-foreground hidden text-sm underline-offset-4 hover:underline sm:inline"
                  >
                    {m['pc.dl.guide']()}
                  </Link>
                  <a
                    href={rec.url}
                    aria-label={m['pc.dl.for']({
                      platform: PLATFORM_NAMES[id],
                    })}
                    className="text-foreground/50 hover:text-brand transition"
                  >
                    <Download className="size-5" />
                  </a>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
