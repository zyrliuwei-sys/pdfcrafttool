import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowUpRight,
  Download,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

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

/** Splits "text: command" steps so the shell command renders as code. */
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

function detectPlatform(): PlatformId {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua) && !/iPhone|iPad/i.test(ua)) return 'macos';
  if (/Windows/i.test(ua)) return 'windows';
  if (/FreeBSD/i.test(ua)) return 'freebsd';
  if (/Linux|X11/i.test(ua) && !/Android/i.test(ua)) return 'linux';
  return 'windows';
}

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
        eyebrow={`${m['pc.common.version']({ version: PDFCRAFT_VERSION })} · ${m['pc.common.released']({ date: PDFCRAFT_RELEASE_DATE })}`}
        title={m['pc.dl.title']()}
        subtitle={m['pc.dl.subtitle']()}
      />

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="sr-only">{m['pc.dl.choose']()}</h2>
          <div
            role="tablist"
            aria-label={m['pc.dl.choose']()}
            className="bg-muted mx-auto flex w-full max-w-2xl gap-1 overflow-x-auto rounded-full p-1.5"
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
                  'flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition',
                  platform === id
                    ? 'bg-background text-foreground shadow'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <PlatformIcon platform={id} className="size-4" />
                {PLATFORM_NAMES[id]}
              </button>
            ))}
          </div>

          {/* Primary download card */}
          <div className="border-border bg-card mt-10 flex flex-col items-start gap-6 rounded-3xl border p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-center gap-5">
              <span className="bg-brand inline-flex size-16 shrink-0 items-center justify-center rounded-2xl text-white">
                <PlatformIcon platform={platform} className="size-8" />
              </span>
              <div>
                <p className="text-2xl font-extrabold tracking-tight">
                  PdfCraft {PDFCRAFT_VERSION} · {PLATFORM_NAMES[platform]}
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {primary.label} · {primary.sizeMb} MB
                </p>
              </div>
            </div>
            {platform === 'web' ? (
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/online"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'h-12 rounded-full px-6 text-base font-semibold'
                  )}
                >
                  {m['pc.common.open_online']()}
                </Link>
                <a
                  href={primary.url}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'h-12 gap-2 rounded-full px-6 text-base font-semibold'
                  )}
                >
                  <Download className="size-5" />
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
                <Download className="size-5" />
                {m['pc.common.download_free']()}
              </a>
            )}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
            {/* Steps */}
            <div className="min-w-0">
              <h2 className="text-xl font-bold">
                {m['pc.dl.steps_title']({ platform: PLATFORM_NAMES[platform] })}
              </h2>
              <ol className="mt-5 space-y-4">
                {stepsFor(platform).map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="bg-foreground text-background inline-flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 leading-relaxed">
                      <Step text={step} />
                    </p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 flex gap-2 rounded-2xl bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-800 dark:text-amber-300">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                {m['pc.dl.alpha_note']()}
              </p>
            </div>

            {/* All files */}
            <div className="border-border min-w-0 overflow-hidden rounded-3xl border">
              <div className="bg-muted/60 border-border grid grid-cols-[1fr_auto_auto] gap-4 border-b px-5 py-3 text-xs font-semibold tracking-wide uppercase">
                <span>{m['pc.dl.file']()}</span>
                <span>{m['pc.dl.size']()}</span>
                <span className="sr-only">{m['pc.dl.get']()}</span>
              </div>
              {assets.map((a) => (
                <a
                  key={a.file}
                  href={a.url}
                  className="border-border hover:bg-muted/50 grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b px-5 py-3.5 text-sm transition last:border-0"
                >
                  <span className="min-w-0">
                    <span className="font-medium">{a.label}</span>
                    {a.recommended && (
                      <span className="text-brand bg-brand-soft ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold">
                        {m['pc.common.recommended']()}
                      </span>
                    )}
                    <span className="text-muted-foreground block truncate font-mono text-xs">
                      {a.file}
                    </span>
                  </span>
                  <span className="text-muted-foreground tabular-nums">
                    {a.sizeMb} MB
                  </span>
                  <Download
                    className="text-primary size-4"
                    aria-label={m['pc.dl.get']()}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Launcher / verify / source / requirements */}
      <section className="bg-muted/60 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="bg-background border-border min-w-0 rounded-3xl border p-8">
            <RefreshCw className="text-brand size-6" />
            <h2 className="mt-4 text-xl font-bold">
              {m['pc.dl.launcher_title']()}
            </h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {m['pc.dl.launcher_desc']()}
            </p>
            <a
              href={CRAFT_LAUNCHER}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-5 inline-flex items-center gap-1 font-semibold hover:underline"
            >
              {m['pc.dl.launcher_cta']()}
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="bg-background border-border min-w-0 rounded-3xl border p-8">
            <ShieldCheck className="text-brand size-6" />
            <h2 className="mt-4 text-xl font-bold">
              {m['pc.dl.verify_title']()}
            </h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {m['pc.dl.verify_desc']()}
            </p>
            <div className="mt-4">
              <CodeBlock code={verifyCmd} />
            </div>
            <a
              href={PDFCRAFT_CHECKSUMS}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-4 inline-flex items-center gap-1 font-semibold hover:underline"
            >
              {m['pc.dl.verify_cta']()}
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="bg-background border-border min-w-0 rounded-3xl border p-8">
            <h2 className="text-xl font-bold">{m['pc.dl.source_title']()}</h2>
            <p className="text-muted-foreground mt-2">
              {m['pc.dl.source_desc']()}
            </p>
            <div className="mt-4">
              <CodeBlock
                code={`git clone ${PDFCRAFT_REPO}.git\ncd pdfcraft\ncargo run --release -p pdfcraft`}
              />
            </div>
          </div>

          <div className="bg-background border-border min-w-0 rounded-3xl border p-8">
            <h2 className="text-xl font-bold">{m['pc.dl.req_title']()}</h2>
            <ul className="text-muted-foreground mt-4 list-disc space-y-2 pl-5 leading-relaxed">
              <li>{m['pc.dl.req.1']()}</li>
              <li>{m['pc.dl.req.2']()}</li>
              <li>{m['pc.dl.req.3']()}</li>
            </ul>
            <a
              href={PDFCRAFT_RELEASES}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-5 inline-flex items-center gap-1 font-semibold hover:underline"
            >
              {m['pc.dl.all_releases']()}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
