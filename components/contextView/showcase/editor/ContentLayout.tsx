type ImagePosition = "top" | "left" | "right";

interface LayoutProps {
  position: ImagePosition;
  title: string | null;
  images: React.ReactNode;
  text: React.ReactNode;
  hasImages: boolean;
  hasText: boolean;
}

export default function ContentLayout({
  position,
  title,
  images,
  text,
  hasImages,
  hasText,
}: LayoutProps) {
  // Configuration des layouts
  const layouts: Record<ImagePosition, React.ReactNode> = {
    top: (
      <>
        {hasImages && <div className="w-full mb-8">{images}</div>}
        {hasText && text}
      </>
    ),
    right: (
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {hasText && <div className="flex-1 order-2 lg:order-1">{text}</div>}
        {hasImages && (
          <div className="w-full lg:w-1/3 order-1 lg:order-2">{images}</div>
        )}
      </div>
    ),
    left: (
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {hasImages && <div className="w-full lg:w-1/3">{images}</div>}
        {hasText && <div className="flex-1">{text}</div>}
      </div>
    ),
  };

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        {title}
      </h2>
      {layouts[position] !== undefined && layouts[position]}
    </section>
  );
}
