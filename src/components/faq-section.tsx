import { Fragment, type ReactNode } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Bare domains/paths written in answer text, e.g. "github.com/storytold/pdfcraft".
const LINKABLE =
  /((?:github\.com|getartcraft\.com|adobe\.com|pdfsam\.org)(?:\/[\w.\-/]*[\w])?)/g;

/**
 * Renders plain text with known domains turned into links. The text content is
 * unchanged, so FAQPage JSON-LD built from the same string still matches.
 */
export function Linkified({ text }: { text: string }) {
  const parts = text.split(LINKABLE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={`https://${part}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

/** Accordion FAQ. Pass the same items to faqJsonLd() in the route head. */
export function FaqSection({
  id = 'faq',
  title,
  items,
  className = 'bg-card border-border border-t',
}: {
  id?: string;
  title: ReactNode;
  items: { q: string; a: string }[];
  className?: string;
}) {
  return (
    <section id={id} className={`px-4 py-24 sm:px-6 sm:py-32 ${className}`}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <h2 className="font-display text-[2rem] leading-[1.1] font-medium text-balance sm:text-5xl lg:sticky lg:top-28 lg:self-start">
          {title}
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
                  <Linkified text={item.a} />
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
