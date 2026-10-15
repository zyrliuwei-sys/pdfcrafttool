import { createFileRoute } from '@tanstack/react-router';

import { envConfigs } from '@/config';
import { m } from '@/paraglide/messages.js';

const STATIC_PAGES: { path: string; title: string; description: string }[] = [
  {
    path: '',
    title: 'PdfCraft: free open-source PDF editor guide',
    description:
      'What PdfCraft is, its features, platforms and how it compares with Adobe Acrobat',
  },
  {
    path: '/download',
    title: 'Download PdfCraft',
    description:
      'Official PdfCraft download links and install steps for Windows, macOS, Linux, FreeBSD and the web',
  },
  {
    path: '/online',
    title: 'PdfCraft Online',
    description:
      'Use the PdfCraft web app in your browser; files never leave your device',
  },
  {
    path: '/tutorials',
    title: 'PdfCraft tutorials',
    description:
      'How to open, search, organize, combine, split and protect PDFs with PdfCraft, plus CLI and shortcuts',
  },
  {
    path: '/pdfcraft-vs-adobe-acrobat',
    title: 'PdfCraft vs Adobe Acrobat',
    description:
      'Feature, price and platform comparison between PdfCraft and Adobe Acrobat',
  },
  {
    path: '/about',
    title: 'About PDFCraftTool',
    description:
      'Who runs this independent PdfCraft guide and how to contact us (support@pdfcrafttool.org)',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description: 'Privacy information',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service',
    description: 'Terms of use',
  },
];

export const Route = createFileRoute('/llms-full.txt')({
  server: {
    handlers: {
      GET: async () => {
        const { app_url, app_name } = envConfigs;

        const lines: string[] = [
          `# ${app_name}`,
          '',
          `> ${m['common.metadata.description']({}, { locale: 'en' })}`,
          '',
          '## Pages',
          '',
          ...STATIC_PAGES.map(
            (p) => `- [${p.title}](${app_url}${p.path}): ${p.description}`
          ),
        ];

        let posts: {
          slug: string;
          title: string;
          description: string;
          source: 'db';
        }[] = [];
        try {
          const { listPublishedArticles, findPublishedBySlug } =
            await import('@/modules/posts/service');
          const rows = await listPublishedArticles().catch(() => []);
          const dbPosts = rows.map((row) => ({
            slug: row.slug,
            title: row.title || row.slug,
            description: row.description || '',
            createdAt: new Date(row.createdAt).toISOString(),
            source: 'db' as const,
          }));
          posts = dbPosts;

          if (posts.length > 0) {
            lines.push('', '## Blog Posts', '');

            for (const post of posts) {
              lines.push(`### ${post.title}`, '');
              lines.push(`URL: ${app_url}/blog/${post.slug}`);
              if (post.description)
                lines.push(`Description: ${post.description}`);
              lines.push('');

              if (post.source === 'db') {
                const detail = await findPublishedBySlug(post.slug).catch(
                  () => null
                );
                if (detail?.content) {
                  lines.push(detail.content, '');
                }
              }

              lines.push('---', '');
            }
          }
        } catch {
          // Database unreachable — static project pages still listed.
        }

        lines.push('');

        return new Response(lines.join('\n'), {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
