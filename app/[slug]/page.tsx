import { HeaderObject } from "../../model/bloc/Header";
import { PageObject } from "../../model/Page";
import {
  getPageBySlug,
  getPageFooter,
  getPageHeader,
} from "../edition/page/[slug]/callPages";
import PageClient from "./PageClient";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

/* ===========================
   METADATA
=========================== */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const [page, header] = await Promise.all([
    getPageBySlug(slug),
    getPageHeader(),
  ]);

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
   PAGE
=========================== */
export default async function Page({ params }: Props) {
  const { slug } = params;

  const page = await getPageBySlug(slug);
  if (!page) {
    return <div>Page non trouvée</div>;
  }

  const [header, footer] = await Promise.all([
    getPageHeader(),
    getPageFooter(),
  ]);

  if (!header || !footer) {
    return <div>Erreur lors du chargement du layout</div>;
  }

  return <PageClient initialpage={page} header={header} footer={footer} />;
}
