import { ArticleObject } from "../model/bloc/Article";
import { MediaObject } from "../model/bloc/MediaObject";

// helpers/article.helper.ts
export function cloneArticleWithImages(
  article: ArticleObject,
  images: MediaObject[],
) {
  return new ArticleObject({
    id: article.id ?? null,
    text_bloc_id: article.text_bloc_id ?? null,
    text_article: article.text_article ?? {},
    number_text_width: article.number_text_width ?? 0,
    number_height: article.number_height ?? 0,
    number_text_margins: article.number_text_margins ?? 0,
    images: images ?? [],
    text_images_position: article.text_images_position ?? "top",
  });
}
