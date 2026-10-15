import { ArrowRight, Download } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { PDFCRAFT_VERSION } from '@/config/pdfcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { AppMockup } from '@/components/app-mockup';
import { buttonVariants } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft paper-red glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(60%_60%_at_80%_10%,var(--brand-soft),transparent_70%),radial-gradient(50%_50%_at_10%_0%,var(--accent),transparent_70%)]"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:pt-24 lg:pb-24">
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="bg-brand inline-flex size-9 items-center justify-center rounded-lg text-lg font-extrabold text-white">
              P
            </span>
            <span className="text-sm font-bold">{m['pc.hero.eyebrow']()}</span>
            <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-medium">
              {m['pc.common.version']({ version: PDFCRAFT_VERSION })}
            </span>
          </div>
          <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-[64px]">
            {m['pc.hero.title']()}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
            {m['pc.hero.subtitle']()}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/download"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 gap-2 rounded-full px-6 text-base font-semibold'
              )}
            >
              <Download className="size-5" />
              {m['pc.hero.primary']()}
            </Link>
            <Link
              href="/online"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-foreground h-12 gap-2 rounded-full border-2 px-6 text-base font-semibold'
              )}
            >
              {m['pc.hero.secondary']()}
              <ArrowRight className="size-5" />
            </Link>
          </div>
          <p className="text-muted-foreground mt-5 text-sm">
            {m['pc.hero.note']()}
          </p>
        </div>
        <AppMockup
          fileName={m['pc.mock.file']()}
          searchLabel={m['pc.mock.search']()}
          matchesLabel={m['pc.mock.matches']()}
          pagesLabel={m['pc.mock.pages']()}
          statusLabel={m['pc.mock.saved']()}
        />
      </div>
    </section>
  );
}
