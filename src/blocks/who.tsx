import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

export function Who() {
  const items = [
    { title: m['pc.who.1.title'](), desc: m['pc.who.1.desc']() },
    { title: m['pc.who.2.title'](), desc: m['pc.who.2.desc']() },
    { title: m['pc.who.3.title'](), desc: m['pc.who.3.desc']() },
    { title: m['pc.who.4.title'](), desc: m['pc.who.4.desc']() },
  ];
  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={m['pc.who.title']()} />
        <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={(i % 2) * 90}>
              <h3 className="font-display text-2xl font-medium">{it.title}</h3>
              <p className="text-muted-foreground mt-3 max-w-md text-[17px] leading-relaxed">
                {it.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
