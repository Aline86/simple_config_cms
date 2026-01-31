import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
};

import "./globals.css";
import "./theme.css";
import { ReactNode } from "react";
import ThemeToggle from "../components/ui/ThemeToggle";

interface RootLayoutProps {
  children: ReactNode;
  // Ici tu peux passer le theme depuis cookie ou props
  theme?: "light" | "dark";
}

// Exemple : lecture du cookie côté serveur
export default function RootLayout({
  children,
  theme = "light",
}: RootLayoutProps) {
  return (
    <html lang="en" className={theme}>
      <body
        className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-white ${theme}`}
      >
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
