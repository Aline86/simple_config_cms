// lib/factories/bloc.factory.ts

import { nanoid } from "nanoid";
import { BlocObject } from "../../database/model/Bloc";
import { ArticleObject } from "../../database/model/bloc/Article";
import { MediaObject } from "../../database/model/bloc/MediaObject";
import { TypeBloc } from "../../database/model/Page";

/**
 * Options pour créer un nouveau bloc
 */
export interface CreateBlocOptions {
  number_page_id: number;
  bloc_position: number;
  type: TypeBloc;
  langue_bloc?: string;
  text_nom_bloc?: string;
  // Options pour les médias niveau 1 (directement dans le bloc)
  mediaCount?: number;
  color_background_color?: string;
  text_description?: string;
  // Options pour les articles
  articleCount?: number;
  mediaPerArticle?: number; // nombre de médias par article
  // Options facultatives pour config bloc
  checkbox_is_full_width?: boolean;
  number_width?: number;
  number_height?: number;
  number_gap?: number;
  number_columns?: number;
}

export function createNewBloc(options: CreateBlocOptions): BlocObject {
  const id = nanoid();

  const {
    number_page_id,
    bloc_position,
    type,
    text_nom_bloc,
    color_background_color = "#ffffff",
    text_description,
    langue_bloc = "fr",
    mediaCount = 0,
    articleCount = 0,
    mediaPerArticle = 0,
    checkbox_is_full_width = false,
    number_width = 100,
    number_height = 100,
    number_gap = 30,
    number_columns = 4,
  } = options;

  // Créer les médias niveau 1 (attachés directement au bloc)
  const image_medias: MediaObject[] = [];
  for (let i = 0; i < mediaCount; i++) {
    image_medias.push(createEmptyMedia(i, id));
  }

  // Créer les articles avec leurs médias
  const articles: ArticleObject[] = [];
  for (let i = 0; i < articleCount; i++) {
    articles.push(createEmptyArticle(i, mediaPerArticle, id));
  }

  const bloc = new BlocObject(
    {
      id: id,
      text_nom_bloc: text_nom_bloc,
      number_page_id: number_page_id,
      text_titre: "",
      text_description: text_description,
      type: type,
      color_background_color: color_background_color,
      bloc_position: bloc_position,
      langue_bloc: langue_bloc,
      checkbox_is_full_width: checkbox_is_full_width,
      number_width: number_width,
      number_height: number_height,
      number_gap: number_gap,
      number_columns: number_columns,
      text_createdAt: new Date(),
      text_updatedAt: new Date(),
      image_medias: image_medias,
      articles: articles,
    },
    "edition",
  );

  return bloc;
}

function createEmptyMedia(
  number_position_image: number,
  text_bloc_id: string,
): MediaObject {
  const minW = 200;
  const maxW = 600;
  const minH = 150;
  const maxH = 400;

  const width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
  const number_height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
  const image_url = `https://picsum.photos/${width}/${number_height}?random=${Date.now()}-${number_position_image}`;

  return new MediaObject({
    id: nanoid(),
    text_bloc_id: text_bloc_id,
    text_titre: `Image ${number_position_image + 1}`,
    text_image_lien: "",
    number_position_image: number_position_image,
    image_url: image_url,
  });
}

function createEmptyArticle(
  position: number,
  mediaCount: number,
  text_bloc_id: string,
): ArticleObject {
  const images: MediaObject[] = [];

  for (let i = 0; i < mediaCount; i++) {
    images.push(createEmptyMedia(i, text_bloc_id));
  }

  return new ArticleObject({
    id: nanoid(),
    text_bloc_id: text_bloc_id,
    text_images_position: "left",
    text_article: {
      type: "doc",
      content: [],
    },
    number_text_width: 100,
    number_height: 100,
    number_text_margins: 30,
    images: images,
  });
}
