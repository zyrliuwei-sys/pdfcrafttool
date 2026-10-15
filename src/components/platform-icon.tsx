import { AppWindow, Globe, Laptop, Server, Terminal } from 'lucide-react';

import type { PlatformId } from '@/config/pdfcraft';

const ICONS = {
  windows: AppWindow,
  macos: Laptop,
  linux: Terminal,
  freebsd: Server,
  web: Globe,
} as const;

export function PlatformIcon({
  platform,
  className,
}: {
  platform: PlatformId;
  className?: string;
}) {
  const Icon = ICONS[platform];
  return <Icon className={className} />;
}
