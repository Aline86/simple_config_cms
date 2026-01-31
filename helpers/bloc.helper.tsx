import { BlocObject } from "../model/Bloc";
import { ArticleObject } from "../model/bloc/Article";
import { MediaObject } from "../model/bloc/MediaObject";

export function cloneBlocWithArticles(
  bloc: BlocObject,
  updatedArticles: ArticleObject[],
) {
  return new BlocObject(
    {
      id: bloc.id,
      text_nom_bloc: bloc.text_nom_bloc,
      number_page_id: bloc.number_page_id,
      text_titre: bloc.text_titre,
      text_description: bloc.text_description,
      type: bloc.type,
      color_background_color: bloc.color_background_color,
      bloc_position: bloc.bloc_position,
      langue_bloc: bloc.langue_bloc,
      checkbox_is_full_width: bloc.checkbox_is_full_width,
      number_width: bloc.number_width,
      number_height: bloc.number_height,
      number_gap: bloc.number_gap,
      number_columns: bloc.number_columns,
      text_createdAt: bloc.text_createdAt,
      text_updatedAt: new Date(),
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
      id: bloc.id,
      text_nom_bloc: bloc.text_nom_bloc,
      number_page_id: bloc.number_page_id,
      text_titre: bloc.text_titre,
      text_description: bloc.text_description,
      type: bloc.type,
      color_background_color: bloc.color_background_color,
      bloc_position: bloc.bloc_position,
      langue_bloc: bloc.langue_bloc,
      checkbox_is_full_width: bloc.checkbox_is_full_width,
      number_width: bloc.number_width,
      number_height: bloc.number_height,
      number_gap: bloc.number_gap,
      number_columns: bloc.number_columns,
      text_createdAt: bloc.text_createdAt,
      text_updatedAt: new Date(),
      image_medias: updatedMedia,
      articles: bloc.articles,
    },
    bloc.mode,
  );
}
export function cloneBlocWithArticlesAndMedia(
  bloc: BlocObject,
  articles: ArticleObject[],
  medias: MediaObject[],
) {
  return new BlocObject({
    id: bloc.id,
    text_nom_bloc: bloc.text_nom_bloc,
    number_page_id: bloc.number_page_id,
    text_titre: bloc.text_titre,
    text_description: bloc.text_description,
    type: bloc.type,
    color_background_color: bloc.color_background_color,
    bloc_position: bloc.bloc_position,
    langue_bloc: bloc.langue_bloc,
    checkbox_is_full_width: bloc.checkbox_is_full_width,
    number_width: bloc.number_width,
    number_height: bloc.number_height,
    number_gap: bloc.number_gap,
    number_columns: bloc.number_columns,
    text_createdAt: bloc.text_createdAt,
    text_updatedAt: new Date(),
    image_medias: medias,
    articles: articles,
  });
}
