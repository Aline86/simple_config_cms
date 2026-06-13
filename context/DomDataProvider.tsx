"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AppContextType = {
  hasH1InPage: boolean;
  setHasH1InPage: (user: boolean) => void;
};

const DomDataContext = createContext<AppContextType>({
  hasH1InPage: false,
  setHasH1InPage: () => {},
});

export function DomDataProvider({ children }: { children: ReactNode }) {
  const [hasH1InPage, setHasH1InPage] = useState<boolean>(false);

  return (
    <DomDataContext.Provider value={{ hasH1InPage, setHasH1InPage }}>
      {children}
    </DomDataContext.Provider>
  );
}

export function useAppContext() {
  return useContext(DomDataContext);
}
