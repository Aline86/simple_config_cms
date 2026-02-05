"use client";

import { blocksToRender } from "../../lib/config/componentsView";
import { BlocObject } from "../../database/model/Bloc";
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
  const Renderer = blocksToRender[bloc.type][bloc.text_nom_bloc];
  if (!Renderer) return null;

  return (
    <main className="flex flex-col ">
      <DeleteButton onDelete={onDelete} bloc={bloc} />
      <Renderer bloc={bloc} onChange={updateBloc} />
    </main>
  );
}
