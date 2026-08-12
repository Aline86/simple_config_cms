import { PageObject } from "../database/model/Page";
import type { Metadata } from "next";

import { getHomePage } from "../lib/cache/page.homepage";
import { getPageHeader } from "../lib/cache/page.header";

import PageContainer from "./PageContainer";

export async function generateMetadata(): Promise<Metadata> {
  const [page, header] = await Promise.all([getHomePage(), getPageHeader()]);

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

export default function Page() {
  return <PageContainer />;
}