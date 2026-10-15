import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

export function Why() {
  const items = [
    { title: m['pc.why.1.title'](), desc: m['pc.why.1.desc']() },
    { title: m['pc.why.2.title'](), desc: m['pc.why.2.desc']() },
    { title: m['pc.why.3.title'](), desc: m['pc.why.3.desc']() },
    { title: m['pc.why.4.title'](), desc: m['pc.why.4.desc']() },
    { title: m['pc.why.5.title'](), desc: m['pc.why.5.desc']() },
    { title: m['pc.why.6.title'](), desc: m['pc.why.6.desc']() },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading title={m['pc.why.title']()} />
        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 80}>
              <li className="border-foreground border-t-2 pt-6">
                <span className="text-4xl font-extrabold tracking-tight">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
