import { cn } from '@/lib/utils';

/**
 * A real PdfCraft screenshot (public/imgs/pdfcraft/<name>-{800,1600}.webp,
 * 16:10) inside the dog-eared "sheet" frame.
 */
export function Screenshot({
  name,
  alt,
  priority,
  sizes = '(min-width: 1024px) 60vw, 100vw',
  className,
  frameClassName,
}: {
  name: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  frameClassName?: string;
}) {
  return (
    <div className={cn('sheet-lift', className)}>
      <div className={cn('sheet overflow-hidden', frameClassName)}>
        <img
          src={`/imgs/pdfcraft/${name}-1600.webp`}
          srcSet={`/imgs/pdfcraft/${name}-800.webp 800w, /imgs/pdfcraft/${name}-1600.webp 1600w`}
          sizes={sizes}
          width={1600}
          height={1000}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
