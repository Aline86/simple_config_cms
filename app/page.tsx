import { HeaderObject } from "../model/bloc/Header";
import { PageObject } from "../model/Page";
import PageClient from "./[slug]/PageClient";
import getHomePage from "./callPages";
import { getPageFooter, getPageHeader } from "./edition/page/[slug]/callPages";
import type { Metadata } from "next";

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
export default async function Page() {
  const page = await getHomePage();

  if (!page) {
    return <body>Page non trouvée</body>;
  }

  const [header, footer] = await Promise.all([
    getPageHeader(),
    getPageFooter(),
  ]);

  if (!header || !footer) {
    return <div>Erreur lors du chargement du layout</div>;
  }
  console.log("data", header, page, footer);
  return (
    <PageClient
      initialpage={page}
      header={header.header}
      footer={footer.footer}
    />
  );
}
