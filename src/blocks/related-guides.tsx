import { ArrowRight } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { m } from '@/paraglide/messages.js';
import { getLocale } from '@/paraglide/runtime.js';
import { getLocalPosts } from '@/content/posts/catalog';

export function RelatedGuides({ currentSlug }: { currentSlug: string }) {
  const guides = getLocalPosts(getLocale()).filter(
    (guide) => guide.slug !== currentSlug
  );
  return (
    <aside
      className="border-border mt-14 border-t pt-8"
      aria-label={m['guides.related']()}
    >
      <h2 className="font-display text-3xl font-medium">
        {m['guides.related']()}
      </h2>
      <ul className="mt-5 space-y-4">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/blog/${guide.slug}`}
              className="hover:text-brand inline-flex items-start gap-2 font-medium underline-offset-4 hover:underline"
            >
              <ArrowRight className="mt-1 size-4 shrink-0" />
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/#guides"
        className="text-brand mt-7 inline-flex items-center gap-2 font-semibold"
      >
        {m['guides.back_home']()}
        <ArrowRight className="size-4" />
      </Link>
    </aside>
  );
}
