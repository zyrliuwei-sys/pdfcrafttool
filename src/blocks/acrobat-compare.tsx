import { ArrowUpRight, Check, X } from 'lucide-react';

import { ACROBAT_OFFICIAL, PDFCRAFT_VERSION } from '@/config/pdfcraft';
import { m } from '@/paraglide/messages.js';
import { MarkIcon, type Mark } from '@/components/mark-icon';
import { PageHero } from '@/components/page-hero';

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
      <MarkIcon mark={mark} />
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

      {/* Two summary cards */}
      <section className="px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <div className="bg-brand rounded-3xl p-8 text-white sm:p-10">
            <p className="text-sm font-bold text-white/80">PdfCraft</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">$0</p>
            <p className="mt-4 leading-relaxed text-white/90">
              {m['pc.cmp.summary_pc']()}
            </p>
          </div>
          <div className="bg-ink rounded-3xl p-8 text-white sm:p-10">
            <p className="text-sm font-bold text-white/70">Adobe Acrobat</p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">
              $14.99–24.99
              <span className="text-lg font-semibold text-white/60">/mo</span>
            </p>
            <p className="mt-4 leading-relaxed text-white/80">
              {m['pc.cmp.summary_ac']()}
            </p>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {m['pc.cmp.table_title']()}
          </h2>
          <div className="border-border mt-8 overflow-hidden rounded-3xl border">
            <div className="bg-muted/60 border-border hidden grid-cols-[1fr_1.3fr_1.3fr] gap-6 border-b px-6 py-4 text-sm font-bold md:grid">
              <span>{m['pc.cmp.col_feature']()}</span>
              <span>{m['pc.cmp.col_pc']()}</span>
              <span>{m['pc.cmp.col_ac']()}</span>
            </div>
            {rows().map((r) => (
              <div
                key={r.label}
                className="border-border grid gap-3 border-b px-6 py-5 last:border-0 md:grid-cols-[1fr_1.3fr_1.3fr] md:gap-6"
              >
                <span className="font-semibold">{r.label}</span>
                <div>
                  <span className="text-muted-foreground mb-1 block text-xs font-semibold md:hidden">
                    {m['pc.cmp.col_pc']()}
                  </span>
                  <Cell mark={r.pc} note={r.pcNote} />
                </div>
                <div>
                  <span className="text-muted-foreground mb-1 block text-xs font-semibold md:hidden">
                    {m['pc.cmp.col_ac']()}
                  </span>
                  <Cell mark={r.ac} note={r.acNote} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-4 text-xs">
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

      {/* Pros / when to keep Acrobat */}
      <section className="bg-muted/60 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="bg-background border-border rounded-3xl border p-8 sm:p-10">
            <h2 className="text-xl font-extrabold sm:text-2xl">
              {m['pc.cmp.adv_title']()}
            </h2>
            <ul className="mt-6 space-y-4">
              {advantages.map((a) => (
                <li key={a} className="flex gap-3">
                  <Check
                    className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                    strokeWidth={3}
                  />
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-background border-border rounded-3xl border p-8 sm:p-10">
            <h2 className="text-xl font-extrabold sm:text-2xl">
              {m['pc.cmp.ac_title']()}
            </h2>
            <ul className="mt-6 space-y-4">
              {acrobatWins.map((a) => (
                <li key={a} className="flex gap-3">
                  <X
                    className="text-muted-foreground mt-1 size-4 shrink-0"
                    strokeWidth={3}
                  />
                  <span className="leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-foreground mx-auto mt-10 max-w-3xl border-l-4 pl-6">
          <h2 className="text-xl font-extrabold">
            {m['pc.cmp.verdict_title']()}
          </h2>
          <p className="mt-3 text-lg leading-relaxed">
            {m['pc.cmp.verdict']()}
          </p>
        </div>
      </section>
    </>
  );
}
