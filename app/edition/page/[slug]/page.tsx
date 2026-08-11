import { notFound } from "next/navigation";
import { FONT_STACKS } from "../../../../components/ui/fonts/fonts";
import { PALETTE } from "../../../../components/ui/Text/TailwindPalette";
import { getHomePage } from "../../../../lib/cache/page.homepage";

import { getPageBySlug, getPageFooter, getPageHeader } from "./callPages";
import PageClient from "./PageClient";
import { getConfiguration } from "../../../../lib/cache/configuration";

interface PageProps {
  params: Promise<{ slug: string }>;
}


  export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const [page, header, footer, configuration] = await Promise.all([
      slug ? getPageBySlug(slug) : getHomePage(),
      getPageHeader(),
      getPageFooter(),
      getConfiguration(),
    ]);

    if (slug && !page) notFound();

    if (!header || !footer || !page || !configuration) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="bg-blue-500 p-6 text-white">
            <h1 className="text-2xl text-center">
              Veuillez créer une page. N&apos;oubliez pas de sélectionner une
              page d&apos;accueil.
            </h1>
          </div>
        </div>
      );
    }

    const titleColor =
      PALETTE[configuration.color_main_color][600] ?? "#1e40af";

    const cssVars = `:root{--police:${FONT_STACKS[Number(configuration.text_police)].stack};--font-size:${configuration.number_taille}px;--title-color:${titleColor};}`;

    return (
      <PageClient
        initialpage={page.page}
        header={header.header}
        footer={footer.footer}
        cssVars={cssVars}
      />
    );
  }
