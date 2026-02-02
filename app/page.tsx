import { HeaderObject } from "../model/bloc/Header";
import { PageObject } from "../model/Page";
import PageClient from "./[slug]/PageClient";
import getHomePage from "./callPages";
import {
  getPageBySlug,
  getPageFooter,
  getPageHeader,
} from "./edition/page/[slug]/callPages";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PageObject>;
};

export async function generateMetadata(): Promise<Metadata> {
  const [page, header] = await Promise.all([
    await getHomePage(),
    await getPageHeader(),
  ]);

  if (
    page !== undefined &&
    page !== null &&
    header !== undefined &&
    header !== null
  ) {
    const pageData = new PageObject(page);
    const haederData = new HeaderObject(header, "view");

    return {
      title: pageData.text_titre,
      description: pageData.text_description,
      icons: {
        icon: haederData.favicon.image_url,
      },
    };
  }
  return {
    title: "CMS",
    description: "Ceci est une page",
  };
}
export default async function Page() {
  const page = await getHomePage();

  if (!page) {
    return <div>Page non trouvée</div>;
  }
  const header = await getPageHeader();

  if (!header) {
    return <div>PB lors du chargement du header</div>;
  }
  const footer = await getPageFooter();

  if (!footer) {
    return <div>PB lors du chargement du header</div>;
  }
  return <PageClient initialpage={page} header={header} footer={footer} />;
}
