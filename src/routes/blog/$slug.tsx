import { createFileRoute, notFound } from '@tanstack/react-router';
import { MDXProvider } from '@mdx-js/react';
import { Calendar } from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { envConfigs } from '@/config';
import { PDFCRAFT_REPO } from '@/config/pdfcraft';
import { pageHead } from '@/lib/seo';
import { m } from '@/paraglide/messages.js';
import { getLocale, localizeUrl } from '@/paraglide/runtime.js';
import { Footer } from '@/blocks/footer';
import { Header } from '@/blocks/header';
import { RelatedGuides } from '@/blocks/related-guides';
import { MarkdownContent } from '@/components/markdown-content';
import { mdxComponents } from '@/components/mdx-components';
import { formatPostDate, loadLocalPost } from '@/content/posts';
import { getBlogPostFn } from '@/content/posts/server';

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const locale = getLocale();
    const post = await getBlogPostFn({ data: { slug: params.slug, locale } });
    if (!post) throw notFound();
    return { locale, post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { locale, post } = loaderData;
    const urlFor = (path: string) =>
      localizeUrl(`${envConfigs.app_url}${path}`, { locale }).href;
    const canonical = urlFor(`/blog/${post.slug}`);
    const image = new URL(post.image || '/og.jpg', envConfigs.app_url).href;
    const head = pageHead({
      title: `${post.title} | ${envConfigs.app_name}`,
      description: post.description,
      path: `/blog/${post.slug}`,
      locale,
    });
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.createdAt,
      inLanguage: locale === 'zh' ? 'zh-CN' : 'en',
      mainEntityOfPage: canonical,
      image: [image],
      author: {
        '@type': 'Organization',
        name: post.authorName || envConfigs.app_name,
      },
      publisher: {
        '@type': 'Organization',
        name: envConfigs.app_name,
        url: urlFor('/'),
      },
    };
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: m['guides.home']({}, { locale }),
          item: urlFor('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: m['blog.title']({}, { locale }),
          item: urlFor('/blog'),
        },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
      ],
    };
    return {
      ...head,
      meta: [
        ...head.meta.filter(
          (meta) =>
            !(
              'property' in meta &&
              [
                'og:type',
                'og:image',
                'og:image:width',
                'og:image:height',
                'og:image:alt',
              ].includes(meta.property ?? '')
            ) && !('name' in meta && meta.name === 'twitter:image')
        ),
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: image },
        { property: 'og:image:alt', content: post.imageAlt || post.title },
        { property: 'article:published_time', content: post.createdAt },
        { name: 'twitter:image', content: image },
      ],
      scripts: [article, breadcrumb].map((data) => ({
        type: 'application/ld+json',
        children: JSON.stringify(data).replace(/</g, '\\u003c'),
      })),
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { locale, post } = Route.useLoaderData();
  const LocalContent =
    post.source === 'local' ? loadLocalPost(post.slug, locale)?.default : null;
  const isShowcaseImage = post.image?.startsWith('/imgs/pdfcraft/');

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-5 py-12 md:px-8 md:py-16">
        <article className="mx-auto max-w-3xl">
          <nav
            aria-label={m['blog.back_to_blog']()}
            className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm"
          >
            <Link href="/" className="hover:text-brand">
              {m['guides.home']()}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-brand">
              {m['blog.title']()}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">
              {post.title}
            </span>
          </nav>
          <header className="border-border mt-8 mb-8 border-b pb-8">
            <h1 className="font-display text-4xl leading-[1.08] font-medium tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
                {post.description}
              </p>
            )}
            <div className="text-muted-foreground mt-5 flex flex-wrap items-center gap-4 text-sm">
              <time
                dateTime={post.createdAt}
                className="inline-flex items-center gap-1.5"
              >
                <Calendar className="size-4" />
                {formatPostDate(post.createdAt, locale)}
              </time>
              <span>{post.authorName || envConfigs.app_name}</span>
            </div>
          </header>
          {post.image && (
            <figure className="mb-10">
              <div className="sheet overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt || post.title}
                  srcSet={
                    isShowcaseImage
                      ? `${post.image.replace('-1600.webp', '-800.webp')} 800w, ${post.image} 1600w`
                      : undefined
                  }
                  sizes="(min-width: 768px) 768px, 100vw"
                  width={isShowcaseImage ? 1600 : undefined}
                  height={isShowcaseImage ? 1000 : undefined}
                  fetchPriority="high"
                  className="h-auto w-full"
                />
              </div>
              {post.imageCaption && (
                <figcaption className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {post.imageCaption}
                </figcaption>
              )}
            </figure>
          )}
          {LocalContent ? (
            <div className="text-foreground/90 text-base leading-8 [overflow-wrap:anywhere] [&_a]:underline [&_h2]:mt-12 [&_h2]:mb-5 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:leading-tight [&_h2]:font-medium [&_h3]:mt-7 [&_h3]:mb-3 [&_h3]:text-xl [&_li]:leading-8 [&_p]:my-4 [&_p]:leading-8">
              <MDXProvider components={mdxComponents}>
                <LocalContent />
              </MDXProvider>
            </div>
          ) : (
            <MarkdownContent content={post.content || ''} />
          )}
          {LocalContent && (
            <p className="text-muted-foreground border-border mt-10 border-t pt-5 text-sm leading-relaxed">
              {m['guides.image_note']()}{' '}
              <a href={PDFCRAFT_REPO} className="underline underline-offset-4">
                {m['guides.image_source']()}
              </a>
            </p>
          )}
          <RelatedGuides currentSlug={post.slug} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
