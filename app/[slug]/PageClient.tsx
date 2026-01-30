"use client";

import { Plus, Save } from "lucide-react";

import { PageObject } from "@/model/Page";
import { useEffect, useState } from "react";
import PageBlocs from "./pageComponent";
import { reorderArray } from "@/helpers/changeComponentPosition";
import { BlocObject } from "@/model/Bloc";
import { cloneBlocWithMedias } from "@/helpers/bloc.helper";
import { clonePageWithBlocs } from "@/helpers/page.helper";
import BlocChoiceModal from "@/components/modals/PageChoiceModal";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";
import ComponentBloc from "./BlocComponent";
import { HeaderObject } from "@/model/bloc/Header";
import HeaderView from "@/components/contextView/showcase/header/HeaderView";

export default function PageClient({
  initialpage,
  header,
}: {
  initialpage: PageObject;
  header: HeaderObject;
}) {
  const page = new PageObject(initialpage);
  const headerData = new HeaderObject(header, "view");
  console.log("headerData", headerData);
  return (
    <>
      <HeaderView header={headerData} />
      <div className="p-6 space-y-6">
        {page.blocs.map((bloc, index) => {
          return <ComponentBloc key={index} bloc={bloc} />;
        })}
      </div>
    </>
  );
}
