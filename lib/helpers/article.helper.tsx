import { immerable } from "immer";
import { ArticleObject } from "../../database/model/bloc/Article";
import { MediaObject } from "../../database/model/bloc/MediaObject";
import { stripImmerable } from "./stripImmerable";

export function cloneArticleWithImages(
  article: ArticleObject,
  images: MediaObject[],
) {
  const { images: _, ...rest } = stripImmerable(article);
  return new ArticleObject({ ...rest, images });
}
