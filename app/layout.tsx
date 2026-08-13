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
        {process.env.UMAMI_ENV === "demo" ? (
          <script
            defer
            src="https://umami-nine-ruby.vercel.app/script.js"
            data-website-id="cc90c567-2eaf-498a-ac92-1e532a1f308d"
          ></script>
        ) : process.env.UMAMI_ENV === "welcome" ? (
          <script
            defer
            src="https://umami-nine-ruby.vercel.app/script.js"
            data-website-id="10a543ee-e8b2-4299-ac27-dbd7bff38a96"
          ></script>
        ) : (
          <></>
        )}
      </head>
      <body>
        <DomDataProvider>{children}</DomDataProvider>
      </body>
    </html>
  );
}
