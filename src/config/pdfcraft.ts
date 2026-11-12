import release from './pdfcraft-release.json';

// Refreshed from the official GitHub release at build time.
export const PDFCRAFT_VERSION = release.version;
export const PDFCRAFT_RELEASE_DATE = release.publishedAt.slice(0, 10);

export const PDFCRAFT_REPO = 'https://github.com/storytold/pdfcraft';
export const PDFCRAFT_RELEASES = `${PDFCRAFT_REPO}/releases`;
export const PDFCRAFT_OFFICIAL = 'https://getartcraft.com/apps/pdfcraft';
export const PDFCRAFT_DISCORD = 'https://discord.gg/artcraft';
export const CRAFT_LAUNCHER =
  'https://github.com/storytold/craft-launcher/releases';
export const ACROBAT_OFFICIAL = 'https://www.adobe.com/acrobat.html';
export const ACROBAT_PRICING = 'https://www.adobe.com/acrobat/pricing.html';

// The unrelated browser toolkit that shares the PdfCraft name. Mentioned only
// so visitors can tell the two projects apart.
export const OTHER_PDFCRAFT_REPO = 'https://github.com/PDFCraftTool/pdfcraft';
// Library behind the site's own merge / split / images-to-PDF tools.
export const PDF_LIB_REPO = 'https://github.com/Hopding/pdf-lib';
export const FOXIT_EDITOR = 'https://www.foxit.com/pdf-editor/';
export const PDFSAM = 'https://pdfsam.org';
export const OKULAR = 'https://okular.kde.org';

const releaseFile = (file: string) => {
  const entry = release.assets.find((item) => item.name === file);
  if (!entry)
    throw new Error(`Missing official PdfCraft release asset: ${file}`);
  return entry.url;
};

export const PDFCRAFT_CHECKSUMS = releaseFile('SHA256SUMS.txt');

export type PlatformId = 'macos' | 'windows' | 'linux' | 'freebsd' | 'web';

export interface DownloadAsset {
  /** Short label, e.g. "x64 installer (.msi)" — not translated (technical). */
  label: string;
  file: string;
  url: string;
  /** Size in MB as published on the release. */
  sizeMb: number;
  recommended?: boolean;
}

const asset = (
  label: string,
  file: string,
  recommended?: boolean
): DownloadAsset[] => {
  const entry = release.assets.find((item) => item.name === file);
  return entry
    ? [
        {
          label,
          file,
          url: entry.url,
          sizeMb: Math.round(entry.size / 1_000_000),
          recommended,
        },
      ]
    : [];
};

const v = PDFCRAFT_VERSION;

export const DOWNLOADS: Record<PlatformId, DownloadAsset[]> = {
  macos: [
    ...asset(
      'Universal .dmg for Apple silicon and Intel',
      `pdfcraft-${v}-macos-universal.dmg`,
      true
    ),
    ...asset(
      'Command-line tool (.zip)',
      `pdfcraft-cli-${v}-macos-universal.zip`
    ),
  ],
  windows: [
    ...asset('x64 installer (.msi)', `pdfcraft-${v}-windows-x64.msi`, true),
    ...asset('x64 portable (.zip)', `pdfcraft-${v}-windows-x64-portable.zip`),
    ...asset('ARM64 installer (.msi)', `pdfcraft-${v}-windows-arm64.msi`),
    ...asset(
      'ARM64 portable (.zip)',
      `pdfcraft-${v}-windows-arm64-portable.zip`
    ),
    ...asset('x86 32-bit installer (.msi)', `pdfcraft-${v}-windows-x86.msi`),
    ...asset(
      'x86 32-bit portable (.zip)',
      `pdfcraft-${v}-windows-x86-portable.zip`
    ),
  ],
  linux: [
    ...asset('x86_64 AppImage', `pdfcraft-${v}-linux-x86_64.AppImage`, true),
    ...asset('x86_64 Flatpak', `pdfcraft-${v}-linux-x86_64.flatpak`),
    ...asset('x86_64 .deb (Debian/Ubuntu)', `pdfcraft-${v}-linux-x86_64.deb`),
    ...asset('x86_64 .rpm (Fedora/openSUSE)', `pdfcraft-${v}-linux-x86_64.rpm`),
    ...asset('x86_64 tarball', `pdfcraft-${v}-linux-x86_64.tar.gz`),
    ...asset('ARM64 AppImage', `pdfcraft-${v}-linux-aarch64.AppImage`),
    ...asset('ARM64 Flatpak', `pdfcraft-${v}-linux-aarch64.flatpak`),
    ...asset('ARM64 .deb', `pdfcraft-${v}-linux-aarch64.deb`),
    ...asset('ARM64 .rpm', `pdfcraft-${v}-linux-aarch64.rpm`),
    ...asset('ARM64 tarball', `pdfcraft-${v}-linux-aarch64.tar.gz`),
    ...asset('RISC-V 64 .deb', `pdfcraft-${v}-linux-riscv64.deb`),
    ...asset('RISC-V 64 .rpm', `pdfcraft-${v}-linux-riscv64.rpm`),
    ...asset('RISC-V 64 tarball', `pdfcraft-${v}-linux-riscv64.tar.gz`),
    ...asset('CLI x86_64 (.tar.gz)', `pdfcraft-cli-${v}-linux-x86_64.tar.gz`),
    ...asset('CLI ARM64 (.tar.gz)', `pdfcraft-cli-${v}-linux-aarch64.tar.gz`),
  ],
  freebsd: [
    ...asset('x86_64 tarball', `pdfcraft-${v}-freebsd-x86_64.tar.gz`, true),
  ],
  web: [
    ...asset(
      'Static web build (WebAssembly .zip)',
      `pdfcraft-web-${v}.zip`,
      true
    ),
  ],
};

export const PLATFORM_IDS: PlatformId[] = [
  'windows',
  'macos',
  'linux',
  'freebsd',
  'web',
];

export const PLATFORM_NAMES: Record<PlatformId, string> = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  freebsd: 'FreeBSD',
  web: 'Web',
};
