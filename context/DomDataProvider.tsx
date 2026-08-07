"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import usePage from "../hooks/dropdown/usePage";
import { PageObject } from "../database/model/Page";
import usePages from "../hooks/dropdown/usePages";
import useConfiguration from "../hooks/configuration/useConfiguration";
import { FONT_STACKS } from "../components/ui/Text/PoliceSelect";
import { PALETTE } from "../components/ui/Text/TailwindPalette";

type AppContextType = {
  hasH1InPage: boolean;
  setHasH1InPage: (value: boolean) => void;
  pages: PageObject[] | null;
};

const DomDataContext = createContext<AppContextType | undefined>(undefined);
const SHADE = 600;

function pickColor(
  value: unknown,
  shade: number | string = SHADE,
): string | undefined {
  if (typeof value === "string") return value; // déjà une couleur
  if (value && typeof value === "object") {
    const v = (value as Record<string, unknown>)[String(shade)];
    return typeof v === "string" ? v : undefined;
  }
  return undefined;
}
export function DomDataProvider({ children }: { children: ReactNode }) {
  const { parentId } = usePage();
  const { configuration } = useConfiguration();
  const { pages } = usePages(parentId);
  const [hasH1InPage, setHasH1InPage] = useState(false);

  const value = useMemo(
    () => ({ hasH1InPage, setHasH1InPage, pages }),
    [hasH1InPage, pages],
  );
  const cssVars = useMemo(() => {
    if (!configuration) return "";

    const titleColor = pickColor(PALETTE[configuration.color_main_color]);

    return `:root{--police:${FONT_STACKS[configuration.text_police].stack};--font-size:${configuration.number_taille}px;--title-color:${titleColor};}`;
  }, [configuration]);

  return (
    <DomDataContext.Provider value={value}>
      {cssVars && (
        <style
          href="dom-data-config-vars"
          precedence="default"
          dangerouslySetInnerHTML={{ __html: cssVars }}
        />
      )}
      {children}
    </DomDataContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(DomDataContext);
  if (!ctx) {
    throw new Error("useAppContext doit être utilisé dans DomDataProvider");
  }
  return ctx;
}
