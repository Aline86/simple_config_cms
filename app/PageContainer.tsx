import { FONT_STACKS } from "../components/ui/fonts/fonts";
import { PALETTE } from "../components/ui/Text/TailwindPalette";

import { getConfiguration } from "../lib/cache/configuration";
import { getPageFooter } from "../lib/cache/page.footer";
import { getPageHeader } from "../lib/cache/page.header";
import { getHomePage } from "../lib/cache/page.homepage";

import PageClient from "./[slug]/PageClient";

const SHADE = 600;

function pickColor(
  value: unknown,
  shade: number | string = SHADE,
): string | undefined {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const v = (value as Record<string, unknown>)[String(shade)];
    return typeof v === "string" ? v : undefined;
  }
  return undefined;
}

export default async function Page() {
  const [page, header, footer, configuration] = await Promise.all([
    getHomePage(),
    getPageHeader(),
    getPageFooter(),
    getConfiguration(),
  ]);

  if (!header || !footer || !page || !configuration || !FONT_STACKS) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-blue-500 p-6 text-white">
          <h1 className="text-2xl text-center">
            Veuillez créer une page. N&apos;oubliez pas de sélectionner une page
            d&apos;accueil.
          </h1>
        </div>
      </div>
    );
  }

  const cssVars = configuration
    ? `:root{--police:${FONT_STACKS[Number(configuration.text_police)].stack};--font-size:${configuration.number_taille}px;--title-color:${pickColor(PALETTE[configuration.color_main_color])};}`
    : "";

  return (
    <>
      {cssVars && (
        <style
          href="dom-data-config-vars"
          precedence="default"
          dangerouslySetInnerHTML={{ __html: cssVars }}
        />
      )}
      <PageClient initialpage={page} header={header} footer={footer} />
    </>
  );
}
