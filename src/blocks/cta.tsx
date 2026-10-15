import { ArrowRight, Download } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { buttonVariants } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-28">
      <div className="sheet-lift mx-auto max-w-6xl">
        <div className="sheet bg-accent px-6 py-16 text-center [--fold-size:56px] sm:px-12 sm:py-20">
          <h2 className="font-display mx-auto max-w-3xl text-[2.2rem] leading-[1.08] font-medium text-balance sm:text-6xl">
            {m['pc.cta.title']()}
          </h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-lg">
            {m['pc.cta.subtitle']()}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/download"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 gap-2 rounded-full px-7 text-base font-semibold'
              )}
            >
              <Download className="size-[18px]" />
              {m['pc.common.download']()}
            </Link>
            <Link
              href="/online"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-foreground/80 h-12 gap-2 rounded-full border-[1.5px] bg-transparent px-7 text-base font-semibold'
              )}
            >
              {m['pc.common.online']()}
              <ArrowRight className="size-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
