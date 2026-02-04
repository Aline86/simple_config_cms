import { HeaderObject } from "../../model/bloc/Header";
import { PageObject } from "../../model/Page";
import { getPageBySlug, getPageHeader } from "../edition/page/[slug]/callPages";
import PageContainer from "../PageContainer";

import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<PageObject>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  if (slug === "/") {
    return {
      title: "CMS",
      description: "Ceci est une page",
    };
  }
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
  return <PageContainer params={params} searchParams={undefined} />;
}
