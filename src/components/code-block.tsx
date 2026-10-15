import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Monospace snippet with a copy button. */
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="bg-foreground text-background relative max-w-full min-w-0 rounded-lg font-mono text-[13px]">
      <pre className="overflow-x-auto p-5 pr-14 leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        aria-label="Copy"
        onClick={() => {
          navigator.clipboard?.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          });
        }}
        className="text-background/60 hover:text-background hover:bg-background/10 absolute top-3 right-3 rounded-md p-2 transition"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}
