import { Lightbulb } from 'lucide-react';

import { m } from '@/paraglide/messages.js';
import { CodeBlock } from '@/components/code-block';
import { PageHero } from '@/components/page-hero';

interface Lesson {
  id: string;
  title: string;
  intro: string;
  steps?: string[];
  code?: string;
  tip: string;
}

const CLI_EXAMPLES = `# Structure of a PDF as JSON
pdfcraft-cli info form.pdf

# Reading-order text of page 3
pdfcraft-cli text paper.pdf --page 3

# Rotate pages 1-2, delete page 5, set the title
pdfcraft-cli edit in.pdf --rotate 1,2:90 --delete 5 --title "Q3" --out out.pdf

# Combine, extract, split
pdfcraft-cli combine report.pdf appendix.pdf --out combined.pdf
pdfcraft-cli extract report.pdf --pages 1,3,5 --out highlights.pdf
pdfcraft-cli split   report.pdf --every 10 --out-dir parts/

# More: run, tools, mcp, ui
pdfcraft-cli --help`;

function lessons(): Lesson[] {
  return [
    {
      id: 'open',
      title: m['pc.tut.open.title'](),
      intro: m['pc.tut.open.intro'](),
      steps: [
        m['pc.tut.open.1'](),
        m['pc.tut.open.2'](),
        m['pc.tut.open.3'](),
        m['pc.tut.open.4'](),
      ],
      tip: m['pc.tut.open.tip'](),
    },
    {
      id: 'search',
      title: m['pc.tut.search.title'](),
      intro: m['pc.tut.search.intro'](),
      steps: [
        m['pc.tut.search.1'](),
        m['pc.tut.search.2'](),
        m['pc.tut.search.3'](),
        m['pc.tut.search.4'](),
      ],
      tip: m['pc.tut.search.tip'](),
    },
    {
      id: 'organize',
      title: m['pc.tut.organize.title'](),
      intro: m['pc.tut.organize.intro'](),
      steps: [
        m['pc.tut.organize.1'](),
        m['pc.tut.organize.2'](),
        m['pc.tut.organize.3'](),
        m['pc.tut.organize.4'](),
      ],
      tip: m['pc.tut.organize.tip'](),
    },
    {
      id: 'combine',
      title: m['pc.tut.combine.title'](),
      intro: m['pc.tut.combine.intro'](),
      steps: [
        m['pc.tut.combine.1'](),
        m['pc.tut.combine.2'](),
        m['pc.tut.combine.3'](),
      ],
      tip: m['pc.tut.combine.tip'](),
    },
    {
      id: 'forms',
      title: m['pc.tut.forms.title'](),
      intro: m['pc.tut.forms.intro'](),
      steps: [
        m['pc.tut.forms.1'](),
        m['pc.tut.forms.2'](),
        m['pc.tut.forms.3'](),
        m['pc.tut.forms.4'](),
      ],
      tip: m['pc.tut.forms.tip'](),
    },
    {
      id: 'secure',
      title: m['pc.tut.secure.title'](),
      intro: m['pc.tut.secure.intro'](),
      steps: [
        m['pc.tut.secure.1'](),
        m['pc.tut.secure.2'](),
        m['pc.tut.secure.3'](),
      ],
      tip: m['pc.tut.secure.tip'](),
    },
    {
      id: 'save',
      title: m['pc.tut.save.title'](),
      intro: m['pc.tut.save.intro'](),
      steps: [m['pc.tut.save.1'](), m['pc.tut.save.2'](), m['pc.tut.save.3']()],
      tip: m['pc.tut.save.tip'](),
    },
    {
      id: 'cli',
      title: m['pc.tut.cli.title'](),
      intro: m['pc.tut.cli.intro'](),
      code: CLI_EXAMPLES,
      tip: m['pc.tut.cli.tip'](),
    },
  ];
}

export function TutorialsGuide() {
  const items = lessons();
  const click = m['pc.tut.sc.click']();
  const shortcuts = [
    { action: m['pc.tut.sc.palette'](), mac: '⌘ K', win: 'Ctrl K' },
    { action: m['pc.tut.sc.next'](), mac: '⌘ G', win: 'Ctrl G' },
    { action: m['pc.tut.sc.undo'](), mac: '⌘ Z', win: 'Ctrl Z' },
    { action: m['pc.tut.sc.save'](), mac: '⌘ S', win: 'Ctrl S' },
    {
      action: m['pc.tut.sc.multi'](),
      mac: `⌘ / ⇧ + ${click}`,
      win: `Ctrl / Shift + ${click}`,
    },
    { action: m['pc.tut.sc.prefs'](), mac: '⌘ ,', win: 'Ctrl ,' },
  ];

  return (
    <>
      <PageHero title={m['pc.tut.title']()} subtitle={m['pc.tut.subtitle']()} />

      <section className="px-4 pb-20 sm:px-6 sm:pb-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label={m['pc.tut.toc']()} className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                {m['pc.tut.toc']()}
              </p>
              <ul className="border-border space-y-1 border-l">
                {[
                  ...items,
                  { id: 'shortcuts', title: m['pc.tut.shortcuts.title']() },
                ].map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      className="text-muted-foreground hover:text-foreground hover:border-brand -ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm transition"
                    >
                      {l.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="min-w-0 space-y-6">
            {items.map((lesson, i) => (
              <article
                key={lesson.id}
                id={lesson.id}
                className="border-border bg-card scroll-mt-24 rounded-3xl border p-7 sm:p-10"
              >
                <span className="text-brand text-sm font-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
                  {lesson.title}
                </h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {lesson.intro}
                </p>
                {lesson.steps && (
                  <ol className="mt-6 space-y-3">
                    {lesson.steps.map((step, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="bg-foreground text-background inline-flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                          {j + 1}
                        </span>
                        <p className="leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                )}
                {lesson.code && (
                  <div className="mt-6">
                    <CodeBlock code={lesson.code} />
                  </div>
                )}
                <p className="bg-accent mt-6 flex gap-3 rounded-2xl p-4 text-sm leading-relaxed">
                  <Lightbulb className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>
                    <strong>{m['pc.tut.tip']()}: </strong>
                    {lesson.tip}
                  </span>
                </p>
              </article>
            ))}

            <article
              id="shortcuts"
              className="border-border bg-card scroll-mt-24 rounded-3xl border p-7 sm:p-10"
            >
              <h2 className="text-2xl font-extrabold tracking-tight">
                {m['pc.tut.shortcuts.title']()}
              </h2>
              <div className="border-border mt-6 overflow-x-auto rounded-2xl border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="px-4 py-3 font-semibold">
                        {m['pc.tut.shortcuts.action']()}
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        {m['pc.tut.shortcuts.keys']()}
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        {m['pc.tut.shortcuts.keys_win']()}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shortcuts.map((s) => (
                      <tr key={s.action} className="border-border border-t">
                        <td className="px-4 py-3">{s.action}</td>
                        <td className="px-4 py-3">
                          <kbd className="bg-muted rounded-md px-2 py-1 font-mono text-xs">
                            {s.mac}
                          </kbd>
                        </td>
                        <td className="px-4 py-3">
                          <kbd className="bg-muted rounded-md px-2 py-1 font-mono text-xs">
                            {s.win}
                          </kbd>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
