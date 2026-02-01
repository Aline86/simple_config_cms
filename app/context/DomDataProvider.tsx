"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  hasH1InPage: boolean;
  setHasH1InPage: (user: boolean) => void;
};

const DomDataContext = createContext<AppContextType | undefined>(undefined);

export function DomDataProvider({ children }: { children: ReactNode }) {
  const [hasH1InPage, setHasH1InPage] = useState<boolean>(false);

  return (
    <DomDataContext.Provider value={{ hasH1InPage, setHasH1InPage }}>
      {children}
    </DomDataContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(DomDataContext);

  if (!context) {
    throw new Error("useAppContext must be used inside DomDataProvider");
  }

  return context;
}
