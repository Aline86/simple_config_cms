export const dynamic = "force-dynamic";

import { HeaderObject } from "../../database/model/bloc/Header";
import { PageObject } from "../../database/model/Page";

import PageContainer from "../PageContainer";

import type { Metadata } from "next";
import { getPageBySlug, getPageHeader } from "./callPages";

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
    const pageData = new PageObject(page.page);
    const haederData = new HeaderObject(header.header, "view");

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

export default async function Page({ params }: Props) {
  return <PageContainer params={params} />;
}
