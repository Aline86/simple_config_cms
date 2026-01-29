"use client";

import { blocksToRender } from "@/config/componentsView";
import { BlocObject } from "@/model/Bloc";

interface PageCrudProps {
  bloc: BlocObject;
  onDelete: (bloc: BlocObject) => void;
  updateBloc: (updatedBloc: BlocObject) => void;
}

export default function ComponentBloc({
  bloc,
  onDelete,
  updateBloc,
}: PageCrudProps) {
  const Renderer = blocksToRender[bloc.type].backend;
  console.log("onchange 1", updateBloc);
  if (!Renderer) return null; // fallback si type inconnu

  return (
    <div className="flex flex-col ">
      <Renderer bloc={bloc} onChange={updateBloc} />
    </div>
  );
}
