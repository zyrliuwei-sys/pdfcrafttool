import type { ComponentType } from 'react';

import { BLOG_POST_SLUGS } from './catalog';

export * from './catalog';

type PostModule = { default: ComponentType };
const postModules = import.meta.glob<PostModule>('./*.mdx', { eager: true });

export function loadLocalPost(slug: string, locale: string): PostModule | null {
  if (!BLOG_POST_SLUGS.includes(slug as (typeof BLOG_POST_SLUGS)[number]))
    return null;
  return postModules[`./${slug}.${locale}.mdx`] ?? null;
}
