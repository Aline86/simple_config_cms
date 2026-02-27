import { immerable } from "immer";
import { BlocObject } from "../../database/model/Bloc";
import { ArticleObject } from "../../database/model/bloc/Article";
import { MediaObject } from "../../database/model/bloc/MediaObject";
import { stripImmerable } from "./stripImmarable";

export function cloneBlocWithArticles(
  bloc: BlocObject,
  updatedArticles: ArticleObject[],
) {
  const { mode, articles, image_medias, ...rest } = stripImmerable(bloc);
  return new BlocObject(
    {
      ...rest,
      image_medias,
      articles: updatedArticles,
      text_updatedAt: new Date(),
    },
    mode,
  );
}

export function cloneBlocWithMedias(
  bloc: BlocObject,
  updatedMedia: MediaObject[],
) {
  const { mode, articles, image_medias, ...rest } = stripImmerable(bloc);
  return new BlocObject(
    {
      ...rest,
      image_medias: updatedMedia,
      articles,
      text_updatedAt: new Date(),
    },
    mode,
  );
}

export function cloneBlocWithArticlesAndMedia(
  bloc: BlocObject,
  articles: ArticleObject[],
  medias: MediaObject[],
) {
  const { mode, articles: _, image_medias: __, ...rest } = stripImmerable(bloc);
  return new BlocObject(
    { ...rest, image_medias: medias, articles, text_updatedAt: new Date() },
    mode,
  );
}

export function updateBlocImages(
  bloc: BlocObject,
  index: number,
  image: MediaObject,
) {
  const { mode, image_medias, ...rest } = stripImmerable(bloc);
  const newImageMedias = [...image_medias];
  newImageMedias[index] = image;
  return new BlocObject(
    { ...rest, image_medias: newImageMedias, text_updatedAt: new Date() },
    mode,
  );
}
