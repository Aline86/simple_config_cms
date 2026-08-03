"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import usePage from "../hooks/dropdown/usePage";
import { PageObject } from "../database/model/Page";
import usePages from "../hooks/dropdown/usePages";

type AppContextType = {
  hasH1InPage: boolean;
  setHasH1InPage: (value: boolean) => void;
  pages: PageObject[] | null;
};

const DomDataContext = createContext<AppContextType | undefined>(undefined);

export function DomDataProvider({ children }: { children: ReactNode }) {
  const { parentId } = usePage();
  console.log("parentId", parentId);
  const { pages } = usePages(parentId);
  const [hasH1InPage, setHasH1InPage] = useState(false);

  const value = useMemo(
    () => ({ hasH1InPage, setHasH1InPage, pages }),
    [hasH1InPage, pages],
  );

  return (
    <DomDataContext.Provider value={value}>{children}</DomDataContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(DomDataContext);
  if (!ctx) {
    throw new Error("useAppContext doit être utilisé dans DomDataProvider");
  }
  return ctx;
}
