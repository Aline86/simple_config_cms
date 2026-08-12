
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
  console.log("slug", slug);
  const { parentId } = usePage(slug);
  console.log("parentId", parentId);
  const { pages } = usePages(parentId);
  console.log("pages", pages);
  return (
    <PagesContext.Provider value={pages}>{children}</PagesContext.Provider>
  );
}

export function usePagesContext() {
  return useContext(PagesContext);
}
