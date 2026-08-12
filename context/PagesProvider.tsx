
"use client";
import { createContext, useContext, ReactNode } from "react";
import usePage from "../hooks/dropdown/usePage";
import usePages from "../hooks/dropdown/usePages";
import { PageObject } from "../database/model/Page";

const PagesContext = createContext<PageObject[] | null>(null);

export function PagesProvider({
  slug,
  children,
}: {
  slug?: string;
  children: ReactNode;
}) {
  const { parentId } = usePage(slug);
  const { pages } = usePages(parentId);
  return (
    <PagesContext.Provider value={pages}>{children}</PagesContext.Provider>
  );
}

export function usePagesContext() {
  return useContext(PagesContext);
}
