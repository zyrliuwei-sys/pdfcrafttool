import { readFile, rename, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const snapshotPath = fileURLToPath(
  new URL('../src/config/pdfcraft-release.json', import.meta.url)
);
const repository = 'https://github.com/storytold/pdfcraft';

function validate(snapshot) {
  if (
    !/^\d+\.\d+\.\d+$/.test(snapshot.version) ||
    !Number.isFinite(Date.parse(snapshot.publishedAt)) ||
    !Array.isArray(snapshot.assets) ||
    !snapshot.assets.length
  ) {
    throw new Error('Invalid release metadata');
  }
  const prefix = `${repository}/releases/download/v${snapshot.version}/`;
  for (const asset of snapshot.assets) {
    if (
      !/^[A-Za-z0-9._-]+$/.test(asset.name) ||
      asset.url !== prefix + asset.name ||
      !Number.isSafeInteger(asset.size) ||
      asset.size <= 0
    ) {
      throw new Error('Invalid release asset');
    }
  }
  if (
    !snapshot.assets.some((a) => a.name === 'SHA256SUMS.txt') ||
    !snapshot.assets.some((a) => a.name.endsWith('-windows-x64.msi')) ||
    !snapshot.assets.some((a) => a.name.endsWith('-macos-universal.dmg'))
  ) {
    throw new Error('Release assets are incomplete');
  }
  return snapshot;
}

// Public, versioned snapshot keeps offline builds usable. Never produce guessed
// filenames: download links and sizes must exist in the GitHub release response.
try {
  const response = await fetch(
    'https://api.github.com/repos/storytold/pdfcraft/releases/latest',
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'PDFCraftTool-release-sync',
      },
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
  const release = await response.json();
  if (
    release.draft ||
    release.prerelease ||
    !/^v\d+\.\d+\.\d+$/.test(release.tag_name)
  ) {
    throw new Error('Expected a published stable version tag');
  }
  const snapshot = validate({
    version: release.tag_name.slice(1),
    publishedAt: release.published_at,
    assets: release.assets
      .filter(
        (a) =>
          a.name === 'SHA256SUMS.txt' ||
          /\.(?:dmg|msi|zip|AppImage|flatpak|deb|rpm|tar\.gz)$/.test(a.name)
      )
      .map((a) => ({
        name: a.name,
        size: a.size,
        url: a.browser_download_url,
      })),
  });
  const serialized = JSON.stringify(snapshot, null, 2) + '\n';
  if ((await readFile(snapshotPath, 'utf8').catch(() => '')) !== serialized) {
    await writeFile(snapshotPath + '.tmp', serialized);
    await rename(snapshotPath + '.tmp', snapshotPath);
  }
  console.log(
    `[PdfCraft] Release v${snapshot.version}: ${snapshot.assets.length} verified assets.`
  );
} catch (error) {
  // Fail the build if neither the API nor a valid checked-in snapshot is usable.
  const snapshot = validate(JSON.parse(await readFile(snapshotPath, 'utf8')));
  console.warn(
    `[PdfCraft] ${error.message}; using saved release v${snapshot.version} (${snapshot.publishedAt}).`
  );
}
