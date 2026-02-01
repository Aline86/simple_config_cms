import { HeaderObject } from "../../model/bloc/Header";
import { PageObject } from "../../model/Page";
import {
  getPageBySlug,
  getPageFooter,
  getPageHeader,
} from "../edition/page/[slug]/callPages";

import PageClient from "./PageClient";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PageObject>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const [page, header] = await Promise.all([
    await getPageBySlug(slug),
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
    console.log("haederData", haederData.favicon.image_url);
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
export default async function Page({ params, searchParams }: Props) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

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
