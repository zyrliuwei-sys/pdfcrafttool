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
  ];
}

export function FAQ() {
  const items = faqItems();
  return (
    <section id="faq" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">
          {m['pc.faq.title']()}
        </h2>
        <Accordion className="mt-12">
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
