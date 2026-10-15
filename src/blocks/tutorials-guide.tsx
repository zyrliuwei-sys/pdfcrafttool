import { PDFCRAFT_VERSION } from '@/config/pdfcraft';
import { m } from '@/paraglide/messages.js';
import { CodeBlock } from '@/components/code-block';
import { PageHero } from '@/components/page-hero';
import { Screenshot } from '@/components/screenshot';

interface Lesson {
  id: string;
  title: string;
  intro: string;
  steps?: string[];
  code?: string;
  shot?: string;
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
      shot: 'twoup',
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
      shot: 'find',
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
      shot: 'organize',
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
      shot: 'split',
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
      shot: 'forms',
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
      shot: 'properties',
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

      <section className="px-4 pt-12 pb-24 sm:px-6 sm:pb-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[200px_1fr] lg:gap-20">
          <nav aria-label={m['pc.tut.toc']()} className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 text-sm font-semibold">{m['pc.tut.toc']()}</p>
              <ul className="border-border space-y-0.5 border-l">
                {[
                  ...items,
                  { id: 'shortcuts', title: m['pc.tut.shortcuts.title']() },
                ].map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      className="text-muted-foreground hover:text-foreground hover:border-brand -ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug transition"
                    >
                      {l.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="min-w-0">
            <p className="text-[17px] leading-[1.75]">
              {m['pc.tut.intro']({ version: PDFCRAFT_VERSION })}
            </p>

            {items.map((lesson) => (
              <article
                key={lesson.id}
                id={lesson.id}
                className="border-border scroll-mt-24 border-b py-14 last:border-0"
              >
                <h2 className="font-display text-3xl font-medium sm:text-[2.2rem]">
                  {lesson.title}
                </h2>
                <p className="text-muted-foreground mt-3 text-[17px] leading-relaxed">
                  {lesson.intro}
                </p>
                {lesson.steps && (
                  <ol className="mt-7 space-y-4">
                    {lesson.steps.map((step, j) => (
                      <li key={j} className="flex gap-4">
                        <span className="font-display text-brand w-5 shrink-0 text-xl leading-7 font-medium">
                          {j + 1}
                        </span>
                        <p className="leading-7">{step}</p>
                      </li>
                    ))}
                  </ol>
                )}
                {lesson.code && (
                  <div className="mt-7">
                    <CodeBlock code={lesson.code} />
                  </div>
                )}
                {lesson.shot && (
                  <Screenshot
                    name={lesson.shot}
                    alt={m['pc.common.screenshot_alt']({ what: lesson.title })}
                    sizes="(min-width: 1024px) 860px, 100vw"
                    className="mt-9"
                  />
                )}
                <p className="bg-accent text-accent-foreground mt-8 rounded-lg p-5 text-sm leading-relaxed">
                  <strong>{m['pc.tut.tip']()}: </strong>
                  {lesson.tip}
                </p>
              </article>
            ))}

            <article id="shortcuts" className="scroll-mt-24 pt-14">
              <h2 className="font-display text-3xl font-medium sm:text-[2.2rem]">
                {m['pc.tut.shortcuts.title']()}
              </h2>
              <div className="mt-7 overflow-x-auto">
                <table className="w-full text-left text-sm sm:text-[15px]">
                  <thead>
                    <tr className="border-foreground border-b-2">
                      <th className="py-3 pr-4 font-semibold">
                        {m['pc.tut.shortcuts.action']()}
                      </th>
                      <th className="py-3 pr-4 font-semibold">
                        {m['pc.tut.shortcuts.keys']()}
                      </th>
                      <th className="py-3 font-semibold">
                        {m['pc.tut.shortcuts.keys_win']()}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shortcuts.map((s) => (
                      <tr key={s.action}>
                        <td className="py-3 pr-4">{s.action}</td>
                        <td className="py-3 pr-4">
                          <kbd className="bg-muted rounded px-2 py-1 font-mono text-xs">
                            {s.mac}
                          </kbd>
                        </td>
                        <td className="py-3">
                          <kbd className="bg-muted rounded px-2 py-1 font-mono text-xs">
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
