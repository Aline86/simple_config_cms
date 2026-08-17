"use client";

import { createContext, useContext, useState, useMemo, ReactNode } from "react";



type AppContextType = {
  hasH1InPage: boolean;
  setHasH1InPage: (value: boolean) => void;
};

const DomDataContext = createContext<AppContextType | undefined>(undefined);

export function DomDataProvider({ children }: { children: ReactNode }) {
  const [hasH1InPage, setHasH1InPage] = useState(false);

  const value = useMemo(() => ({ hasH1InPage, setHasH1InPage }), [hasH1InPage]);

  return (
    <DomDataContext.Provider value={value}>
      <>{children}</>
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
