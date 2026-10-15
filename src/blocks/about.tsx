import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';

export function About() {
  return (
    <section id="what-is-pdfcraft" className="px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="mx-auto max-w-6xl">
        <h2 className="font-display text-[2rem] leading-[1.1] font-medium sm:text-5xl">
          {m['pc.about.title']()}
        </h2>
        <div className="mt-10 gap-12 text-[17px] leading-[1.75] md:columns-2">
          <p className="first-letter:font-display first-letter:text-brand mb-6 first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:font-medium">
            {m['pc.about.p1']()}
          </p>
          <p className="mb-6">{m['pc.about.p2']()}</p>
          <p className="text-muted-foreground">{m['pc.about.p3']()}</p>
        </div>
      </Reveal>
    </section>
  );
}
