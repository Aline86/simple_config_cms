import { blocksFrontToRender } from "../../lib/config/componentsView";
import { BlocObject } from "../../database/model/Bloc";

interface PageCrudProps {
  bloc: BlocObject;
}

export default function ComponentBloc({ bloc }: PageCrudProps) {
  const Renderer =
    blocksFrontToRender[bloc.type as string][bloc.text_nom_bloc as string];

  if (!Renderer) return null; // fallback si type inconnu

  return (
    <div className="flex flex-col m-auto mb-8">
      <Renderer bloc={bloc} />
    </div>
  );
}
