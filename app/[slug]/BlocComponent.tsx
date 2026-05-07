import { blocksFrontToRender } from "../../lib/config/componentsView";
import { BlocObject } from "../../database/model/Bloc";
import { HeaderObject } from "../../database/model/bloc/Header";
import { FooterObject } from "../../database/model/bloc/Footer";

interface PageCrudProps {
  bloc: BlocObject | HeaderObject | FooterObject;
}

export default function ComponentBloc({ bloc }: PageCrudProps) {
  const Renderer =
    blocksFrontToRender[bloc.type as string][bloc.text_nom_bloc as string];

  if (!Renderer) return null; // fallback si type inconnu

  return <Renderer bloc={bloc} />;
}
