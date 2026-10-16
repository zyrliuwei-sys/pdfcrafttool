import { Info } from 'lucide-react';

import { OTHER_PDFCRAFT_REPO, PDFCRAFT_REPO } from '@/config/pdfcraft';
import { m } from '@/paraglide/messages.js';

const repoLink =
  'font-mono text-[0.92em] font-semibold text-foreground underline underline-offset-4 break-all';

/**
 * Two unrelated GitHub projects are called "PdfCraft". Say up front which one
 * this site covers, so nobody installs the wrong thing.
 */
export function ProjectNotice() {
  return (
    <section
      aria-labelledby="which-pdfcraft"
      className="px-4 pt-12 sm:px-6 sm:pt-14"
    >
      <div className="border-brand bg-accent mx-auto flex max-w-6xl gap-4 rounded-lg border-l-4 p-5 sm:gap-5 sm:p-7">
        <Info
          className="text-brand mt-0.5 size-6 shrink-0"
          strokeWidth={1.75}
        />
        <div className="min-w-0 text-[15px] leading-relaxed sm:text-base">
          <h2 id="which-pdfcraft" className="text-lg font-semibold">
            {m['pc.notice.title']()}
          </h2>
          <p className="mt-2">
            {m['pc.notice.this_pre']()}{' '}
            <a
              href={PDFCRAFT_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className={repoLink}
            >
              github.com/storytold/pdfcraft
            </a>
            {m['pc.notice.this_post']()}
          </p>
          <p className="text-muted-foreground mt-2">
            {m['pc.notice.other_pre']()}{' '}
            <a
              href={OTHER_PDFCRAFT_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className={repoLink}
            >
              github.com/PDFCraftTool/pdfcraft
            </a>
            {m['pc.notice.other_post']()}
          </p>
        </div>
      </div>
    </section>
  );
}
