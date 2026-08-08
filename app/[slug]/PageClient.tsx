"use client";

import { useMemo } from "react";
import FooterView from "../../components/contextView/showcase/footer/FooterView";
import HeaderView from "../../components/contextView/showcase/header/HeaderView";
import ThemeToggle from "../../components/ui/ThemeToggle";
import {
  mapPage,
  mapHeader,
  mapFooter,
} from "../../database/mappers/database.to.objects";

import { getPageFooter } from "../../lib/cache/page.footer";
import { getPageHeader } from "../../lib/cache/page.header";
import { getHomePage } from "../../lib/cache/page.homepage";
import ComponentBloc from "./BlocComponent";
type Props = {
  initialpage: NonNullable<Awaited<ReturnType<typeof getHomePage>>>;
  header: NonNullable<Awaited<ReturnType<typeof getPageHeader>>>;
  footer: NonNullable<Awaited<ReturnType<typeof getPageFooter>>>;
};
export default function PageClient({ initialpage, header, footer }: Props) {
  const page = useMemo(() => mapPage(initialpage), [initialpage]);
  const headerData = useMemo(() => mapHeader(header), [header]);
  const footerData = useMemo(() => mapFooter(footer), [footer]);

  return (
    <body>
      <HeaderView bloc={headerData} />
      <ThemeToggle />
      <main>
        {page.blocs.map((bloc, index) => {
          return <ComponentBloc key={index} bloc={bloc} />;
        })}
      </main>
      <FooterView bloc={footerData} />
    </body>
  );
}
