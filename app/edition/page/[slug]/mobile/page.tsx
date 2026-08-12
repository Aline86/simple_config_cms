export const instant = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;

  const basePath = `/edition/page/${slug}`;
  return (
    <div className="flex flex-col items-end m-4">
      <a
        title="Retour"
        href={basePath}
        className="w-[150px] text-center cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-600 transition"
      >
        Retour
      </a>

      <iframe
        src={`/${slug}`}
        className="w-[375px] h-[667px] mt-8 border mx-auto"
        style={{
          transform: "scale(1)",
          transformOrigin: "top left",
          width: "375px",
          height: "500px",
        }}
      />
    </div>
  );
}
