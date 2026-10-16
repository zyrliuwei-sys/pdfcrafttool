import { useEffect, useRef, useState, type DragEvent } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Download,
  FileStack,
  Images,
  Lock,
  Scissors,
  Upload,
  X,
} from 'lucide-react';

import { PDF_LIB_REPO } from '@/config/pdfcraft';
import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { Button } from '@/components/ui/button';

type Tool = 'merge' | 'split' | 'images';
type Output = { name: string; url: string; pages: number };

const ACCEPT: Record<Tool, string> = {
  merge: 'application/pdf,.pdf',
  split: 'application/pdf,.pdf',
  images: 'image/jpeg,image/png,image/webp,image/gif,image/bmp',
};

// Page sizes in PDF points (1/72 inch).
const PAGE_SIZES = {
  a4: [595.28, 841.89],
  letter: [612, 792],
} as const;
type PageSize = keyof typeof PAGE_SIZES | 'image';

const loadPdfLib = () => import('pdf-lib');

function baseName(name: string) {
  return name.replace(/\.[^.]+$/, '') || 'document';
}

/** "1-3, 5, 8-" → zero-based page index groups; null when malformed. */
function parseRanges(input: string, pageCount: number): number[][] | null {
  const groups: number[][] = [];
  for (const raw of input.split(/[,，;\s]+/).filter(Boolean)) {
    const hit = raw.match(/^(\d+)?(?:(-)(\d+)?)?$/);
    if (!hit || (!hit[1] && !hit[3])) return null;
    const start = hit[1] ? Number(hit[1]) : 1;
    const end = hit[2] ? (hit[3] ? Number(hit[3]) : pageCount) : start;
    if (start < 1 || end > pageCount || start > end) return null;
    groups.push(
      Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i)
    );
  }
  return groups.length ? groups : null;
}

/** JPEG and PNG embed directly; other formats are re-encoded as PNG first. */
async function imageBytes(
  file: File
): Promise<{ bytes: ArrayBuffer; kind: 'jpg' | 'png' }> {
  if (file.type === 'image/jpeg')
    return { bytes: await file.arrayBuffer(), kind: 'jpg' };
  if (file.type === 'image/png')
    return { bytes: await file.arrayBuffer(), kind: 'png' };
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('encode'))),
      'image/png'
    )
  );
  return { bytes: await blob.arrayBuffer(), kind: 'png' };
}

export function QuickTools() {
  const [tool, setTool] = useState<Tool>('merge');
  const [files, setFiles] = useState<File[]>([]);
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [splitMode, setSplitMode] = useState<'every' | 'ranges'>('every');
  const [every, setEvery] = useState(1);
  const [ranges, setRanges] = useState('');
  const [pageSize, setPageSize] = useState<PageSize>('a4');
  const inputRef = useRef<HTMLInputElement>(null);

  // Revoke object URLs when results are replaced or the block unmounts.
  useEffect(
    () => () => outputs.forEach((o) => URL.revokeObjectURL(o.url)),
    [outputs]
  );

  const reset = (next: Tool) => {
    setTool(next);
    setFiles([]);
    setOutputs([]);
    setError('');
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const picked = Array.from(list).filter((f) =>
      tool === 'images'
        ? f.type.startsWith('image/')
        : f.type === 'application/pdf' || /\.pdf$/i.test(f.name)
    );
    setOutputs([]);
    setError(picked.length ? '' : m['pc.qt.err_type']());
    setFiles((prev) =>
      tool === 'split' ? picked.slice(0, 1) : [...prev, ...picked]
    );
  };

  const move = (i: number, by: -1 | 1) =>
    setFiles((prev) => {
      const next = [...prev];
      const j = i + by;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const toUrl = (bytes: Uint8Array) =>
    URL.createObjectURL(
      new Blob([bytes as BlobPart], { type: 'application/pdf' })
    );

  async function loadPdf(file: File) {
    const { PDFDocument, EncryptedPDFError } = await loadPdfLib();
    try {
      return await PDFDocument.load(await file.arrayBuffer());
    } catch (e) {
      throw new Error(
        e instanceof EncryptedPDFError
          ? m['pc.qt.err_encrypted']({ name: file.name })
          : m['pc.qt.err_read']({ name: file.name })
      );
    }
  }

  async function run() {
    setBusy(true);
    setError('');
    setOutputs([]);
    try {
      const { PDFDocument } = await loadPdfLib();
      if (tool === 'merge') {
        const out = await PDFDocument.create();
        for (const f of files) {
          const src = await loadPdf(f);
          const pages = await out.copyPages(src, src.getPageIndices());
          pages.forEach((p) => out.addPage(p));
        }
        setOutputs([
          {
            name: 'merged.pdf',
            url: toUrl(await out.save()),
            pages: out.getPageCount(),
          },
        ]);
      } else if (tool === 'split') {
        const src = await loadPdf(files[0]);
        const count = src.getPageCount();
        let groups: number[][] | null;
        if (splitMode === 'every') {
          const n = Math.max(1, Math.floor(every) || 1);
          groups = Array.from({ length: Math.ceil(count / n) }, (_, g) =>
            src.getPageIndices().slice(g * n, g * n + n)
          );
        } else {
          groups = parseRanges(ranges, count);
          if (!groups) throw new Error(m['pc.qt.err_ranges']({ count }));
        }
        const stem = baseName(files[0].name);
        const result: Output[] = [];
        for (const group of groups) {
          const out = await PDFDocument.create();
          (await out.copyPages(src, group)).forEach((p) => out.addPage(p));
          const first = group[0] + 1;
          const last = group[group.length - 1] + 1;
          result.push({
            name: `${stem}-p${first}${last > first ? `-${last}` : ''}.pdf`,
            url: toUrl(await out.save()),
            pages: group.length,
          });
        }
        setOutputs(result);
      } else {
        const out = await PDFDocument.create();
        for (const f of files) {
          let img;
          try {
            const { bytes, kind } = await imageBytes(f);
            img =
              kind === 'jpg'
                ? await out.embedJpg(bytes)
                : await out.embedPng(bytes);
          } catch {
            throw new Error(m['pc.qt.err_read']({ name: f.name }));
          }
          if (pageSize === 'image') {
            out.addPage([img.width, img.height]).drawImage(img, {
              x: 0,
              y: 0,
              width: img.width,
              height: img.height,
            });
          } else {
            // Turn the page sideways for landscape images, then fit with a margin.
            let [w, h]: number[] = [...PAGE_SIZES[pageSize]];
            if (img.width > img.height) [w, h] = [h, w];
            const margin = 28;
            const scale = Math.min(
              (w - margin * 2) / img.width,
              (h - margin * 2) / img.height,
              1
            );
            const dw = img.width * scale;
            const dh = img.height * scale;
            out.addPage([w, h]).drawImage(img, {
              x: (w - dw) / 2,
              y: (h - dh) / 2,
              width: dw,
              height: dh,
            });
          }
        }
        setOutputs([
          {
            name:
              files.length === 1
                ? `${baseName(files[0].name)}.pdf`
                : 'images.pdf',
            url: toUrl(await out.save()),
            pages: out.getPageCount(),
          },
        ]);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  const tabs: { id: Tool; label: string; icon: typeof FileStack }[] = [
    { id: 'merge', label: m['pc.qt.merge'](), icon: FileStack },
    { id: 'split', label: m['pc.qt.split'](), icon: Scissors },
    { id: 'images', label: m['pc.qt.images'](), icon: Images },
  ];

  const canRun =
    !busy &&
    (tool === 'merge'
      ? files.length >= 2
      : tool === 'split'
        ? files.length === 1 && (splitMode === 'every' || ranges.trim() !== '')
        : files.length >= 1);

  const fieldClass =
    'border-input bg-background h-9 rounded-md border px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <section id="tools" className="scroll-mt-20 px-4 pt-16 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
            {m['pc.qt.title']()}
          </h2>
          <p className="text-muted-foreground mt-5 text-[17px] leading-[1.75]">
            {m['pc.qt.intro']()}
          </p>
        </div>

        <div className="sheet-lift mt-10">
          <div className="sheet p-5 [--fold-size:40px] sm:p-8">
            <div
              role="tablist"
              aria-label={m['pc.qt.title']()}
              className="border-border flex gap-1 overflow-x-auto border-b"
            >
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={tool === id}
                  onClick={() => reset(id)}
                  className={cn(
                    '-mb-px flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition sm:px-5',
                    tool === id
                      ? 'border-brand text-foreground'
                      : 'text-muted-foreground hover:text-foreground border-transparent'
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>

            <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
              {tool === 'merge'
                ? m['pc.qt.merge_help']()
                : tool === 'split'
                  ? m['pc.qt.split_help']()
                  : m['pc.qt.images_help']()}
            </p>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={cn(
                'mt-5 flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-4 py-9 text-center transition',
                dragging ? 'border-brand bg-accent' : 'border-border'
              )}
            >
              <Upload
                className="text-muted-foreground size-7"
                strokeWidth={1.5}
              />
              <p className="text-sm">
                {tool === 'images'
                  ? m['pc.qt.drop_images']()
                  : m['pc.qt.drop_pdf']()}
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
                className="rounded-full bg-transparent"
              >
                {m['pc.qt.choose']()}
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT[tool]}
                multiple={tool !== 'split'}
                className="sr-only"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = '';
                }}
              />
            </div>

            {files.length > 0 && (
              <ol className="mt-5 space-y-2">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="bg-muted/50 flex items-center gap-3 rounded-md px-3 py-2 text-sm"
                  >
                    <span className="text-muted-foreground w-5 font-mono text-xs">
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{f.name}</span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {f.size < 1024 * 1024
                        ? `${Math.max(1, Math.round(f.size / 1024))} KB`
                        : `${(f.size / 1024 / 1024).toFixed(1)} MB`}
                    </span>
                    {tool !== 'split' && (
                      <>
                        <button
                          type="button"
                          aria-label={m['pc.qt.up']()}
                          disabled={i === 0}
                          onClick={() => move(i, -1)}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                        >
                          <ArrowUp className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={m['pc.qt.down']()}
                          disabled={i === files.length - 1}
                          onClick={() => move(i, 1)}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                        >
                          <ArrowDown className="size-4" />
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      aria-label={m['pc.qt.remove']()}
                      onClick={() => {
                        setOutputs([]);
                        setFiles((prev) => prev.filter((_, j) => j !== i));
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                  </li>
                ))}
              </ol>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              {tool === 'split' && (
                <>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="split-mode"
                      checked={splitMode === 'every'}
                      onChange={() => setSplitMode('every')}
                    />
                    {m['pc.qt.split_every']()}
                    <input
                      type="number"
                      min={1}
                      value={every}
                      onChange={(e) => setEvery(Number(e.target.value))}
                      onFocus={() => setSplitMode('every')}
                      className={cn(fieldClass, 'w-20')}
                    />
                    {m['pc.qt.split_pages']()}
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="split-mode"
                      checked={splitMode === 'ranges'}
                      onChange={() => setSplitMode('ranges')}
                    />
                    {m['pc.qt.split_ranges']()}
                    <input
                      type="text"
                      value={ranges}
                      placeholder="1-3, 5, 8-"
                      onChange={(e) => setRanges(e.target.value)}
                      onFocus={() => setSplitMode('ranges')}
                      className={cn(fieldClass, 'w-36')}
                    />
                  </label>
                </>
              )}
              {tool === 'images' && (
                <label className="flex items-center gap-2">
                  {m['pc.qt.page_size']()}
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as PageSize)}
                    className={fieldClass}
                  >
                    <option value="a4">A4</option>
                    <option value="letter">US Letter</option>
                    <option value="image">{m['pc.qt.page_image']()}</option>
                  </select>
                </label>
              )}
              <Button
                type="button"
                onClick={run}
                disabled={!canRun}
                className="ml-auto h-10 rounded-full px-6 font-semibold"
              >
                {busy
                  ? m['pc.qt.working']()
                  : tool === 'merge'
                    ? m['pc.qt.run_merge']()
                    : tool === 'split'
                      ? m['pc.qt.run_split']()
                      : m['pc.qt.run_images']()}
              </Button>
            </div>

            {error && (
              <p role="alert" className="text-destructive mt-4 text-sm">
                {error}
              </p>
            )}

            {outputs.length > 0 && (
              <div className="border-border mt-6 border-t pt-5">
                <p className="text-sm font-semibold">{m['pc.qt.done']()}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {outputs.map((o) => (
                    <li key={o.url}>
                      <a
                        href={o.url}
                        download={o.name}
                        className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold hover:opacity-90"
                      >
                        <Download className="size-4" />
                        {o.name}
                        <span className="opacity-70">
                          {m['pc.qt.pages']({ count: o.pages })}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-muted-foreground mt-6 flex gap-2 text-xs leading-relaxed">
              <Lock className="mt-0.5 size-3.5 shrink-0" />
              <span>
                {m['pc.qt.privacy']()}{' '}
                <a
                  href={PDF_LIB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  pdf-lib
                </a>
                {m['pc.qt.credit_post']()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
