import { ArrowUpRight, Check, X } from 'lucide-react';

import { ACROBAT_OFFICIAL, PDFCRAFT_VERSION } from '@/config/pdfcraft';
import { m } from '@/paraglide/messages.js';
import { MarkIcon, type Mark } from '@/components/mark-icon';
import { PageHero } from '@/components/page-hero';
import { Screenshot } from '@/components/screenshot';

interface Row {
  label: string;
  pc: Mark;
  ac: Mark;
  pcNote?: string;
  acNote?: string;
}

function rows(): Row[] {
  return [
    {
      label: m['pc.cmp.r.price'](),
      pc: 'yes',
      ac: 'partial',
      pcNote: m['pc.cmp.r.price.pc'](),
      acNote: m['pc.cmp.r.price.ac'](),
    },
    {
      label: m['pc.cmp.r.license'](),
      pc: 'yes',
      ac: 'no',
      pcNote: m['pc.cmp.r.license.pc'](),
      acNote: m['pc.cmp.r.license.ac'](),
    },
    {
      label: m['pc.cmp.r.account'](),
      pc: 'yes',
      ac: 'partial',
      pcNote: m['pc.cmp.r.account.pc'](),
      acNote: m['pc.cmp.r.account.ac'](),
    },
    {
      label: m['pc.cmp.r.platforms'](),
      pc: 'yes',
      ac: 'yes',
      pcNote: m['pc.cmp.r.platforms.pc'](),
      acNote: m['pc.cmp.r.platforms.ac'](),
    },
    { label: m['pc.cmp.r.view'](), pc: 'yes', ac: 'yes' },
    { label: m['pc.cmp.r.organize'](), pc: 'yes', ac: 'yes' },
    { label: m['pc.cmp.r.combine'](), pc: 'yes', ac: 'yes' },
    {
      label: m['pc.cmp.r.forms'](),
      pc: 'partial',
      ac: 'yes',
      pcNote: m['pc.cmp.r.forms.pc'](),
      acNote: m['pc.cmp.r.forms.ac'](),
    },
    {
      label: m['pc.cmp.r.encrypt'](),
      pc: 'yes',
      ac: 'yes',
      pcNote: m['pc.cmp.r.encrypt.pc'](),
      acNote: m['pc.cmp.r.encrypt.ac'](),
    },
    {
      label: m['pc.cmp.r.edit'](),
      pc: 'no',
      ac: 'yes',
      pcNote: m['pc.cmp.r.edit.pc'](),
    },
    {
      label: m['pc.cmp.r.ocr'](),
      pc: 'partial',
      ac: 'yes',
      pcNote: m['pc.cmp.r.ocr.pc'](),
      acNote: m['pc.cmp.r.ocr.ac'](),
    },
    {
      label: m['pc.cmp.r.office'](),
      pc: 'partial',
      ac: 'yes',
      pcNote: m['pc.cmp.r.office.pc'](),
    },
    {
      label: m['pc.cmp.r.sign'](),
      pc: 'partial',
      ac: 'yes',
      pcNote: m['pc.cmp.r.sign.pc'](),
      acNote: m['pc.cmp.r.sign.ac'](),
    },
    {
      label: m['pc.cmp.r.ai'](),
      pc: 'partial',
      ac: 'yes',
      pcNote: m['pc.cmp.r.ai.pc'](),
      acNote: m['pc.cmp.r.ai.ac'](),
    },
    {
      label: m['pc.cmp.r.cli'](),
      pc: 'yes',
      ac: 'partial',
      pcNote: m['pc.cmp.r.cli.pc'](),
      acNote: m['pc.cmp.r.cli.ac'](),
    },
    {
      label: m['pc.cmp.r.maturity'](),
      pc: 'partial',
      ac: 'yes',
      pcNote: m['pc.cmp.r.maturity.pc']({ version: PDFCRAFT_VERSION }),
      acNote: m['pc.cmp.r.maturity.ac'](),
    },
  ];
}

function Cell({ mark, note }: { mark: Mark; note?: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="shrink-0">
        <MarkIcon mark={mark} />
      </span>
      <span className="text-muted-foreground pt-0.5 text-sm leading-relaxed">
        {note}
      </span>
    </div>
  );
}

export function AcrobatCompare() {
  const advantages = [
    m['pc.cmp.adv.1'](),
    m['pc.cmp.adv.2'](),
    m['pc.cmp.adv.3'](),
    m['pc.cmp.adv.4'](),
    m['pc.cmp.adv.5'](),
    m['pc.cmp.adv.6'](),
  ];
  const acrobatWins = [
    m['pc.cmp.ac.1'](),
    m['pc.cmp.ac.2'](),
    m['pc.cmp.ac.3'](),
    m['pc.cmp.ac.4'](),
  ];

  return (
    <>
      <PageHero title={m['pc.cmp.title']()} subtitle={m['pc.cmp.subtitle']()} />

      <section className="px-4 pt-12 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <div className="sheet-lift">
            <div className="sheet bg-accent h-full p-8 [--fold-size:36px] sm:p-10">
              <p className="text-sm font-semibold">PdfCraft</p>
              <p className="font-display text-brand mt-3 text-6xl font-medium">
                $0
              </p>
              <p className="mt-5 leading-relaxed">{m['pc.cmp.summary_pc']()}</p>
            </div>
          </div>
          <div className="bg-card border-border rounded-lg border p-8 sm:p-10">
            <p className="text-sm font-semibold">Adobe Acrobat</p>
            <p className="font-display mt-3 text-6xl font-medium">
              $14.99
              <span className="text-muted-foreground text-2xl">
                {m['pc.cmp.per_month']()}
              </span>
            </p>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              {m['pc.cmp.summary_ac']()}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.cmp.table_title']()}
          </h2>
          <div className="mt-10">
            <div className="border-foreground hidden grid-cols-[1fr_1.4fr_1.4fr] gap-8 border-b-2 pb-3 text-sm font-semibold md:grid">
              <span>{m['pc.cmp.col_feature']()}</span>
              <span>{m['pc.cmp.col_pc']()}</span>
              <span>{m['pc.cmp.col_ac']()}</span>
            </div>
            {rows().map((r, i) => (
              <div
                key={r.label}
                className={
                  'grid gap-3 rounded-md px-0 py-5 md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-8 md:px-3 ' +
                  (i % 2 === 1 ? 'md:bg-card' : '')
                }
              >
                <span className="font-semibold">{r.label}</span>
                <div>
                  <span className="text-muted-foreground mb-1.5 block text-xs font-semibold md:hidden">
                    {m['pc.cmp.col_pc']()}
                  </span>
                  <Cell mark={r.pc} note={r.pcNote} />
                </div>
                <div>
                  <span className="text-muted-foreground mb-1.5 block text-xs font-semibold md:hidden">
                    {m['pc.cmp.col_ac']()}
                  </span>
                  <Cell mark={r.ac} note={r.acNote} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-xs">
            {m['pc.cmp.price_note']()}{' '}
            <a
              href={ACROBAT_OFFICIAL}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-0.5 underline"
            >
              adobe.com
              <ArrowUpRight className="size-3" />
            </a>
          </p>
        </div>
      </section>

      <section className="bg-card border-border border-y px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-display text-[2rem] leading-[1.1] font-medium text-balance sm:text-5xl">
              {m['pc.cmp.essay_title']()}
            </h2>
            <p className="mt-7 text-[17px] leading-[1.75]">
              {m['pc.cmp.essay_p1']()}
            </p>
            <p className="text-muted-foreground mt-5 text-[17px] leading-[1.75]">
              {m['pc.cmp.essay_p2']()}
            </p>
          </div>
          <Screenshot
            name="layers"
            sizes="(min-width: 1024px) 560px, 100vw"
            alt={m['pc.common.screenshot_alt']({ what: m['pc.cmp.shot']() })}
          />
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-14 md:grid-cols-2">
          <div className="border-foreground border-t-2 pt-6">
            <h2 className="font-display text-3xl font-medium">
              {m['pc.cmp.adv_title']()}
            </h2>
            <ul className="mt-7 space-y-4">
              {advantages.map((a) => (
                <li key={a} className="flex gap-3">
                  <Check
                    className="text-brand mt-1 size-4 shrink-0"
                    strokeWidth={3}
                  />
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-border border-t-2 pt-6">
            <h2 className="font-display text-3xl font-medium">
              {m['pc.cmp.ac_title']()}
            </h2>
            <ul className="mt-7 space-y-4">
              {acrobatWins.map((a) => (
                <li key={a} className="flex gap-3">
                  <X
                    className="text-muted-foreground mt-1 size-4 shrink-0"
                    strokeWidth={2.5}
                  />
                  <span className="text-muted-foreground leading-relaxed">
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-3xl text-center">
          <h2 className="text-brand text-sm font-semibold">
            {m['pc.cmp.verdict_title']()}
          </h2>
          <p className="font-display mt-4 text-2xl leading-snug font-medium text-balance sm:text-[2rem]">
            {m['pc.cmp.verdict']()}
          </p>
        </div>
      </section>
    </>
  );
}
