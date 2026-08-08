import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS prévisualisation simple",
};

import "../styles/globals.css";
import "../styles/theme.css";
import { ReactNode, Suspense } from "react";
import { DomDataProvider } from "../context/DomDataProvider";

interface RootLayoutProps {
  children: ReactNode;
  theme?: "light" | "dark";
}

export default function RootLayout({
  children,
  theme = "light",
}: RootLayoutProps) {
  return (
    <html lang="fr" className={theme}>
      <Suspense fallback={null}>
        <DomDataProvider>{children}</DomDataProvider>
      </Suspense>
    </html>
  );
}
