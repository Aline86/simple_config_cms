import { HeaderObject } from "../database/model/bloc/Header";
import { PageObject } from "../database/model/Page";

import type { Metadata } from "next";
import PageContainer from "./PageContainer";
import { getHomePage } from "../lib/cache/page.homepage";
import { getPageHeader } from "../lib/cache/page.header";
import { getPageBySlug } from "../lib/cache/page.slug";
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [page, header] = await Promise.all([
    getPageBySlug(slug),
    getPageHeader(),
  ]);

  if (!page || !header) {
    return { title: "CMS", description: "Ceci est une page" };
  }

  const pageData = new PageObject(page);

  return {
    title: pageData.text_titre,
    description: pageData.text_description,
    icons: header.favicon?.image_url
      ? { icon: header.favicon.image_url }
      : undefined,
  };
}

export default async function Page({ params }: Props) {
  return <PageContainer params={params} />;
}
