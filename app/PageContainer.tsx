import { HeaderObject } from "../database/model/bloc/Header";

import { getPageFooter } from "../lib/cache/page.footer";
import { getPageHeader } from "../lib/cache/page.header";
import { getHomePage } from "../lib/cache/page.homepage";
import { getPageBySlug } from "../lib/cache/page.slug";

import PageClient from "./[slug]/PageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  let page;

  if (slug !== undefined) {
    page = await getPageBySlug(slug);
    page = page;
  } else {
    page = await getHomePage();
  }
  const [header, footer] = await Promise.all([
    getPageHeader(),
    getPageFooter(),
  ]);

  if (!header || !footer || !page) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-blue-500 p-6 text-white">
          <h1 className="text-2xl text-center">
            Veuillez créer une page. N'oubliez pas de sélectionner une page
            d'accueil.
          </h1>
        </div>
      </div>
    );
  }

  return <PageClient initialpage={page} header={header} footer={footer} />;
}
