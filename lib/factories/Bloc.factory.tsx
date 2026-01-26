// lib/factories/bloc.factory.ts

import { MediaObject } from "@/model/bloc/MediaObject";
import { ArticleObject } from "@/model/bloc/Article";
import { TypeBloc } from "@/model/Page";
import { BlocObject } from "@/model/Bloc";

/**
 * Options pour créer un nouveau bloc
 */
export interface CreateBlocOptions {
  page_id: string;
  bloc_position: number;
  type: TypeBloc;
  langue_bloc?: string;
  nom_bloc?: string;
  // Options pour les médias niveau 1 (directement dans le bloc)
  mediaCount?: number;
  color_background_color?: string;
  description?: string;
  // Options pour les articles
  articleCount?: number;
  mediaPerArticle?: number; // nombre de médias par article

  // Options facultatives pour config bloc
  is_full_width?: boolean;
  width?: number;
  height?: number;
  gap?: number;
  columns?: number;
}

/**
 * Crée un nouveau bloc avec des médias et/ou articles vides
 */
export function createNewBloc(options: CreateBlocOptions): BlocObject {
  const id = crypto.randomUUID();
  const {
    page_id,
    bloc_position,
    type,
    nom_bloc,
    color_background_color = "#ffffff",
    description,
    langue_bloc = "fr",
    mediaCount = 0,
    articleCount = 0,
    mediaPerArticle = 0,
    is_full_width = false,
    width = 100,
    height = 100,
    gap = 30,
    columns = 4,
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

  return new BlocObject(
    {
      id: id, // toujours null à la création
      nom_bloc: nom_bloc,
      page_id,
      titre: "",
      description,
      type,
      color_background_color,
      bloc_position,
      langue_bloc,
      is_full_width,
      width,
      height,
      gap,
      columns,
      createdAt: new Date(),
      updatedAt: new Date(),
      image_medias,
      articles,
    },
    "edition", // mode fixe
  );
}

/**
 * Crée un média vide
 */
function createEmptyMedia(position: number, id_bloc: string): MediaObject {
  const minW = 200;
  const maxW = 600;
  const minH = 150;
  const maxH = 400;

  const width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
  const height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
  const image_url = `https://picsum.photos/${width}/${height}?random=${Date.now()}-${position}`;
  return new MediaObject({
    id: crypto.randomUUID(),
    bloc_id: id_bloc,
    titre: "test",
    image_lien: "",
    position_image: position,
    image_url: image_url,
  });
}

/**
 * Crée un article vide avec ses médias
 */
function createEmptyArticle(
  position: number,
  mediaCount: number,
  id_bloc: string,
): ArticleObject {
  const images: MediaObject[] = [];

  for (let i = 0; i < mediaCount; i++) {
    images.push(createEmptyMedia(i, id_bloc));
  }

  return new ArticleObject({
    id: crypto.randomUUID(),
    bloc_id: id_bloc,
    text_images_position: "left",
    text_article: {},
    text_width: 100,
    text_height: 100,
    text_margins: 30,
    images,
  });
}

/**
 * Helpers pour créer des blocs pré-configurés selon des patterns courants
 */

// Bloc carrousel avec 5 images
export function createCarouselBloc(
  bloc_position: number,
  page_id: string,
): BlocObject {
  return createNewBloc({
    page_id,
    bloc_position,
    type: TypeBloc.CAROUSEL,
    mediaCount: 5,
  });
}

// Bloc galerie d'images
export function createImageGroupBloc(
  page_id: string,
  bloc_position: number,
  imageCount: number = 6,
): BlocObject {
  return createNewBloc({
    page_id,
    bloc_position,
    type: TypeBloc.IMAGE_GROUPE,
    mediaCount: imageCount,
  });
}
// Bloc bouton
export function createButtonBloc(
  page_id: string,
  bloc_position: number,
  imageCount: number = 1,
): BlocObject {
  return createNewBloc({
    page_id,
    bloc_position,
    type: TypeBloc.IMAGE_GROUPE,
    mediaCount: imageCount,
  });
}

// Bloc texte simple (sans média)
export function createTextBloc(
  bloc_position: number,
  page_id: string,
): BlocObject {
  return createNewBloc({
    page_id,
    bloc_position,
    type: TypeBloc.TEXTE,
    articleCount: 1,
  });
}

// Bloc texte avec images illustratives
export function createTextWithImagesBloc(
  bloc_position: number,
  page_id: string,
  articleCount: number = 3,
  imagesPerArticle: number = 2,
): BlocObject {
  return createNewBloc({
    page_id,
    bloc_position,
    type: TypeBloc.TEXTE,
    articleCount,
    mediaPerArticle: imagesPerArticle,
  });
}

// Bloc vidéo avec une vidéo + image poster
export function createVideoBloc(
  bloc_position: number,
  page_id: string,
): BlocObject {
  return createNewBloc({
    page_id,
    bloc_position,
    type: TypeBloc.VIDEO,
    mediaCount: 2, // 1 vidéo + 1 poster
  });
}

// Bloc screen (fullscreen) avec 1 image de fond
export function createScreenBloc(
  bloc_position: number,
  page_id: string,
): BlocObject {
  return createNewBloc({
    page_id,
    bloc_position,
    type: TypeBloc.SCREEN,
    mediaCount: 1,
    is_full_width: true,
  });
}
