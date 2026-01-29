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

export default function PageClient({
  initialpage,
}: {
  initialpage: PageObject;
}) {
  const page = new PageObject(initialpage);
  return (
    <div className="p-6 space-y-6">
      {page.blocs.map((bloc, index) => {
        return <ComponentBloc key={index} bloc={bloc} />;
      })}
    </div>
  );
}
