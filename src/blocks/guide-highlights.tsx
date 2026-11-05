import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { getLocalPosts } from '@/content/posts/catalog';

export function GuideHighlights() {
  const guides = getLocalPosts(getLocale());
  return (
    <section
      id="guides"
      className="border-border border-t px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-brand mb-3 font-mono text-xs tracking-widest uppercase">
              {m['guides.eyebrow']()}
            </p>
            <h2 className="font-display text-4xl font-medium sm:text-5xl">
              {m['landing.blog.title']()}
            </h2>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {m['landing.blog.description']()}
            </p>
          </div>
          <Link
            href="/blog"
            className="text-brand inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
          >
            {m['landing.blog.view_all']()}
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/blog/${guide.slug}`}
              className="group min-w-0"
            >
              <div className="sheet mb-5 overflow-hidden">
                <img
                  src={guide.image?.replace('-1600.webp', '-800.webp')}
                  alt={guide.imageAlt ?? guide.title}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[8/5] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <span className="text-brand font-mono text-xs">0{index + 1}</span>
              <h3 className="font-display mt-2 text-2xl leading-tight font-medium group-hover:underline group-hover:underline-offset-4">
                {guide.title}
              </h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                {guide.description}
              </p>
              <span className="text-brand mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                {m['blog.read_more']()}
                <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
