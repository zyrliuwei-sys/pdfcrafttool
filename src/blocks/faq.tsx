import { m } from '@/paraglide/messages.js';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function faqItems() {
  return [
    { q: m['pc.faq.q1'](), a: m['pc.faq.a1']() },
    { q: m['pc.faq.q2'](), a: m['pc.faq.a2']() },
    { q: m['pc.faq.q3'](), a: m['pc.faq.a3']() },
    { q: m['pc.faq.q4'](), a: m['pc.faq.a4']() },
    { q: m['pc.faq.q5'](), a: m['pc.faq.a5']() },
    { q: m['pc.faq.q6'](), a: m['pc.faq.a6']() },
    { q: m['pc.faq.q7'](), a: m['pc.faq.a7']() },
    { q: m['pc.faq.q8'](), a: m['pc.faq.a8']() },
    { q: m['pc.faq.q9'](), a: m['pc.faq.a9']() },
    { q: m['pc.faq.q10'](), a: m['pc.faq.a10']() },
    { q: m['pc.faq.q11'](), a: m['pc.faq.a11']() },
  ];
}

export function FAQ() {
  const items = faqItems();
  return (
    <section
      id="faq"
      className="bg-card border-border border-t px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <h2 className="font-display text-[2rem] leading-[1.1] font-medium text-balance sm:text-5xl lg:sticky lg:top-28 lg:self-start">
          {m['pc.faq.title']()}
        </h2>
        <Accordion hiddenUntilFound>
          {items.map((item) => (
            <AccordionItem
              key={item.q}
              value={item.q}
              className="border-border border-b"
            >
              <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline sm:text-lg">
                {item.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {item.a}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
