import { useState } from 'react';
import { Download, Maximize2, MonitorDown } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { DOWNLOADS } from '@/config/pdfcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { PageHero } from '@/components/page-hero';
import { Screenshot } from '@/components/screenshot';
import { buttonVariants } from '@/components/ui/button';

type Renderer = 'auto' | 'webgl' | 'cpu';

function appUrl(base: string, renderer: Renderer) {
  if (renderer === 'auto') return base;
  return `${base}${base.includes('?') ? '&' : '?'}${renderer}`;
}

export function OnlineApp() {
  const base = envConfigs.pdfcraft_web_url;
  const [renderer, setRenderer] = useState<Renderer>('auto');
  const src = base ? appUrl(base, renderer) : '';

  const renderers: { id: Renderer; label: string }[] = [
    { id: 'auto', label: m['pc.online.renderer_auto']() },
    { id: 'webgl', label: m['pc.online.renderer_webgl']() },
    { id: 'cpu', label: m['pc.online.renderer_cpu']() },
  ];

  const tips = [
    m['pc.online.tip1'](),
    m['pc.online.tip2'](),
    m['pc.online.tip3'](),
    m['pc.online.tip4'](),
    m['pc.online.tip5'](),
  ];

  return (
    <>
      <PageHero
        title={m['pc.online.title']()}
        subtitle={m['pc.online.subtitle']()}
      />

      <section className="px-4 pt-10 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {src ? (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div
                  role="group"
                  aria-label={m['pc.online.renderer']()}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-muted-foreground font-medium">
                    {m['pc.online.renderer']()}
                  </span>
                  <div className="border-border flex rounded-full border p-0.5">
                    {renderers.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRenderer(r.id)}
                        aria-pressed={renderer === r.id}
                        className={cn(
                          'rounded-full px-3.5 py-1 text-xs font-semibold transition',
                          renderer === r.id
                            ? 'bg-foreground text-background'
                            : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-9 gap-2 rounded-full bg-transparent px-4 font-semibold'
                  )}
                >
                  <Maximize2 className="size-4" />
                  {m['pc.online.fullscreen']()}
                </a>
              </div>
              <div className="sheet-lift">
                <div className="sheet overflow-hidden [--fold-size:40px]">
                  <iframe
                    key={src}
                    src={src}
                    title={m['pc.online.frame_title']()}
                    className="block h-[78vh] min-h-[520px] w-full border-0 bg-[#f1f1f3] dark:bg-[#19191c]"
                    allow="fullscreen; clipboard-read; clipboard-write"
                    allowFullScreen
                  />
                </div>
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                {m['pc.online.loading']()}
              </p>
            </>
          ) : (
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h2 className="font-display text-3xl font-medium sm:text-4xl">
                  {m['pc.online.unavailable_title']()}
                </h2>
                <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                  {m['pc.online.unavailable_desc']()}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/download"
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'h-12 gap-2 rounded-full px-7 font-semibold'
                    )}
                  >
                    <Download className="size-[18px]" />
                    {m['pc.common.download']()}
                  </Link>
                  <a
                    href={DOWNLOADS.web[0].url}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'h-12 rounded-full bg-transparent px-6 font-semibold'
                    )}
                  >
                    {DOWNLOADS.web[0].label}
                  </a>
                </div>
              </div>
              <Screenshot
                name="tools"
                alt={m['pc.common.screenshot_alt']({
                  what: m['pc.start.shot'](),
                })}
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
          )}
        </div>
      </section>

      <section className="bg-card border-border border-y px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.online.about_title']()}
          </h2>
          <div className="mt-8 gap-12 text-[17px] leading-[1.75] md:columns-2">
            <p className="mb-6">{m['pc.online.about_p1']()}</p>
            <p className="text-muted-foreground">{m['pc.online.about_p2']()}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              {m['pc.online.tips_title']()}
            </h2>
            <ul className="mt-8 space-y-5">
              {tips.map((tip) => (
                <li
                  key={tip}
                  className="border-brand border-l-2 pl-5 leading-relaxed"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="sheet-lift self-start">
            <div className="sheet bg-accent p-8 [--fold-size:32px]">
              <MonitorDown className="text-brand size-8" strokeWidth={1.5} />
              <h2 className="font-display mt-4 text-2xl font-medium">
                {m['pc.online.desktop_title']()}
              </h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {m['pc.online.desktop_desc']()}
              </p>
              <Link
                href="/download"
                className={cn(
                  buttonVariants(),
                  'mt-6 h-11 gap-2 rounded-full px-5 font-semibold'
                )}
              >
                <Download className="size-4" />
                {m['pc.common.download']()}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
