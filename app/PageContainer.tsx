import { PageObject } from "../database/model/Page";
import getHomePage, {
  getPageBySlug,
  getPageFooter,
  getPageHeader,
} from "./[slug]/callPages";
import PageClient from "./[slug]/PageClient";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PageObject>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (slug === "/") {
    return <></>;
  }

  let page;

  if (slug !== undefined) {
    page = await getPageBySlug(slug);
    page = page.page;
  } else {
    page = await getHomePage();
  }
  const [header, footer] = await Promise.all([
    getPageHeader(),
    getPageFooter(),
  ]);

  if (!header || !footer) {
    return <body>Erreur lors du chargement du layout</body>;
  }

  return (
    <PageClient
      initialpage={page}
      header={header.header}
      footer={footer.footer}
    />
  );
}
