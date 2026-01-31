interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <iframe
      src={`/${slug}`}
      className="w-[375px] h-[667px] mt-8 border mx-auto"
      style={{
        transform: "scale(1)",
        transformOrigin: "top left",
        width: "375px",
        height: "667px",
      }}
    />
  );
}
