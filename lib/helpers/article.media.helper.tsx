import { ArticleObject } from "../../database/model/bloc/Article";
import { MediaObject } from "../../database/model/bloc/MediaObject";

export function updateArticleImages(
  articles: ArticleObject[],
  index: number,
  images: MediaObject[],
) {
  return articles.map((article, i) =>
    i === index ? new ArticleObject({ ...article, images }) : article,
  );
}
