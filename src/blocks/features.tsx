import {
  Combine,
  Languages,
  LayoutGrid,
  Lock,
  Save,
  Search,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { m } from '@/paraglide/messages.js';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';

export function Features() {
  const items: {
    icon: LucideIcon;
    title: string;
    desc: string;
    wide?: boolean;
    tone?: string;
  }[] = [
    {
      icon: Languages,
      title: m['pc.features.render.title'](),
      desc: m['pc.features.render.desc'](),
      wide: true,
      tone: 'bg-brand-soft',
    },
    {
      icon: Search,
      title: m['pc.features.search.title'](),
      desc: m['pc.features.search.desc'](),
    },
    {
      icon: LayoutGrid,
      title: m['pc.features.organize.title'](),
      desc: m['pc.features.organize.desc'](),
    },
    {
      icon: Combine,
      title: m['pc.features.combine.title'](),
      desc: m['pc.features.combine.desc'](),
      wide: true,
      tone: 'bg-accent',
    },
    {
      icon: Save,
      title: m['pc.features.save.title'](),
      desc: m['pc.features.save.desc'](),
    },
    {
      icon: Lock,
      title: m['pc.features.secure.title'](),
      desc: m['pc.features.secure.desc'](),
      wide: true,
      tone: 'bg-muted',
    },
  ];

  return (
    <section id="features" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={m['pc.features.title']()}
          subtitle={m['pc.features.subtitle']()}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 80}
              className={cn(item.wide && 'md:col-span-2')}
            >
              <div
                className={cn(
                  'flex h-full flex-col justify-between gap-10 rounded-3xl p-8 sm:p-10',
                  item.tone ?? 'bg-card border-border border'
                )}
              >
                <span className="bg-background inline-flex size-12 items-center justify-center rounded-2xl shadow-sm">
                  <item.icon className="text-brand size-6" />
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
