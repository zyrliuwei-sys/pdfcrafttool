import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { MarkIcon, type Mark } from '@/components/mark-icon';
import { Reveal } from '@/components/reveal';

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
    <section className="px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.home_compare.title']()}
          </h2>
          <p className="text-muted-foreground mt-6 text-[17px] leading-[1.75]">
            {m['pc.home_compare.body']()}
          </p>
        </Reveal>
        <Reveal className="mt-12">
          <div className="sheet-lift">
            <div className="sheet [--fold-size:32px]">
              <table className="w-full text-left text-sm sm:text-[15px]">
                <thead>
                  <tr className="border-border border-b">
                    <th className="px-5 py-4 font-semibold sm:px-8">
                      {m['pc.cmp.col_feature']()}
                    </th>
                    <th className="w-24 px-2 py-4 text-center font-semibold sm:w-40">
                      {m['pc.cmp.col_pc']()}
                    </th>
                    <th className="w-24 py-4 pr-6 pl-2 text-center font-semibold sm:w-48 sm:pr-12">
                      {m['pc.cmp.col_ac']()}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-5 pt-5 pb-3 font-medium sm:px-8">
                      {m['pc.cmp.r.price']()}
                    </td>
                    <td className="font-display text-brand px-2 pt-5 pb-3 text-center text-xl font-medium">
                      $0
                    </td>
                    <td className="text-muted-foreground pt-5 pr-6 pb-3 pl-2 text-center font-mono text-xs sm:pr-12 sm:text-sm">
                      $14.99+
                    </td>
                  </tr>
                  {rows.map((r) => (
                    <tr key={r.label}>
                      <td className="px-5 py-3 font-medium sm:px-8">
                        {r.label}
                      </td>
                      <td className="px-2 py-3">
                        <span className="flex justify-center">
                          <MarkIcon mark={r.pc} />
                        </span>
                      </td>
                      <td className="py-3 pr-6 pl-2 sm:pr-12">
                        <span className="flex justify-center">
                          <MarkIcon mark={r.ac} />
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="h-4" />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Link
            href="/pdfcraft-vs-adobe-acrobat"
            className="text-brand mt-8 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
          >
            {m['pc.home_compare.cta']()}
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
