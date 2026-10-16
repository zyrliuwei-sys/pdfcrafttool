import { useState } from 'react';
import { Maximize2, Play } from 'lucide-react';

import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';

/**
 * Inline PdfCraft Online. A click-to-load facade keeps the ~13 MB (compressed) app off the
 * initial page weight; clicking swaps in the real WebAssembly app.
 */
export function TryOnline() {
  const src = envConfigs.pdfcraft_web_url;
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="try" className="scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.try.title']()}
          </h2>
          <p className="text-muted-foreground mt-6 text-[17px] leading-[1.75]">
            {m['pc.try.body']()}
          </p>
        </div>

        <div className="sheet-lift mt-10">
          <div className="sheet relative overflow-hidden [--fold-size:44px]">
            {loaded && src ? (
              <iframe
                src={src}
                title={m['pc.online.frame_title']()}
                className="block h-[72vh] min-h-[480px] w-full border-0 bg-[#f1f1f3] dark:bg-[#19191c]"
                allow="fullscreen; clipboard-read; clipboard-write"
                allowFullScreen
              />
            ) : (
              <div className="relative">
                <img
                  src="/imgs/pdfcraft/tools-1600.webp"
                  srcSet="/imgs/pdfcraft/tools-800.webp 800w, /imgs/pdfcraft/tools-1600.webp 1600w"
                  sizes="(min-width: 1200px) 1152px, 100vw"
                  width={1600}
                  height={1000}
                  alt={m['pc.common.screenshot_alt']({
                    what: m['pc.try.shot'](),
                  })}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full opacity-60 blur-[1px]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                  {src ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setLoaded(true)}
                        className="bg-primary text-primary-foreground inline-flex h-14 items-center gap-2.5 rounded-full px-8 text-base font-semibold shadow-lg transition hover:opacity-90"
                      >
                        <Play className="size-5 fill-current" />
                        {m['pc.try.load']()}
                      </button>
                      <span className="bg-background/90 rounded-full px-3 py-1 text-sm">
                        {m['pc.try.size']()}
                      </span>
                    </>
                  ) : (
                    <p className="bg-background/95 max-w-md rounded-lg p-5 text-sm leading-relaxed">
                      {m['pc.try.unavailable']()}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {loaded && src && (
          <a
            href={src}
            target="_blank"
            rel="noopener"
            className="text-brand mt-5 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            <Maximize2 className="size-4" />
            {m['pc.try.fullscreen']()}
          </a>
        )}
      </div>
    </section>
  );
}
