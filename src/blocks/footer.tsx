import {
  PDFCRAFT_DISCORD,
  PDFCRAFT_OFFICIAL,
  PDFCRAFT_RELEASES,
  PDFCRAFT_REPO,
} from '@/config/pdfcraft';
import { m } from '@/paraglide/messages.js';
import { FooterBadgeList } from '@/components/footer-badge-list';
import { SiteFooter, type FooterColumn } from '@/components/site-footer';

export function Footer() {
  const columns: FooterColumn[] = [
    {
      title: m['pc.footer.product'](),
      links: [
        { label: m['pc.nav.download'](), href: '/download' },
        { label: m['pc.nav.online'](), href: '/online' },
        { label: m['pc.nav.tutorials'](), href: '/tutorials' },
        { label: m['pc.nav.compare'](), href: '/pdfcraft-vs-adobe-acrobat' },
        { label: m['pc.nav.alternatives'](), href: '/alternatives' },
      ],
    },
    {
      title: m['pc.footer.resources'](),
      links: [
        { label: m['pc.footer.official'](), href: PDFCRAFT_OFFICIAL },
        { label: m['pc.footer.github'](), href: PDFCRAFT_REPO },
        { label: m['pc.footer.releases'](), href: PDFCRAFT_RELEASES },
        { label: m['pc.footer.discord'](), href: PDFCRAFT_DISCORD },
      ],
    },
    {
      title: m['pc.footer.company'](),
      links: [
        { label: m['pc.footer.about'](), href: '/about' },
        {
          label: 'support@pdfcrafttool.org',
          href: 'mailto:support@pdfcrafttool.org',
        },
        { label: m['landing.footer.privacy'](), href: '/privacy-policy' },
        { label: m['landing.footer.terms'](), href: '/terms-of-service' },
      ],
    },
  ];

  return (
    <>
      <SiteFooter
        tagline={m['pc.footer.tagline']()}
        columns={columns}
        badges={<FooterBadgeList className="mt-10" />}
      />
      <div className="bg-background border-border border-t">
        <p className="text-muted-foreground mx-auto max-w-[75rem] px-4 py-6 text-xs leading-relaxed sm:px-6">
          {m['pc.footer.disclaimer']()}
        </p>
      </div>
    </>
  );
}
