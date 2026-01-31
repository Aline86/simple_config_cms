"use client";

import { blocksToRender } from "../../config/componentsView";
import { BlocObject } from "../../model/Bloc";
import { DeleteButton } from "../ui/DeleteButton";

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
  if (!Renderer) return null; // fallback si type inconnu

  return (
    <div className="flex flex-col ">
      <DeleteButton onDelete={onDelete} bloc={bloc} />
      <Renderer bloc={bloc} onChange={updateBloc} />
    </div>
  );
}
