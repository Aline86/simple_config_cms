import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
};

import "../styles/globals.css";
import "../styles/theme.css";
import { ReactNode } from "react";
import { DomDataProvider } from "../context/DomDataProvider";

interface RootLayoutProps {
  children: ReactNode;
  theme?: "light" | "dark";
}

// Exemple : lecture du cookie côté serveur
export default function RootLayout({
  children,
  theme = "light",
}: RootLayoutProps) {
  return (
    <html lang="en" className={theme}>
      <DomDataProvider>{children}</DomDataProvider>
    </html>
  );
}
