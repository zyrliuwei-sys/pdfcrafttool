import type { ReactNode } from 'react';

import { SectionHeading } from '@/components/section-heading';

/** Top band for inner pages: eyebrow + H1 + intro, on a soft tinted backdrop. */
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
    <section className="relative overflow-hidden px-4 pt-14 pb-12 sm:px-6 sm:pt-20 sm:pb-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_50%_0%,var(--brand-soft),transparent_70%)]"
      />
      <SectionHeading
        as="h1"
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />
      {children && (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {children}
        </div>
      )}
    </section>
  );
}
