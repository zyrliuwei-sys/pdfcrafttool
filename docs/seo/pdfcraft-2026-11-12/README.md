# AdSense preparation and PdfCraft checks — 12 November 2026

## Reproducible article checks

- Upstream release: https://github.com/storytold/pdfcraft/releases/tag/v0.21.1
- Published: 2026-11-12T02:18:37Z, confirmed through the GitHub releases API.
- Tested package: `pdfcraft-cli-0.21.1-macos-universal.zip`.
- Package SHA-256: `337a9f644744b57e10de41c57366e53c5ccf8840a4d5dc7322b17b9b83fdc2fa`, matched the release API digest before execution.
- Host: macOS 26.4.1, arm64.
- OCR fallback: installed Tesseract 5.5.3 through PdfCraft's `ocr_recognize` tool.
- Independent checks: pypdf 6.21.4 (text, field tree, widgets and appearances), Poppler (visual renders), DOCX XML inspection and LibreOfficeDev 26.8.0.0.alpha0 (Word-export preview).
- These are CLI tests on synthetic inputs. No desktop GUI, browser-build, Microsoft Word or cross-platform test is claimed.

`make-fixtures.py` recreates the synthetic input PDFs using ReportLab and Poppler. The JSON step files are the actual automation sequences. To reproduce, place the inputs and step file together, change to that directory, then run:

```sh
pdfcraft-cli run --script forms-steps.json --root . --report
pdfcraft-cli run --script ocr-tesseract-steps.json --root . --report
pdfcraft-cli run --script word-steps.json --root . --report
```

`ocr-steps.json` intentionally records the original built-in-engine attempt, which failed because models were unavailable. `ocr-report.json` preserves that failure. Other report files preserve the successful runs. Absolute temporary paths have been replaced with filenames. Input and output samples are published under `public/samples/pdfcraft-2026-11-12/`; article images under `public/imgs/reviews/` are renders of those actual files.

### Observations

1. **OCR:** the image-only input had no extractable text. Built-in OCR failed due to unavailable models. Tesseract through PdfCraft produced searchable output; reopening independently recovered `SCAN-108B`, `12 November 2026`, `4.50 USD` and `54.00 USD`. No general accuracy or speed claim is made.
2. **Form and visible signature:** the reopened PDF retained both text fields and the checkbox value. Canonical fields and widgets agreed; all three widgets had appearance streams. The visible typed signature was a `/Stamp` annotation, not a certificate signature. Its appearance was rendered independently.
3. **Word export:** the operation reported no truncated pages. DOCX text included the report title and amounts, and tables were present. LibreOffice showed changed column proportions, a wrapped Amount heading, no colored banner/chart bars, an invisible title, and a footer moved into the body flow. These visual findings are renderer-specific; Microsoft Word was not tested. The unedited export is intentionally published for comparison.

## Maintenance changes

The site build refreshes `src/config/pdfcraft-release.json` from the official GitHub API. Ordinary and Cloudflare build scripts invoke the synchronizer. A validated checked-in snapshot is used with a warning if GitHub is unavailable; an invalid or missing snapshot fails the build. This refreshes the latest release when a build runs, not continuously between deployments. The separately hosted web app is not upgraded by this change and no longer claims the current desktop release number.

The contact page and three new articles are English-only. Their Chinese paths return 404 and are absent from sitemap and hreflang. Existing Chinese pages are not expanded; only obsolete version statements were removed from shared translation data. The four existing homepage guide cards remain in place; the blog index and related-guide links expose all seven English guides.

The publisher supplied `pub-2841223102464177`. It is the default public account for the AdSense loader, account meta tag and single-line ads.txt response. A valid admin setting may override it consistently in all three places. The support address has domain MX records, but inbox delivery was not tested and no email was sent.

Build, response and browser verification results are recorded in `validation.json`. These are local code changes; deployment is a separate operation.
