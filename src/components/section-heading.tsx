import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
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
        <p className="text-brand mb-3 text-sm font-bold tracking-wide">
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          'font-extrabold tracking-tight text-balance',
          Tag === 'h1'
            ? 'text-4xl leading-[1.08] sm:text-5xl lg:text-6xl'
            : 'text-3xl leading-tight sm:text-4xl lg:text-[44px]'
        )}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
}
