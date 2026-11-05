import { Screenshot } from '@/components/screenshot';

export function GuideFigure({
  name,
  alt,
  caption,
}: {
  name: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-10">
      <Screenshot
        name={name}
        alt={alt}
        sizes="(min-width: 768px) 768px, 100vw"
      />
      <figcaption className="text-muted-foreground mt-4 text-sm leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}
