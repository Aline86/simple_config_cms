import { notFound } from "next/navigation";
import { getPageBySlug } from "../../../../lib/cache/page.slug";
import { getPageHeader } from "../../../../lib/cache/page.header";
import { getPageFooter } from "../../../../lib/cache/page.footer";
import { getConfiguration } from "../../../../lib/cache/configuration";
import PageClient from "./PageClient";
import { FONT_STACKS } from "../../../../components/ui/fonts/fonts";
import { PALETTE } from "../../../../components/ui/Text/TailwindPalette";
import {
  mapFooter,
  mapHeader,
  mapPage,
} from "../../../../database/mappers/database.to.objects";
export const instant = false;

interface PageProps {
  params: Promise<{ slug?: string }>;
}

export default async function Page({ params }: PageProps) {
  // 1. Traitement de la Promise params
  const resolvedParams = await Promise.resolve(params).catch(() => null);
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  // 2. Récupération sécurisée des ressources
  let page, header, footer, configuration;

  try {
    [page, header, footer, configuration] = await Promise.all([
      getPageBySlug(slug),
      getPageHeader(),
      getPageFooter(),
      getConfiguration(),
    ]);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    notFound();
  }

  if (!page) {
    notFound();
  }

  if (!header || !footer || !configuration) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-blue-500 p-6 text-white">
          <h1 className="text-2xl text-center">Veuillez créer une page.</h1>
        </div>
      </div>
    );
  }

  const pageMapped = mapPage(page);
  const headerMapped = mapHeader(header, "edition");
  const footerMapped = mapFooter(footer, "edition");

  // 4. Styles et variables CSS
  const mainColorKey = configuration?.color_main_color ?? "";
  const titleColor = PALETTE[mainColorKey]?.[600] ?? "#1e40af";

  const fontIndex = Number(configuration?.text_police ?? 0);
  const fontStack = FONT_STACKS[fontIndex]?.stack ?? "sans-serif";
  const fontSize = configuration?.number_taille ?? 16;

  const cssVars = `:root{--police:${fontStack};--font-size:${fontSize}px;--title-color:${titleColor};}`;

  return (
    <PageClient
      initialPage={page}
      header={header}
      footer={footer}
      cssVars={cssVars}
    />
  );
}
