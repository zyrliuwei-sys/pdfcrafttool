import { useState } from 'react';
import { Download, Info, Maximize2, MonitorDown } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { DOWNLOADS } from '@/config/pdfcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { PageHero } from '@/components/page-hero';
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
        eyebrow={m['pc.common.free_badge']()}
        title={m['pc.online.title']()}
        subtitle={m['pc.online.subtitle']()}
      />

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {src ? (
            <>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground font-medium">
                    {m['pc.online.renderer']()}
                  </span>
                  <div className="bg-muted flex gap-1 rounded-full p-1">
                    {renderers.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRenderer(r.id)}
                        aria-pressed={renderer === r.id}
                        className={cn(
                          'rounded-full px-3 py-1 text-xs font-semibold transition',
                          renderer === r.id
                            ? 'bg-background shadow'
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
                    'h-9 gap-2 rounded-full px-4 font-semibold'
                  )}
                >
                  <Maximize2 className="size-4" />
                  {m['pc.online.fullscreen']()}
                </a>
              </div>
              <div className="border-border overflow-hidden rounded-2xl border shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)]">
                <iframe
                  key={src}
                  src={src}
                  title={m['pc.online.frame_title']()}
                  className="block h-[78vh] min-h-[520px] w-full border-0 bg-[#f1f1f3] dark:bg-[#19191c]"
                  allow="fullscreen; clipboard-read; clipboard-write"
                  allowFullScreen
                />
              </div>
              <p className="text-muted-foreground mt-3 flex items-center gap-2 text-xs">
                <Info className="size-3.5" />
                {m['pc.online.loading']()}
              </p>
            </>
          ) : (
            <div className="border-border bg-card mx-auto max-w-3xl rounded-3xl border p-10 text-center">
              <MonitorDown className="text-brand mx-auto size-10" />
              <h2 className="mt-5 text-2xl font-bold">
                {m['pc.online.unavailable_title']()}
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-lg leading-relaxed">
                {m['pc.online.unavailable_desc']()}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/download"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-12 gap-2 rounded-full px-6 font-semibold'
                  )}
                >
                  <Download className="size-5" />
                  {m['pc.common.download_free']()}
                </Link>
                <a
                  href={DOWNLOADS.web[0].url}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'h-12 rounded-full px-6 font-semibold'
                  )}
                >
                  {DOWNLOADS.web[0].label}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-muted/60 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {m['pc.online.tips_title']()}
            </h2>
            <ul className="mt-6 space-y-4">
              {tips.map((tip, i) => (
                <li key={i} className="flex gap-4">
                  <span className="bg-brand mt-2 size-2 shrink-0 rounded-full" />
                  <p className="leading-relaxed">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink rounded-3xl p-8 text-white">
            <MonitorDown className="size-7" />
            <h2 className="mt-4 text-xl font-bold">
              {m['pc.online.desktop_title']()}
            </h2>
            <p className="mt-2 leading-relaxed text-white/70">
              {m['pc.online.desktop_desc']()}
            </p>
            <Link
              href="/download"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 font-semibold text-black transition-opacity hover:opacity-90"
            >
              <Download className="size-4" />
              {m['pc.common.download_free']()}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
