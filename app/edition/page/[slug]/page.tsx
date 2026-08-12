import { notFound } from "next/navigation";
import { getPageBySlug } from "../../../../lib/cache/page.slug";
import { getPageHeader } from "../../../../lib/cache/page.header";
import { getPageFooter } from "../../../../lib/cache/page.footer";
import { getConfiguration } from "../../../../lib/cache/configuration";
import PageClient from "./PageClient";
import { FONT_STACKS } from "../../../../components/ui/fonts/fonts";
import { PALETTE } from "../../../../components/ui/Text/TailwindPalette";
import { PageSkeleton } from "../../../../components/ui/suspense/PageSkeleton";
import { Suspense } from "react";
import { PagesProvider } from "../../../../context/PagesProvider";

export const instant = false;

interface PageProps {
  params: Promise<{ slug?: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params).catch(() => null);
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

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

  const mainColorKey = configuration?.color_main_color ?? "";
  const titleColor =
    (PALETTE[mainColorKey] !== undefined && PALETTE[mainColorKey][600]) ??
    "#080808";

  const fontIndex = Number(configuration?.text_police ?? 0);
  const fontStack = FONT_STACKS[fontIndex]?.stack ?? "sans-serif";
  const fontSize = configuration?.number_taille ?? 16;

  const cssVars = `:root{--police:${fontStack};--font-size:${fontSize}px;--title-color:${titleColor};}`;

  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="space-y-6 ">
        <PagesProvider slug={slug}>
          <PageClient
            initialPage={page}
            header={header}
            footer={footer}
            cssVars={cssVars}
          />
        </PagesProvider>
      </div>
    </Suspense>
  );
}
