import type { ReactNode } from 'react';

import { SectionHeading } from '@/components/section-heading';

/** Top band for inner pages: optional eyebrow, H1 and a one-line intro. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-border border-b px-4 pt-14 pb-12 sm:px-6 sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
        {children && (
          <div className="mt-8 flex flex-wrap gap-3">{children}</div>
        )}
      </div>
    </section>
  );
}
