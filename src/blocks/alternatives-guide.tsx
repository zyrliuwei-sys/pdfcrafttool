import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  ACROBAT_OFFICIAL,
  FOXIT_EDITOR,
  OKULAR,
  OTHER_PDFCRAFT_REPO,
  PDFCRAFT_REPO,
  PDFSAM,
} from '@/config/pdfcraft';
import { m } from '@/paraglide/messages.js';
import { FaqSection } from '@/components/faq-section';
import { PageHero } from '@/components/page-hero';

export function alternativesFaqItems() {
  return [
    { q: m['pc.alt.faq.q1'](), a: m['pc.alt.faq.a1']() },
    { q: m['pc.alt.faq.q2'](), a: m['pc.alt.faq.a2']() },
    { q: m['pc.alt.faq.q3'](), a: m['pc.alt.faq.a3']() },
    { q: m['pc.alt.faq.q4'](), a: m['pc.alt.faq.a4']() },
    { q: m['pc.alt.faq.q5'](), a: m['pc.alt.faq.a5']() },
  ];
}

type ToolId =
  | 'pdfcraft'
  | 'acrobat'
  | 'foxit'
  | 'toolkit'
  | 'pdfsam'
  | 'okular';

const TOOLS: { id: ToolId; name: string; href: string }[] = [
  { id: 'pdfcraft', name: 'PdfCraft', href: PDFCRAFT_REPO },
  { id: 'acrobat', name: 'Adobe Acrobat', href: ACROBAT_OFFICIAL },
  { id: 'foxit', name: 'Foxit PDF Editor', href: FOXIT_EDITOR },
  { id: 'toolkit', name: 'PDFCraftTool/pdfcraft', href: OTHER_PDFCRAFT_REPO },
  { id: 'pdfsam', name: 'PDFsam Basic', href: PDFSAM },
  { id: 'okular', name: 'Okular', href: OKULAR },
];

// Paraglide keys are static; spell each lookup out so they tree-shake.
function toolRow(id: ToolId) {
  switch (id) {
    case 'pdfcraft':
      return [
        m['pc.alt.t.pdfcraft.type'](),
        m['pc.alt.t.pdfcraft.price'](),
        m['pc.alt.t.pdfcraft.platforms'](),
        m['pc.alt.t.pdfcraft.license'](),
        m['pc.alt.t.pdfcraft.best'](),
        m['pc.alt.t.pdfcraft.files'](),
      ];
    case 'acrobat':
      return [
        m['pc.alt.t.acrobat.type'](),
        m['pc.alt.t.acrobat.price'](),
        m['pc.alt.t.acrobat.platforms'](),
        m['pc.alt.t.acrobat.license'](),
        m['pc.alt.t.acrobat.best'](),
        m['pc.alt.t.acrobat.files'](),
      ];
    case 'foxit':
      return [
        m['pc.alt.t.foxit.type'](),
        m['pc.alt.t.foxit.price'](),
        m['pc.alt.t.foxit.platforms'](),
        m['pc.alt.t.foxit.license'](),
        m['pc.alt.t.foxit.best'](),
        m['pc.alt.t.foxit.files'](),
      ];
    case 'toolkit':
      return [
        m['pc.alt.t.toolkit.type'](),
        m['pc.alt.t.toolkit.price'](),
        m['pc.alt.t.toolkit.platforms'](),
        m['pc.alt.t.toolkit.license'](),
        m['pc.alt.t.toolkit.best'](),
        m['pc.alt.t.toolkit.files'](),
      ];
    case 'pdfsam':
      return [
        m['pc.alt.t.pdfsam.type'](),
        m['pc.alt.t.pdfsam.price'](),
        m['pc.alt.t.pdfsam.platforms'](),
        m['pc.alt.t.pdfsam.license'](),
        m['pc.alt.t.pdfsam.best'](),
        m['pc.alt.t.pdfsam.files'](),
      ];
    case 'okular':
      return [
        m['pc.alt.t.okular.type'](),
        m['pc.alt.t.okular.price'](),
        m['pc.alt.t.okular.platforms'](),
        m['pc.alt.t.okular.license'](),
        m['pc.alt.t.okular.best'](),
        m['pc.alt.t.okular.files'](),
      ];
  }
}

/** `notice` renders right under the page title. */
export function AlternativesGuide({ notice }: { notice?: ReactNode }) {
  const columns = [
    m['pc.alt.col.type'](),
    m['pc.alt.col.price'](),
    m['pc.alt.col.platforms'](),
    m['pc.alt.col.license'](),
    m['pc.alt.col.best'](),
    m['pc.alt.col.files'](),
  ];

  const fits = [
    m['pc.alt.fit.1'](),
    m['pc.alt.fit.2'](),
    m['pc.alt.fit.3'](),
    m['pc.alt.fit.4'](),
    m['pc.alt.fit.5'](),
  ];
  const misfits = [
    m['pc.alt.misfit.1'](),
    m['pc.alt.misfit.2'](),
    m['pc.alt.misfit.3'](),
    m['pc.alt.misfit.4'](),
    m['pc.alt.misfit.5'](),
  ];
  const picks = [
    { need: m['pc.alt.pick.1.need'](), pick: m['pc.alt.pick.1.pick']() },
    { need: m['pc.alt.pick.2.need'](), pick: m['pc.alt.pick.2.pick']() },
    { need: m['pc.alt.pick.3.need'](), pick: m['pc.alt.pick.3.pick']() },
    { need: m['pc.alt.pick.4.need'](), pick: m['pc.alt.pick.4.pick']() },
    { need: m['pc.alt.pick.5.need'](), pick: m['pc.alt.pick.5.pick']() },
    { need: m['pc.alt.pick.6.need'](), pick: m['pc.alt.pick.6.pick']() },
  ];

  return (
    <>
      <PageHero
        eyebrow={m['pc.alt.eyebrow']()}
        title={m['pc.alt.title']()}
        subtitle={m['pc.alt.subtitle']()}
      />
      {notice}

      <section className="px-4 pt-14 sm:px-6">
        <div className="mx-auto max-w-3xl text-[17px] leading-[1.75]">
          <p>{m['pc.alt.intro_p1']()}</p>
          <p className="text-muted-foreground mt-5">{m['pc.alt.intro_p2']()}</p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              {m['pc.alt.fit_title']()}
            </h2>
            <ul className="mt-7 space-y-4">
              {fits.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed">
                  <Check
                    className="text-brand mt-1 size-4 shrink-0"
                    strokeWidth={3}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              {m['pc.alt.misfit_title']()}
            </h2>
            <ul className="mt-7 space-y-4">
              {misfits.map((t) => (
                <li key={t} className="flex gap-3 leading-relaxed">
                  <X
                    className="text-muted-foreground mt-1 size-4 shrink-0"
                    strokeWidth={3}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-card border-border border-y px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.alt.table_title']()}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl leading-relaxed">
            {m['pc.alt.table_intro']()}
          </p>
          <div className="sheet mt-10 overflow-x-auto [--fold-size:28px]">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead>
                <tr className="border-border border-b">
                  <th className="px-5 py-4 font-semibold">
                    {m['pc.alt.col.tool']()}
                  </th>
                  {columns.map((c) => (
                    <th key={c} className="px-3 py-4 font-semibold">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TOOLS.map((t) => (
                  <tr
                    key={t.id}
                    className="border-border border-b align-top last:border-0"
                  >
                    <th scope="row" className="px-5 py-4 font-semibold">
                      <a
                        href={t.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand inline-flex items-center gap-1 underline-offset-4 hover:underline"
                      >
                        {t.name}
                        <ArrowUpRight className="size-3.5 opacity-60" />
                      </a>
                    </th>
                    {toolRow(t.id).map((v, i) => (
                      <td
                        key={i}
                        className="text-muted-foreground px-3 py-4 leading-snug"
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
            {m['pc.alt.table_note']()}
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.alt.pick_title']()}
          </h2>
          <dl className="mt-10 grid gap-x-14 gap-y-9 md:grid-cols-2">
            {picks.map((p) => (
              <div key={p.need} className="border-brand border-l-2 pl-5">
                <dt className="text-lg font-semibold">{p.need}</dt>
                <dd className="text-muted-foreground mt-1.5 leading-relaxed">
                  {p.pick}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              href="/pdfcraft-vs-adobe-acrobat"
              className="text-brand inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
            >
              {m['pc.home_compare.cta']()}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/download"
              className="text-brand inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
            >
              {m['pc.common.download']()}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        id="alternatives-faq"
        title={m['pc.alt.faq_title']()}
        items={alternativesFaqItems()}
      />
    </>
  );
}
