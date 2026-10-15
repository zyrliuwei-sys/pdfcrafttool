import { ShieldCheck } from 'lucide-react';

import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

function Shot({ name, alt }: { name: string; alt: string }) {
  return (
    <img
      src={`/imgs/pdfcraft/${name}-1600.webp`}
      srcSet={`/imgs/pdfcraft/${name}-800.webp 800w, /imgs/pdfcraft/${name}-1600.webp 1600w`}
      sizes="(min-width: 768px) 60vw, 100vw"
      width={1600}
      height={1000}
      alt={m['pc.common.screenshot_alt']({ what: alt })}
      loading="lazy"
      decoding="async"
      className="border-border block h-full w-full rounded-tl-md border border-r-0 border-b-0 object-cover object-left-top"
    />
  );
}

export function Features() {
  const cells: {
    title: string;
    desc: string;
    shot?: { name: string; alt: string };
    span: string;
    tone: string;
  }[] = [
    {
      title: m['pc.features.organize.title'](),
      desc: m['pc.features.organize.desc'](),
      shot: { name: 'organize', alt: m['pc.features.shot.organize']() },
      span: 'md:col-span-7',
      tone: 'bg-card',
    },
    {
      title: m['pc.features.find.title'](),
      desc: m['pc.features.find.desc'](),
      shot: { name: 'find', alt: m['pc.features.shot.find']() },
      span: 'md:col-span-5',
      tone: 'bg-accent',
    },
    {
      title: m['pc.features.forms.title'](),
      desc: m['pc.features.forms.desc'](),
      shot: { name: 'forms', alt: m['pc.features.shot.forms']() },
      span: 'md:col-span-5',
      tone: 'bg-secondary',
    },
    {
      title: m['pc.features.scripts.title'](),
      desc: m['pc.features.scripts.desc'](),
      shot: { name: 'scripts', alt: m['pc.features.shot.scripts']() },
      span: 'md:col-span-7',
      tone: 'bg-card',
    },
  ];

  return (
    <section id="features" className="px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={m['pc.features.title']()}
          subtitle={m['pc.features.subtitle']()}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-12">
          {cells.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 90} className={c.span}>
              <article
                className={cn(
                  'flex h-full flex-col overflow-hidden rounded-lg',
                  c.tone
                )}
              >
                <div className="p-7 pb-6 sm:p-9 sm:pb-7">
                  <h3 className="font-display text-2xl font-medium sm:text-[1.7rem]">
                    {c.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 max-w-md leading-relaxed">
                    {c.desc}
                  </p>
                </div>
                {c.shot && (
                  <div className="mt-auto h-[240px] pl-7 sm:h-[320px] sm:pl-9">
                    <Shot name={c.shot.name} alt={c.shot.alt} />
                  </div>
                )}
              </article>
            </Reveal>
          ))}
          <Reveal className="md:col-span-12">
            <article className="sheet flex flex-col gap-6 p-7 [--fold-size:36px] sm:flex-row sm:items-center sm:gap-10 sm:p-10">
              <ShieldCheck
                className="text-brand size-10 shrink-0"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-display text-2xl font-medium sm:text-[1.7rem]">
                  {m['pc.features.private.title']()}
                </h3>
                <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  {m['pc.features.private.desc']()}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
