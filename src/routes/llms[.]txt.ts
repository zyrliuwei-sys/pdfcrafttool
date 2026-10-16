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
      'PdfCraft download links (to the github.com/storytold/pdfcraft releases) and install steps for Windows, macOS, Linux, FreeBSD and the web',
  },
  {
    path: '/online',
    title: 'PdfCraft Online',
    description:
      'Use the PdfCraft web app in your browser; files never leave your device',
  },
  {
    path: '/alternatives',
    title: 'PdfCraft alternatives',
    description:
      'When PdfCraft fits, when it does not, and how it compares with Adobe Acrobat, Foxit PDF Editor, PDFsam Basic, Okular and the unrelated PDFCraftTool/pdfcraft browser toolkit',
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
    title: 'About PDFCraftTool.org',
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

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        const { app_url, app_name } = envConfigs;

        let posts: { slug: string; title: string; description: string }[] = [];
        try {
          const { listPublishedArticles } =
            await import('@/modules/posts/service');
          const rows = await listPublishedArticles().catch(() => []);
          posts = rows.map((row) => ({
            slug: row.slug,
            title: row.title || row.slug,
            description: row.description || '',
          }));
        } catch {
          // Database unreachable — static project pages still listed.
        }

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

        if (posts.length > 0) {
          lines.push('', '## Blog Posts', '');
          for (const post of posts) {
            lines.push(
              `- [${post.title}](${app_url}/blog/${post.slug}): ${post.description}`
            );
          }
        }

        lines.push('');

        return new Response(lines.join('\n'), {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      },
    },
  },
});
