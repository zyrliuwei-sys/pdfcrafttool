import { Check, Minus, X } from 'lucide-react';

export type Mark = 'yes' | 'no' | 'partial';

/** Supported / partial / missing marker for comparison tables. */
export function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === 'yes')
    return (
      <span className="bg-foreground text-background inline-flex size-6 items-center justify-center rounded-full">
        <Check className="size-3.5" strokeWidth={3} />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (mark === 'partial')
    return (
      <span className="border-foreground/70 text-foreground inline-flex size-6 items-center justify-center rounded-full border-[1.5px]">
        <Minus className="size-3.5" strokeWidth={3} />
        <span className="sr-only">Partial</span>
      </span>
    );
  return (
    <span className="text-muted-foreground/70 inline-flex size-6 items-center justify-center">
      <X className="size-4" strokeWidth={2} />
      <span className="sr-only">No</span>
    </span>
  );
}
