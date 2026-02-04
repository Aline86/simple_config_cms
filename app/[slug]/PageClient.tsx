"use client";

import FooterView from "../../components/contextView/showcase/footer/FooterView";
import HeaderView from "../../components/contextView/showcase/header/HeaderView";
import ThemeToggle from "../../components/ui/ThemeToggle";
import { FooterObject } from "../../model/bloc/Footer";
import { HeaderObject } from "../../model/bloc/Header";
import { PageObject } from "../../model/Page";
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
    <body className="mt-[-1px]">
      <HeaderView header={headerData} />
      <ThemeToggle />
      <div className="mt-24 ">
        {page.blocs.map((bloc, index) => {
          return <ComponentBloc key={index} bloc={bloc} />;
        })}
      </div>
      <FooterView footer={footerData} />
    </body>
  );
}
