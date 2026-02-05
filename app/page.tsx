import { HeaderObject } from "../database/model/bloc/Header";
import { PageObject } from "../database/model/Page";
import getHomePage from "./callPages";
import { getPageHeader } from "./edition/page/[slug]/callPages";
import type { Metadata } from "next";
import PageContainer from "./PageContainer";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PageObject>;
};
/* ===========================
   METADATA HOME
=========================== */
export async function generateMetadata(): Promise<Metadata> {
  const [page, header] = await Promise.all([getHomePage(), getPageHeader()]);

  if (!page || !header) {
    return {
      title: "CMS",
      description: "Ceci est une page",
    };
  }

  const pageData = new PageObject(page);
  const headerData = new HeaderObject(header, "view");

  return {
    title: pageData.text_titre,
    description: pageData.text_description,
    icons: headerData.favicon?.image_url
      ? { icon: headerData.favicon.image_url }
      : undefined,
  };
}

/* ===========================
   PAGE HOME
=========================== */
export default async function Page({ params }: Props) {
  return <PageContainer params={params} searchParams={undefined} />;
}
