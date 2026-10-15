import { Check, Minus, X } from 'lucide-react';

export type Mark = 'yes' | 'no' | 'partial';

export function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === 'yes')
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
        <Check className="size-4" strokeWidth={3} />
      </span>
    );
  if (mark === 'partial')
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
        <Minus className="size-4" strokeWidth={3} />
      </span>
    );
  return (
    <span className="bg-muted text-muted-foreground inline-flex size-6 items-center justify-center rounded-full">
      <X className="size-4" strokeWidth={3} />
    </span>
  );
}
