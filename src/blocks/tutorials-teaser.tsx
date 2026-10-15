import { ArrowRight, ArrowUpRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

export function TutorialsTeaser() {
  const items = [
    {
      id: 'open',
      title: m['pc.tut.open.title'](),
      desc: m['pc.tut.open.intro'](),
    },
    {
      id: 'organize',
      title: m['pc.tut.organize.title'](),
      desc: m['pc.tut.organize.intro'](),
    },
    {
      id: 'combine',
      title: m['pc.tut.combine.title'](),
      desc: m['pc.tut.combine.intro'](),
    },
  ];

  return (
    <section className="bg-muted/60 px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            title={m['pc.home_tutorials.title']()}
            subtitle={m['pc.home_tutorials.subtitle']()}
          />
          <Link
            href="/tutorials"
            className="text-primary inline-flex shrink-0 items-center gap-1.5 font-semibold hover:underline"
          >
            {m['pc.home_tutorials.cta']()}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <Link
                href={`/tutorials#${item.id}`}
                className="group bg-background border-border flex h-full flex-col rounded-3xl border p-8 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-brand text-sm font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2 flex-1 leading-relaxed">
                  {item.desc}
                </p>
                <ArrowUpRight className="text-muted-foreground group-hover:text-foreground mt-6 size-5 transition" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
