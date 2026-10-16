import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

import { DOWNLOADS, PLATFORM_NAMES, type PlatformId } from '@/config/pdfcraft';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

/** Best-guess desktop platform from the user agent (client only). */
export function detectPlatform(): PlatformId {
  const ua = navigator.userAgent;
  if (/Mac/i.test(ua) && !/iPhone|iPad/i.test(ua)) return 'macos';
  if (/Windows/i.test(ua)) return 'windows';
  if (/FreeBSD/i.test(ua)) return 'freebsd';
  if (/Linux|X11/i.test(ua) && !/Android/i.test(ua)) return 'linux';
  return 'windows';
}

/**
 * One-click download of the recommended PdfCraft build for the visitor's
 * system, straight from the GitHub release. Server-renders the Windows
 * build and switches after hydration.
 */
export function SmartDownload({
  label,
  className,
}: {
  /** Receives the platform display name, e.g. "macOS". */
  label: (platform: string) => string;
  className?: string;
}) {
  const [platform, setPlatform] = useState<PlatformId>('windows');
  useEffect(() => setPlatform(detectPlatform()), []);

  const asset = DOWNLOADS[platform].find((a) => a.recommended)!;
  return (
    <a
      href={asset.url}
      title={`${asset.file} (${asset.sizeMb} MB)`}
      className={cn(
        buttonVariants({ size: 'lg' }),
        'h-12 gap-2 rounded-full px-7 text-base font-semibold',
        className
      )}
    >
      <Download className="size-[18px]" />
      {label(PLATFORM_NAMES[platform])}
    </a>
  );
}
