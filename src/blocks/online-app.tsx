import { Download, Maximize2, MonitorDown, ShieldCheck } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { DOWNLOADS, PDFCRAFT_VERSION } from '@/config/pdfcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { FaqSection } from '@/components/faq-section';
import { MarkIcon, type Mark } from '@/components/mark-icon';
import { PageHero } from '@/components/page-hero';
import { Screenshot } from '@/components/screenshot';
import { buttonVariants } from '@/components/ui/button';

export function onlineFaqItems() {
  return [
    { q: m['pc.online.faq.q1'](), a: m['pc.online.faq.a1']() },
    { q: m['pc.online.faq.q2'](), a: m['pc.online.faq.a2']() },
    {
      q: m['pc.online.faq.q3'](),
      a: m['pc.online.faq.a3']({ version: PDFCRAFT_VERSION }),
    },
    { q: m['pc.online.faq.q4'](), a: m['pc.online.faq.a4']() },
    { q: m['pc.online.faq.q5'](), a: m['pc.online.faq.a5']() },
  ];
}

export function OnlineApp() {
  const src = envConfigs.pdfcraft_web_url;

  const tasks = [
    {
      title: m['pc.online.task.open.title'](),
      desc: m['pc.online.task.open.desc'](),
    },
    {
      title: m['pc.online.task.search.title'](),
      desc: m['pc.online.task.search.desc'](),
    },
    {
      title: m['pc.online.task.combine.title'](),
      desc: m['pc.online.task.combine.desc'](),
    },
    {
      title: m['pc.online.task.split.title'](),
      desc: m['pc.online.task.split.desc'](),
    },
    {
      title: m['pc.online.task.save.title'](),
      desc: m['pc.online.task.save.desc'](),
    },
  ];

  const rows: { label: string; web: Mark | string; desktop: Mark | string }[] =
    [
      {
        label: m['pc.online.cmp.install'](),
        web: m['pc.online.cmp.install.web'](),
        desktop: m['pc.online.cmp.install.desktop'](),
      },
      { label: m['pc.online.cmp.core'](), web: 'yes', desktop: 'yes' },
      { label: m['pc.online.cmp.privacy'](), web: 'yes', desktop: 'yes' },
      {
        label: m['pc.online.cmp.print'](),
        web: m['pc.online.cmp.print.web'](),
        desktop: 'yes',
      },
      {
        label: m['pc.online.cmp.attach'](),
        web: m['pc.online.cmp.attach.web'](),
        desktop: 'yes',
      },
      { label: m['pc.online.cmp.reopen'](), web: 'no', desktop: 'yes' },
      {
        label: m['pc.online.cmp.cli'](),
        web: 'no',
        desktop: m['pc.online.cmp.cli.desktop'](),
      },
      {
        label: m['pc.online.cmp.version'](),
        web: m['pc.online.cmp.version.web']({ version: PDFCRAFT_VERSION }),
        desktop: m['pc.online.cmp.version.desktop'](),
      },
    ];

  const formats = [
    m['pc.online.fmt.1'](),
    m['pc.online.fmt.2'](),
    m['pc.online.fmt.3'](),
    m['pc.online.fmt.4'](),
  ];

  const compat = [
    m['pc.online.compat.1'](),
    m['pc.online.compat.2'](),
    m['pc.online.compat.3'](),
    m['pc.online.compat.4'](),
    m['pc.online.compat.5'](),
  ];

  const cell = (v: Mark | string) =>
    v === 'yes' || v === 'no' || v === 'partial' ? (
      <span className="flex justify-center">
        <MarkIcon mark={v} />
      </span>
    ) : (
      <span className="text-muted-foreground block text-center text-xs sm:text-sm">
        {v}
      </span>
    );

  return (
    <>
      <PageHero
        title={m['pc.online.title']()}
        subtitle={m['pc.online.subtitle']()}
      />

      <section className="px-4 pt-10 pb-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {src ? (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-muted-foreground text-sm">
                  {m['pc.online.loading']()}
                </p>
                <a
                  href={src}
                  target="_blank"
                  rel="noopener"
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-9 gap-2 rounded-full bg-transparent px-4 font-semibold'
                  )}
                >
                  <Maximize2 className="size-4" />
                  {m['pc.online.fullscreen']()}
                </a>
              </div>
              <div className="sheet-lift">
                <div className="sheet overflow-hidden [--fold-size:40px]">
                  <iframe
                    src={src}
                    title={m['pc.online.frame_title']()}
                    className="block h-[78vh] min-h-[520px] w-full border-0 bg-[#f1f1f3] dark:bg-[#19191c]"
                    allow="fullscreen; clipboard-read; clipboard-write"
                    allowFullScreen
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <h2 className="font-display text-3xl font-medium sm:text-4xl">
                  {m['pc.online.unavailable_title']()}
                </h2>
                <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                  {m['pc.online.unavailable_desc']()}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/download"
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'h-12 gap-2 rounded-full px-7 font-semibold'
                    )}
                  >
                    <Download className="size-[18px]" />
                    {m['pc.common.download']()}
                  </Link>
                  <a
                    href={DOWNLOADS.web[0].url}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'h-12 rounded-full bg-transparent px-6 font-semibold'
                    )}
                  >
                    {DOWNLOADS.web[0].label}
                  </a>
                </div>
              </div>
              <Screenshot
                name="tools"
                alt={m['pc.common.screenshot_alt']({
                  what: m['pc.start.shot'](),
                })}
                sizes="(min-width: 1024px) 640px, 100vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* Privacy is the reason to use the browser version, so it leads. */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="sheet-lift mx-auto max-w-6xl">
          <div className="sheet bg-accent flex flex-col gap-5 p-7 [--fold-size:36px] sm:flex-row sm:gap-8 sm:p-10">
            <ShieldCheck
              className="text-brand size-10 shrink-0"
              strokeWidth={1.5}
            />
            <div>
              <h2 className="font-display text-2xl font-medium sm:text-3xl">
                {m['pc.online.privacy_title']()}
              </h2>
              <p className="mt-3 max-w-3xl leading-relaxed">
                {m['pc.online.privacy_p1']()}
              </p>
              <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">
                {m['pc.online.privacy_p2']()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card border-border border-y px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.online.tasks_title']()}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl text-[17px] leading-relaxed">
            {m['pc.online.tasks_intro']()}
          </p>
          <ol className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {tasks.map((t, i) => (
              <li key={t.title} className="flex gap-4">
                <span className="font-display text-brand w-6 shrink-0 text-2xl leading-7 font-medium">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  <p className="text-muted-foreground mt-1.5 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.online.cmp_title']()}
          </h2>
          <div className="sheet mt-10 overflow-x-auto [--fold-size:28px]">
            <table className="w-full min-w-[520px] text-left text-sm sm:text-[15px]">
              <thead>
                <tr className="border-border border-b">
                  <th className="px-5 py-4 font-semibold sm:px-8">
                    {m['pc.cmp.col_feature']()}
                  </th>
                  <th className="w-36 px-2 py-4 text-center font-semibold sm:w-52">
                    {m['pc.online.cmp.col_web']()}
                  </th>
                  <th className="w-36 py-4 pr-6 pl-2 text-center font-semibold sm:w-52 sm:pr-10">
                    {m['pc.online.cmp.col_desktop']()}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.label}
                    className="border-border border-b last:border-0"
                  >
                    <td className="px-5 py-3.5 font-medium sm:px-8">
                      {r.label}
                    </td>
                    <td className="px-2 py-3.5">{cell(r.web)}</td>
                    <td className="py-3.5 pr-6 pl-2 sm:pr-10">
                      {cell(r.desktop)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-sm">
            {m['pc.online.cmp_source']()}
          </p>
        </div>
      </section>

      <section className="bg-card border-border border-y px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              {m['pc.online.fmt_title']()}
            </h2>
            <ul className="mt-6 space-y-4">
              {formats.map((f) => (
                <li
                  key={f}
                  className="border-brand border-l-2 pl-5 leading-relaxed"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              {m['pc.online.compat_title']()}
            </h2>
            <ul className="mt-6 space-y-4">
              {compat.map((c) => (
                <li
                  key={c}
                  className="border-brand border-l-2 pl-5 leading-relaxed"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
              {m['pc.online.about_title']()}
            </h2>
            <p className="mt-6 text-[17px] leading-[1.75]">
              {m['pc.online.about_p1']({ version: PDFCRAFT_VERSION })}
            </p>
            <p className="text-muted-foreground mt-5 text-[17px] leading-[1.75]">
              {m['pc.online.about_p2']()}
            </p>
          </div>
          <div className="sheet-lift self-start">
            <div className="sheet bg-accent p-8 [--fold-size:32px]">
              <MonitorDown className="text-brand size-8" strokeWidth={1.5} />
              <h2 className="font-display mt-4 text-2xl font-medium">
                {m['pc.online.desktop_title']()}
              </h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {m['pc.online.desktop_desc']()}
              </p>
              <Link
                href="/download"
                className={cn(
                  buttonVariants(),
                  'mt-6 h-11 gap-2 rounded-full px-5 font-semibold'
                )}
              >
                <Download className="size-4" />
                {m['pc.common.download']()}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        id="online-faq"
        title={m['pc.online.faq_title']()}
        items={onlineFaqItems()}
      />
    </>
  );
}
