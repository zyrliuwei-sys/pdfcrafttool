import { ArrowRight, Download } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { Screenshot } from '@/components/screenshot';
import { buttonVariants } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="px-4 pt-14 sm:px-6 sm:pt-20 lg:pt-24">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-brand mb-5 text-sm font-semibold">
          {m['pc.hero.eyebrow']()}
        </p>
        <h1 className="font-display mx-auto max-w-4xl text-[2.6rem] leading-[1.05] font-medium text-balance sm:text-6xl lg:text-[4.5rem]">
          {m['pc.hero.title_pre']()}
          <span className="annot italic">{m['pc.hero.title_mark']()}</span>
          {m['pc.hero.title_post']()}
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty sm:text-xl">
          {m['pc.hero.subtitle']()}
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
      <div className="mx-auto mt-14 max-w-6xl sm:mt-16">
        <Screenshot
          name="viewer"
          priority
          sizes="(min-width: 1200px) 1152px, 100vw"
          alt={m['pc.common.screenshot_alt']({ what: m['pc.hero.shot']() })}
          frameClassName="[--fold-size:44px]"
        />
      </div>
    </section>
  );
}
