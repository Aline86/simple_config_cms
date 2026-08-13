import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CMS prévisualisation simple",
};

import "../styles/globals.css";
import "../styles/theme.css";
import { ReactNode } from "react";
import { DomDataProvider } from "../context/DomDataProvider";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr">
      <head>
        <script
          defer
          src="https://umami-nine-ruby.vercel.app/script.js"
          data-website-id="cc90c567-2eaf-498a-ac92-1e532a1f308d"
        ></script>
      </head>
      <body>
        <DomDataProvider>{children}</DomDataProvider>
      </body>
    </html>
  );
}
