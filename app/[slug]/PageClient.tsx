"use client";

import FooterView from "../../components/contextView/showcase/footer/FooterView";
import HeaderView from "../../components/contextView/showcase/header/HeaderView";
import ThemeToggle from "../../components/ui/ThemeToggle";
import { FooterObject } from "../../database/model/bloc/Footer";
import { HeaderObject } from "../../database/model/bloc/Header";
import { PageObject } from "../../database/model/Page";
import ComponentBloc from "./BlocComponent";

export default function PageClient({
  initialpage,
  header,
  footer,
}: {
  initialpage: PageObject;
  header: HeaderObject;
  footer: FooterObject;
}) {
  const page = new PageObject(initialpage);
  const headerData = new HeaderObject(header, "view");
  const footerData = new FooterObject(footer, "view");

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
