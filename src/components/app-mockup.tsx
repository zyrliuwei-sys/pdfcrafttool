import {
  ChevronLeft,
  ChevronRight,
  Highlighter,
  MessageSquare,
  RotateCw,
  Search,
  ZoomIn,
} from 'lucide-react';

/**
 * Illustrative PDF-workbench window built from markup (no screenshots), used
 * as the hero visual. All copy arrives via props.
 */
export function AppMockup({
  fileName,
  searchLabel,
  matchesLabel,
  pagesLabel,
  statusLabel,
}: {
  fileName: string;
  searchLabel: string;
  matchesLabel: string;
  pagesLabel: string;
  statusLabel: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="border-border bg-background relative overflow-hidden rounded-2xl border shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]"
    >
      {/* Title bar */}
      <div className="border-border bg-muted/60 flex items-center gap-3 border-b px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="bg-background border-border flex items-center gap-2 rounded-md border px-3 py-1 text-xs font-medium">
          <span className="bg-brand inline-block h-3.5 w-2.5 rounded-[2px]" />
          {fileName}
        </div>
        <div className="text-muted-foreground ml-auto hidden items-center gap-3 sm:flex">
          <ChevronLeft className="size-4" />
          <ChevronRight className="size-4" />
          <ZoomIn className="size-4" />
          <RotateCw className="size-4" />
          <Highlighter className="size-4" />
          <MessageSquare className="size-4" />
        </div>
      </div>

      <div className="flex h-[300px] sm:h-[380px]">
        {/* Thumbnails */}
        <div className="border-border bg-muted/40 hidden w-28 shrink-0 flex-col gap-3 border-r p-3 sm:flex">
          <p className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
            {pagesLabel}
          </p>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={
                'bg-background mx-auto flex h-24 w-[72px] flex-col gap-1.5 rounded-sm p-2 shadow-sm ' +
                (i === 0 ? 'ring-primary ring-2' : 'border-border border')
              }
            >
              <span className="bg-foreground/70 h-1.5 w-8 rounded" />
              <span className="bg-muted-foreground/30 h-1 w-full rounded" />
              <span className="bg-muted-foreground/30 h-1 w-full rounded" />
              <span className="bg-muted-foreground/30 h-1 w-3/4 rounded" />
              {i === 1 && (
                <span className="bg-brand/20 mt-1 h-6 w-full rounded-sm" />
              )}
            </div>
          ))}
        </div>

        {/* Page */}
        <div className="bg-muted/30 relative flex flex-1 justify-center overflow-hidden p-5 sm:p-7">
          <div className="bg-background border-border w-full max-w-md rounded-sm border p-6 shadow-md sm:p-8">
            <div className="bg-foreground/80 h-3 w-2/3 rounded" />
            <div className="bg-muted-foreground/40 mt-2 h-2 w-1/3 rounded" />
            <div className="mt-6 space-y-2">
              <div className="bg-muted-foreground/25 h-2 w-full rounded" />
              <div className="flex gap-1.5">
                <div className="bg-muted-foreground/25 h-2 w-1/4 rounded" />
                <div className="h-2 w-1/6 rounded bg-yellow-300/90" />
                <div className="bg-muted-foreground/25 h-2 flex-1 rounded" />
              </div>
              <div className="bg-muted-foreground/25 h-2 w-11/12 rounded" />
              <div className="bg-muted-foreground/25 h-2 w-full rounded" />
            </div>
            <div className="mt-6 flex h-20 items-end gap-2 sm:h-24">
              {[40, 65, 50, 85, 70, 95].map((h, i) => (
                <div
                  key={i}
                  className={
                    i === 5
                      ? 'bg-brand flex-1 rounded-t'
                      : 'bg-primary/25 flex-1 rounded-t'
                  }
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex gap-1.5">
                <div className="h-2 w-1/5 rounded bg-yellow-300/90" />
                <div className="bg-muted-foreground/25 h-2 flex-1 rounded" />
              </div>
              <div className="bg-muted-foreground/25 h-2 w-4/5 rounded" />
            </div>
          </div>

          {/* Floating search chip */}
          <div className="bg-background border-border absolute top-4 right-4 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs shadow-lg">
            <Search className="text-primary size-3.5" />
            <span className="font-medium">{searchLabel}</span>
            <span className="text-muted-foreground">· {matchesLabel}</span>
          </div>
          <div className="bg-ink absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-white shadow-lg">
            {statusLabel}
          </div>
        </div>
      </div>
    </div>
  );
}
