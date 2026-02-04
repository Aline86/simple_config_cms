import { getPageBySlug, getPageFooter, getPageHeader } from "./callPages";
import PageClient from "./PageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) {
    return <body>Page non trouvée</body>;
  }
  const header = await getPageHeader();

  if (!header) {
    return <body>PB lors du chargement du header</body>;
  }
  const footer = await getPageFooter();

  if (!footer) {
    return <body>PB lors du chargement du header</body>;
  }
  return (
    <PageClient
      initialpage={page.page}
      header={header.header}
      footer={footer.footer}
    />
  );
}
