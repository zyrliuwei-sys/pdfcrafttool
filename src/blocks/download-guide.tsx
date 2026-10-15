import { useEffect, useState } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import {
  CRAFT_LAUNCHER,
  DOWNLOADS,
  PDFCRAFT_CHECKSUMS,
  PDFCRAFT_RELEASE_DATE,
  PDFCRAFT_RELEASES,
  PDFCRAFT_REPO,
  PDFCRAFT_VERSION,
  PLATFORM_IDS,
  PLATFORM_NAMES,
  type PlatformId,
} from '@/config/pdfcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { CodeBlock } from '@/components/code-block';
import { PageHero } from '@/components/page-hero';
import { PlatformIcon } from '@/components/platform-icon';
import { detectPlatform } from '@/components/smart-download';
import { buttonVariants } from '@/components/ui/button';

function stepsFor(platform: PlatformId): string[] {
  switch (platform) {
    case 'windows':
      return [
        m['pc.dl.windows.1'](),
        m['pc.dl.windows.2'](),
        m['pc.dl.windows.3'](),
        m['pc.dl.windows.4'](),
      ];
    case 'macos':
      return [
        m['pc.dl.macos.1'](),
        m['pc.dl.macos.2'](),
        m['pc.dl.macos.3'](),
        m['pc.dl.macos.4'](),
      ];
    case 'linux':
      return [
        m['pc.dl.linux.1'](),
        m['pc.dl.linux.2'](),
        m['pc.dl.linux.3'](),
        m['pc.dl.linux.4'](),
      ];
    case 'freebsd':
      return [
        m['pc.dl.freebsd.1'](),
        m['pc.dl.freebsd.2'](),
        m['pc.dl.freebsd.3'](),
      ];
    case 'web':
      return [m['pc.dl.web.1'](), m['pc.dl.web.2'](), m['pc.dl.web.3']()];
  }
}

/** Renders the shell command at the end of a "text: command" step as code. */
function Step({ text }: { text: string }) {
  const match = text.match(/^(.*?[:：])\s*((?:sudo |chmod |flatpak |tar ).+)$/);
  if (!match) return <span>{text}</span>;
  return (
    <span>
      {match[1]}{' '}
      <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-[0.85em] break-all">
        {match[2]}
      </code>
    </span>
  );
}

const external = {
  target: '_blank',
  rel: 'noopener noreferrer',
  className:
    'text-brand mt-5 inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline',
} as const;

export function DownloadGuide() {
  const [platform, setPlatform] = useState<PlatformId>('windows');

  useEffect(() => {
    const fromHash = window.location.hash.slice(1) as PlatformId;
    setPlatform(PLATFORM_IDS.includes(fromHash) ? fromHash : detectPlatform());
  }, []);

  const select = (id: PlatformId) => {
    setPlatform(id);
    history.replaceState(null, '', `#${id}`);
  };

  const assets = DOWNLOADS[platform];
  const primary = assets.find((a) => a.recommended) ?? assets[0];
  const verifyCmd =
    platform === 'windows'
      ? `certutil -hashfile ${primary.file} SHA256`
      : platform === 'macos'
        ? `shasum -a 256 ${primary.file}`
        : `sha256sum ${primary.file}`;

  return (
    <>
      <PageHero
        eyebrow={`${m['pc.common.version']({ version: PDFCRAFT_VERSION })}, ${m['pc.common.released']({ date: PDFCRAFT_RELEASE_DATE })}`}
        title={m['pc.dl.title']()}
        subtitle={m['pc.dl.subtitle']()}
      />

      <section className="px-4 pt-10 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div
            role="tablist"
            aria-label={m['pc.dl.choose']()}
            className="border-border flex gap-1 overflow-x-auto border-b"
          >
            {PLATFORM_IDS.map((id) => (
              <button
                key={id}
                id={id}
                role="tab"
                type="button"
                aria-selected={platform === id}
                onClick={() => select(id)}
                className={cn(
                  '-mb-px flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold whitespace-nowrap transition sm:px-6',
                  platform === id
                    ? 'border-brand text-foreground'
                    : 'text-muted-foreground hover:text-foreground border-transparent'
                )}
              >
                <PlatformIcon platform={id} className="size-4" />
                {PLATFORM_NAMES[id]}
              </button>
            ))}
          </div>

          <div className="sheet-lift mt-10">
            <div className="sheet flex flex-col items-start gap-6 p-7 [--fold-size:40px] sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="flex items-center gap-5">
                <PlatformIcon
                  platform={platform}
                  className="text-brand size-10 shrink-0"
                />
                <div>
                  <p className="font-display text-3xl font-medium">
                    {m['pc.dl.card_title']({
                      version: PDFCRAFT_VERSION,
                      platform: PLATFORM_NAMES[platform],
                    })}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {primary.label}, {primary.sizeMb} MB
                  </p>
                </div>
              </div>
              {platform === 'web' ? (
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/online"
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'h-12 rounded-full px-7 text-base font-semibold'
                    )}
                  >
                    {m['pc.common.online']()}
                  </Link>
                  <a
                    href={primary.url}
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      'h-12 gap-2 rounded-full bg-transparent px-6 text-base font-semibold'
                    )}
                  >
                    <Download className="size-[18px]" />
                    .zip
                  </a>
                </div>
              ) : (
                <a
                  href={primary.url}
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-12 gap-2 rounded-full px-7 text-base font-semibold'
                  )}
                >
                  <Download className="size-[18px]" />
                  {m['pc.common.download']()}
                </a>
              )}
            </div>
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_1fr]">
            <div className="min-w-0">
              <h2 className="font-display text-3xl font-medium">
                {m['pc.dl.steps_title']({ platform: PLATFORM_NAMES[platform] })}
              </h2>
              <ol className="mt-7 space-y-5">
                {stepsFor(platform).map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-brand w-5 shrink-0 text-xl leading-7 font-medium">
                      {i + 1}
                    </span>
                    <p className="leading-7">
                      <Step text={step} />
                    </p>
                  </li>
                ))}
              </ol>
              <p className="bg-accent text-accent-foreground mt-8 rounded-lg p-5 text-sm leading-relaxed">
                {m['pc.dl.alpha_note']()}
              </p>
            </div>

            <div className="min-w-0">
              <h2 className="font-display text-3xl font-medium">
                {m['pc.dl.files_title']()}
              </h2>
              <ul className="mt-7">
                {assets.map((a) => (
                  <li key={a.file}>
                    <a
                      href={a.url}
                      className="group border-border flex items-center gap-4 border-b py-4"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">
                          {a.label}
                          {a.recommended && (
                            <span className="text-brand ml-2 text-xs font-semibold">
                              {m['pc.common.recommended']()}
                            </span>
                          )}
                        </span>
                        <span className="text-muted-foreground block truncate font-mono text-xs">
                          {a.file}
                        </span>
                      </span>
                      <span className="text-muted-foreground font-mono text-xs tabular-nums">
                        {a.sizeMb} MB
                      </span>
                      <Download
                        className="text-foreground/40 group-hover:text-brand size-4 transition"
                        aria-label={m['pc.dl.get']()}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card border-border border-y px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.dl.about_title']()}
          </h2>
          <div className="mt-8 gap-12 text-[17px] leading-[1.75] md:columns-2">
            <p className="mb-6">
              {m['pc.dl.about_p1']({
                version: PDFCRAFT_VERSION,
                date: PDFCRAFT_RELEASE_DATE,
              })}
            </p>
            <p className="text-muted-foreground">{m['pc.dl.about_p2']()}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-14 md:grid-cols-2">
          <div className="border-foreground min-w-0 border-t-2 pt-6">
            <h2 className="font-display text-2xl font-medium">
              {m['pc.dl.verify_title']()}
            </h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {m['pc.dl.verify_desc']()}
            </p>
            <div className="mt-5">
              <CodeBlock code={verifyCmd} />
            </div>
            <a href={PDFCRAFT_CHECKSUMS} {...external}>
              {m['pc.dl.verify_cta']()}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="border-foreground min-w-0 border-t-2 pt-6">
            <h2 className="font-display text-2xl font-medium">
              {m['pc.dl.source_title']()}
            </h2>
            <p className="text-muted-foreground mt-2">
              {m['pc.dl.source_desc']()}
            </p>
            <div className="mt-5">
              <CodeBlock
                code={`git clone ${PDFCRAFT_REPO}.git\ncd pdfcraft\ncargo run --release -p pdfcraft`}
              />
            </div>
          </div>
          <div className="border-foreground min-w-0 border-t-2 pt-6">
            <h2 className="font-display text-2xl font-medium">
              {m['pc.dl.req_title']()}
            </h2>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5 leading-relaxed">
              <li>{m['pc.dl.req.1']()}</li>
              <li>{m['pc.dl.req.2']()}</li>
              <li>{m['pc.dl.req.3']()}</li>
            </ul>
            <a href={PDFCRAFT_RELEASES} {...external}>
              {m['pc.dl.all_releases']()}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="border-foreground min-w-0 border-t-2 pt-6">
            <h2 className="font-display text-2xl font-medium">
              {m['pc.dl.launcher_title']()}
            </h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {m['pc.dl.launcher_desc']()}
            </p>
            <a href={CRAFT_LAUNCHER} {...external}>
              {m['pc.dl.launcher_cta']()}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
