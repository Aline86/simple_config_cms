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
      columns: bloc.number_columns ?? undefined,
      image_medias: newImageMedias,
      articles: bloc.articles,
    },
    bloc.mode,
  );
}
