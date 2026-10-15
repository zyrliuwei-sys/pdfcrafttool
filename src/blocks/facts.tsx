import { m } from '@/paraglide/messages.js';

export function Facts() {
  const facts = [
    { value: m['pc.facts.1.value'](), label: m['pc.facts.1.label']() },
    { value: m['pc.facts.2.value'](), label: m['pc.facts.2.label']() },
    { value: m['pc.facts.3.value'](), label: m['pc.facts.3.label']() },
    { value: m['pc.facts.4.value'](), label: m['pc.facts.4.label']() },
  ];
  return (
    <section
      aria-label={m['pc.facts.label']()}
      className="px-4 pt-16 sm:px-6 sm:pt-20"
    >
      <dl className="border-foreground mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 border-t-2 pt-8 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="sr-only">{f.label}</dt>
            <dd className="font-display text-4xl font-medium tabular-nums sm:text-5xl">
              {f.value}
            </dd>
            <dd className="text-muted-foreground mt-2 max-w-[16rem] text-sm leading-snug">
              {f.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
