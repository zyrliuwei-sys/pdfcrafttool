import postMetadata from './metadata.json';

// Only published project guides belong in the homepage, blog and sitemap.
export const BLOG_POST_SLUGS = [
  'pdfcraft-tutorial-beginners',
  'switch-from-adobe-acrobat-to-pdfcraft',
  'pdfcraft-windows-installation',
  'pdfcraft-linux-installation',
  'pdfcraft-ocr-scanned-pdf',
  'pdfcraft-fill-sign-pdf-test',
  'pdfcraft-pdf-to-word-layout',
] as const;

export type BlogPostMeta = {
  title: string;
  description: string;
  created_at: string;
  author_name?: string;
  author_image?: string;
  image?: string;
  image_alt?: string;
  image_caption?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  createdAt: string;
  authorName?: string;
  authorImage?: string;
  source: 'local' | 'db';
};

export type BlogPostDetail = BlogPost & { content?: string };

// Keep metadata independent of MDX modules: importing meta from MDX still
// groups their component exports into a shared client chunk in production.
const metadata: Record<string, BlogPostMeta> = postMetadata;

export function getPostLocales(slug: string): ('en' | 'zh')[] {
  return (['en', 'zh'] as const).filter(
    (locale) => metadata[`${slug}.${locale}`]
  );
}

export function getLocalPosts(locale: string): BlogPost[] {
  return BLOG_POST_SLUGS.flatMap((slug) => {
    const meta = metadata[`${slug}.${locale}`];
    if (!meta) return [];
    return [
      {
        slug,
        title: meta.title,
        description: meta.description,
        image: meta.image,
        imageAlt: meta.image_alt,
        imageCaption: meta.image_caption,
        createdAt: new Date(meta.created_at).toISOString(),
        authorName: meta.author_name,
        authorImage: meta.author_image,
        source: 'local' as const,
      },
    ];
  });
}

export function mergePosts(
  dbPosts: BlogPost[],
  localPosts: BlogPost[],
  options: { limit?: number } = {}
): BlogPost[] {
  const dbSlugs = new Set(dbPosts.map((post) => post.slug));
  const merged = [
    ...dbPosts,
    ...localPosts.filter((post) => !dbSlugs.has(post.slug)),
  ].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return options.limit ? merged.slice(0, options.limit) : merged;
}

export function formatPostDate(dateIso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: locale === 'zh' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(dateIso));
}
