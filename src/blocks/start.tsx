import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { Screenshot } from '@/components/screenshot';

export function Start() {
  const steps = [
    { title: m['pc.start.1.title'](), desc: m['pc.start.1.desc']() },
    { title: m['pc.start.2.title'](), desc: m['pc.start.2.desc']() },
    { title: m['pc.start.3.title'](), desc: m['pc.start.3.desc']() },
  ];
  return (
    <section className="bg-card border-border border-y px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <Screenshot
            name="tools"
            sizes="(min-width: 1024px) 640px, 100vw"
            alt={m['pc.common.screenshot_alt']({ what: m['pc.start.shot']() })}
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium text-balance sm:text-5xl">
            {m['pc.start.title']()}
          </h2>
          <ol className="mt-10 space-y-8">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 90}>
                <li className="border-brand border-l-2 pl-5">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground mt-1.5 leading-relaxed">
                    {s.desc}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Link
            href="/tutorials"
            className="text-brand mt-10 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            {m['pc.start.cta']()}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
