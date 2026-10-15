import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { MarkIcon, type Mark } from '@/components/mark-icon';
import { SectionHeading } from '@/components/section-heading';

export function CompareTeaser() {
  const rows: { label: string; pc: Mark; ac: Mark }[] = [
    { label: m['pc.cmp.r.view'](), pc: 'yes', ac: 'yes' },
    { label: m['pc.cmp.r.organize'](), pc: 'yes', ac: 'yes' },
    { label: m['pc.cmp.r.combine'](), pc: 'yes', ac: 'yes' },
    { label: m['pc.cmp.r.forms'](), pc: 'partial', ac: 'yes' },
    { label: m['pc.cmp.r.edit'](), pc: 'no', ac: 'yes' },
    { label: m['pc.cmp.r.office'](), pc: 'partial', ac: 'yes' },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow={m['pc.home_compare.eyebrow']()}
            title={m['pc.home_compare.title']()}
            subtitle={m['pc.home_compare.subtitle']()}
          />
          <Link
            href="/pdfcraft-vs-adobe-acrobat"
            className="text-primary mt-8 inline-flex items-center gap-1.5 font-semibold hover:underline"
          >
            {m['pc.home_compare.cta']()}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="border-border bg-card overflow-hidden rounded-3xl border">
          <div className="border-border grid grid-cols-[1fr_88px_88px] border-b px-5 py-4 text-sm font-bold sm:grid-cols-[1fr_120px_120px] sm:px-7">
            <span>{m['pc.cmp.col_feature']()}</span>
            <span className="text-center">{m['pc.cmp.col_pc']()}</span>
            <span className="text-center">{m['pc.cmp.col_ac']()}</span>
          </div>
          <div className="border-border grid grid-cols-[1fr_88px_88px] items-center border-b px-5 py-4 text-sm sm:grid-cols-[1fr_120px_120px] sm:px-7">
            <span className="font-medium">{m['pc.cmp.r.price']()}</span>
            <span className="text-center font-bold text-emerald-600 dark:text-emerald-400">
              $0
            </span>
            <span className="text-muted-foreground text-center">
              $14.99+/mo
            </span>
          </div>
          {rows.map((r) => (
            <div
              key={r.label}
              className="border-border grid grid-cols-[1fr_88px_88px] items-center border-b px-5 py-4 text-sm last:border-0 sm:grid-cols-[1fr_120px_120px] sm:px-7"
            >
              <span className="font-medium">{r.label}</span>
              <span className="flex justify-center">
                <MarkIcon mark={r.pc} />
              </span>
              <span className="flex justify-center">
                <MarkIcon mark={r.ac} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
