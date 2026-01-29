import { BlocObject } from "@/model/Bloc";
import { ArticleObject } from "@/model/bloc/Article";
import { MediaObject } from "@/model/bloc/MediaObject";

export function updateBlocImages(
  bloc: BlocObject,
  index: number,
  image: MediaObject,
) {
  const newImageMedias = [...bloc.image_medias];
  newImageMedias[index] = image;

  return new BlocObject(
    {
      id: bloc.id ?? undefined,
      text_nom_bloc: bloc.text_nom_bloc ?? undefined,
      number_page_id: bloc.number_page_id ?? undefined,
      text_titre: bloc.text_titre ?? undefined,
      text_description: bloc.text_description ?? "",
      color_background_color: bloc.color_background_color ?? undefined,
      type: bloc.type ?? undefined,
      bloc_position: bloc.bloc_position ?? undefined,
      langue_bloc: bloc.langue_bloc ?? undefined,
      checkbox_is_full_width: bloc.checkbox_is_full_width,
      number_width: bloc.number_width ?? 75,
      number_height: bloc.number_height ?? 75,
      number_gap: bloc.number_gap ?? undefined,
      number_columns: bloc.number_columns ?? undefined,
      text_createdAt: bloc.text_createdAt ?? undefined,
      text_updatedAt: new Date(),
      image_medias: newImageMedias,
      articles: bloc.articles,
    },
    bloc.mode,
  );
}
