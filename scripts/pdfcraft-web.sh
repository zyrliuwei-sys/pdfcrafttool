#!/usr/bin/env bash
# Publish the official PdfCraft WebAssembly build to a Cloudflare R2 bucket so
# /online can embed it. (The .wasm is ~38 MB — over the 25 MiB Workers static
# asset limit — so it can't ship inside this app's build.)
#
#   scripts/pdfcraft-web.sh <r2-bucket> [version]
#
# Then attach a custom domain to the bucket (e.g. app.pdfcrafttool.org) in the
# Cloudflare dashboard and set
# VITE_PDFCRAFT_WEB_URL=https://app.pdfcrafttool.org/index.html
# (R2 doesn't map "/" to index.html, so point at the file itself.)
set -euo pipefail

BUCKET="${1:?usage: scripts/pdfcraft-web.sh <r2-bucket> [version]}"
VERSION="${2:-$(sed -n "s/^export const PDFCRAFT_VERSION = '\(.*\)';/\1/p" src/config/pdfcraft.ts)}"
BASE="https://github.com/storytold/pdfcraft/releases/download/v${VERSION}"
ZIP="pdfcraft-web-${VERSION}.zip"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "→ Downloading ${ZIP}"
curl -fsSL -o "$WORK/$ZIP" "$BASE/$ZIP"
curl -fsSL -o "$WORK/SHA256SUMS.txt" "$BASE/SHA256SUMS.txt"
(cd "$WORK" && grep " ${ZIP}\$" SHA256SUMS.txt | shasum -a 256 -c -)

unzip -q "$WORK/$ZIP" -d "$WORK/out"
SITE="$WORK/out/pdfcraft-web-${VERSION}"

put() { # file key content-type cache-control
  npx wrangler r2 object put "${BUCKET}/$2" --file "$1" --content-type "$3" \
    --cache-control "$4" --remote
}

for f in "$SITE"/*.wasm; do
  put "$f" "$(basename "$f")" application/wasm "public, max-age=31536000, immutable"
done
for f in "$SITE"/*.js; do
  put "$f" "$(basename "$f")" text/javascript "public, max-age=31536000, immutable"
done
put "$SITE/index.html" index.html "text/html; charset=utf-8" "no-cache"

echo "✓ PdfCraft web ${VERSION} uploaded to r2://${BUCKET}"
