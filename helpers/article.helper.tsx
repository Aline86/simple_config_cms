import { ArticleObject } from "@/model/bloc/Article";
import { MediaObject } from "@/model/bloc/MediaObject";

// helpers/article.helper.ts
export function cloneArticleWithImages(
  article: ArticleObject,
  images: MediaObject[],
) {
  return new ArticleObject({
    id: article.number_id ?? null,
    bloc_id: article.number_bloc_id ?? null,
    text_article: article.text_text_article ?? {},
    text_width: article.number_text_width ?? 0,
    text_height: article.number_text_height ?? 0,
    text_margins: article.number_text_margins ?? 0,
    images: images ?? [],
    text_images_position: article.text_images_position ?? "top",
  });
}
