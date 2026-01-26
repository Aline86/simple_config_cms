import { BlocObject } from "@/model/Bloc";
import { ArticleObject } from "@/model/bloc/Article";
import { MediaObject } from "@/model/bloc/MediaObject";

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
      description: bloc.text_description ?? undefined,
      color_background_color: bloc.color_background_color ?? undefined,
      type: bloc.text_type ?? undefined,
      bloc_position: bloc.number_bloc_position ?? undefined,
      langue_bloc: bloc.text_langue_bloc ?? undefined,
      is_full_width: bloc.number_is_full_width,
      columns: bloc.number_columns ?? undefined,
      width: bloc.number_width ?? undefined,
      height: bloc.number_height ?? undefined,
      gap: bloc.number_gap ?? undefined,
      createdAt: bloc.number_createdAt ?? undefined,
      updatedAt: new Date(),
      image_medias: bloc.image_medias,
      articles: updatedArticles,
    },
    bloc.mode,
  );
}
export function cloneBlocWithMedias(
  bloc: BlocObject,
  updatedMedia: MediaObject[],
) {
  return new BlocObject(
    {
      id: bloc.number_id ?? undefined,
      nom_bloc: bloc.text_nom_bloc ?? undefined,
      page_id: bloc.number_page_id ?? undefined,
      titre: bloc.text_titre ?? undefined,
      description: bloc.text_description ?? undefined,
      color_background_color: bloc.color_background_color ?? undefined,
      type: bloc.text_type ?? undefined,
      bloc_position: bloc.number_bloc_position ?? undefined,
      columns: bloc.number_columns ?? undefined,
      langue_bloc: bloc.text_langue_bloc ?? undefined,
      is_full_width: bloc.number_is_full_width,
      width: bloc.number_width ?? undefined,
      height: bloc.number_height ?? undefined,
      gap: bloc.number_gap ?? undefined,
      createdAt: bloc.number_createdAt ?? undefined,
      updatedAt: new Date(),
      articles: bloc.articles,
      image_medias: updatedMedia,
    },
    bloc.mode,
  );
}
