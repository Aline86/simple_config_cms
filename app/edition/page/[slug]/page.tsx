import { getPageBySlug, getPageHeader } from "./callPages";
import PageClient from "./PageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) {
    return <div>Page non trouvée</div>;
  }
  const header = await getPageHeader();

  if (!header) {
    return <div>PB lors du chargement du header</div>;
  }
  return <PageClient initialpage={page} header={header} />;
}
