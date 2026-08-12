"use client";


import { useMemo } from "react";
import FooterView from "../../components/contextView/showcase/footer/FooterView";
import HeaderView from "../../components/contextView/showcase/header/HeaderView";
import ThemeToggle from "../../components/ui/ThemeToggle";
import { getPageFooter } from "../../lib/cache/page.footer";
import { getPageHeader } from "../../lib/cache/page.header";
import { getHomePage } from "../../lib/cache/page.homepage";
import ComponentBloc from "./BlocComponent";
import {
  mapPage,
  mapHeader,
  mapFooter,
} from "../../database/mappers/database.to.objects";
type Props = {
  initialPage: NonNullable<Awaited<ReturnType<typeof getHomePage>>>;
  header: NonNullable<Awaited<ReturnType<typeof getPageHeader>>>;
  footer: NonNullable<Awaited<ReturnType<typeof getPageFooter>>>;
  cssVars: string;
};
export default function PageClient({
  initialPage,
  header,
  footer,
  cssVars,
}: Props) {
  const page = useMemo(() => mapPage(initialPage, "view"), [initialPage]);
  const headerData = useMemo(() => mapHeader(header, "view"), [header]);
  const footerData = useMemo(() => mapFooter(footer, "view"), [footer]);

  return (
    <div style={{ maxWidth: "950px", margin: "0 auto" }}>
      <style
        href="dom-data-config-vars"
        precedence="default"
        dangerouslySetInnerHTML={{ __html: cssVars }}
      />
      <HeaderView bloc={headerData} />
      <ThemeToggle />
      <main>
        {page.blocs.map((bloc) => {
          return <ComponentBloc key={bloc.bloc_position} bloc={bloc} />;
        })}
      </main>
      <FooterView bloc={footerData} />
    </div>
  );
}
