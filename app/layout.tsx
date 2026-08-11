import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS prévisualisation simple",
};

import "../styles/globals.css";
import "../styles/theme.css";
import { ReactNode, Suspense } from "react";
import { DomDataProvider } from "../context/DomDataProvider";
import { PageSkeleton } from "../components/ui/suspense/PageSkeleton";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const theme = "light";
  return (
    <html lang="fr">
      <body className={theme}>
        <Suspense fallback={<PageSkeleton />}>
          <DomDataProvider>{children}</DomDataProvider>
        </Suspense>
      </body>
    </html>
  );
}
