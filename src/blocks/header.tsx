import { m } from '@/paraglide/messages.js';
import { SiteHeader } from '@/components/site-header';

export function Header() {
  const navLinks = [
    { href: '/online', label: m['pc.nav.online']() },
    { href: '/tutorials', label: m['pc.nav.tutorials']() },
    { href: '/pdfcraft-vs-adobe-acrobat', label: m['pc.nav.compare']() },
  ];

  return (
    <SiteHeader
      navLinks={navLinks}
      logoAlt={m['pc.logo_alt']()}
      cta={{ href: '/download', label: m['pc.nav.cta']() }}
    />
  );
}
