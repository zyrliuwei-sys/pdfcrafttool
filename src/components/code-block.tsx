import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Monospace snippet with a copy button. */
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="bg-ink relative max-w-full min-w-0 rounded-2xl text-sm text-white">
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
        className="absolute top-3 right-3 rounded-lg p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}
