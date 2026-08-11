import { HeaderObject } from "../../database/model/bloc/Header";
import { PageObject } from "../../database/model/Page";
import { getPageHeader } from "../../lib/cache/page.header";
import { getPageBySlug } from "../../lib/cache/page.slug";

import type { Metadata } from "next";
import { PageContainer } from "../PageContainer";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PageObject>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const [page, header] = await Promise.all([
    getPageBySlug(slug),
    getPageHeader(),
  ]);

  if (
    page !== undefined &&
    page !== null &&
    header !== undefined &&
    header !== null
  ) {
    const pageData = new PageObject(page);

    return {
      title: pageData.text_titre,
      description: pageData.text_description,
      icons: {
        icon: header.favicon.image_url,
      },
    };
  }
  return {
    title: "CMS",
    description: "Ceci est une page",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PageContainer slug={slug} />;
}