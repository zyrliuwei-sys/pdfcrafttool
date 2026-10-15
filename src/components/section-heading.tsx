import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p className="text-brand mb-4 text-sm font-semibold">{eyebrow}</p>
      )}
      <Tag
        className={cn(
          'font-display font-medium text-balance',
          Tag === 'h1'
            ? 'text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-[4.25rem]'
            : 'text-[2rem] leading-[1.1] sm:text-[2.6rem] lg:text-5xl'
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
}
