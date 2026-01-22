import { BlocObject } from "@/model/Bloc";
import { ArticleObject } from "@/model/bloc/Article";

export function cloneBlocWithArticles(
  bloc: BlocObject,
  updatedArticles: ArticleObject[],
) {
  return new BlocObject(
    {
      id: bloc.number_id ?? undefined,
      nom_bloc: bloc.text_nom_bloc ?? undefined,
      page_id: bloc.number_page_id ?? undefined,
      titre: bloc.text_titre ?? undefined,
      type: bloc.text_type ?? undefined,
      bloc_position: bloc.number_bloc_position ?? undefined,
      langue_bloc: bloc.text_langue_bloc ?? undefined,
      is_full_width: bloc.number_is_full_width,
      width: bloc.number_width ?? undefined,
      height: bloc.number_height ?? undefined,
      gap: bloc.number_gap ?? undefined,
      createdAt: bloc.number_createdAt ?? undefined,
      updatedAt: new Date(),

      articles: updatedArticles,
    },
    bloc.mode,
  );
}
