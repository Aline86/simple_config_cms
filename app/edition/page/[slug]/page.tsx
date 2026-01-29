import getPageBySlug from "./callPages";
import PageClient from "./PageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);
  console.log("pge", page);
  if (!page) {
    return <div>Page non trouvée</div>;
  }

  return <PageClient initialpage={page} />;
}
