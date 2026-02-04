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
import PageContainer from "./PageContainer";

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
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PageObject>;
};

/* ===========================
   PAGE HOME
=========================== */
export default async function Page({ params }: Props) {
  return <PageContainer params={params} searchParams={undefined} />;
}
