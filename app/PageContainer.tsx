import { PageObject } from "../model/Page";
import PageClient from "./[slug]/PageClient";
import getHomePage from "./callPages";
import {
  getPageBySlug,
  getPageHeader,
  getPageFooter,
} from "./edition/page/[slug]/callPages";

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

  if (slug === undefined) {
    page = await getHomePage();
  } else {
    page = await getPageBySlug(slug);
    page = page.page;
  }
  const [header, footer] = await Promise.all([
    getPageHeader(),
    getPageFooter(),
  ]);

  if (!header || !footer) {
    return <div>Erreur lors du chargement du layout</div>;
  }

  return (
    <PageClient
      initialpage={page}
      header={header.header}
      footer={footer.footer}
    />
  );
}
