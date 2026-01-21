import { immerable } from "immer";
import { MediaObject } from "./bloc/MediaObject";
import { TypeBloc } from "./Page";
import { ArticleObject } from "./bloc/Article";

export class BlocObject {
  [immerable] = true;

  public number_id: string | null;
  public text_nom_bloc: string | null;
  public number_page_id: string | null;
  public text_titre: string | null;
  public text_type: TypeBloc | null;
  public number_bloc_position: number | null;
  public text_langue_bloc: string | null;
  public number_is_full_width: boolean;
  public number_width: number | null;
  public number_height: number | null;
  public number_gap: number | null;
  public number_columns: number | null;
  public number_createdAt: Date | null;
  public number_updatedAt: Date | null;
  public image_medias: MediaObject[];
  public articles: ArticleObject[];
  public mode: string;

  constructor(
    data: {
      id?: string | null;
      nom_bloc?: string;
      page_id?: string;
      titre?: string;
      type?: TypeBloc;
      bloc_position?: number;
      langue_bloc?: string;
      is_full_width?: boolean;
      width?: number;
      height?: number;
      gap?: number;
      columns?: number;
      createdAt?: Date;
      updatedAt?: Date;
      image_medias?: MediaObject[];
      articles?: ArticleObject[];
    } = {},
    mode: string = "edition",
  ) {
    this.number_id = data.id ?? null;
    this.text_nom_bloc = data.nom_bloc ?? null;
    this.number_page_id = data.page_id ?? null;
    this.text_titre = data.titre ?? null;
    this.text_type = data.type ?? null;
    this.number_bloc_position = data.bloc_position ?? null;
    this.text_langue_bloc = data.langue_bloc ?? null;
    this.number_is_full_width = data.is_full_width ?? false;
    this.number_width = data.width ?? null;
    this.number_height = data.height ?? null;
    this.number_gap = data.gap ?? null;
    this.number_columns = data.columns ?? null;
    this.number_createdAt = data.createdAt ?? null;
    this.number_updatedAt = data.updatedAt ?? null;
    this.image_medias = data.image_medias ?? [];
    this.articles = data.articles ?? [];
    this.mode = mode;
  }

  addMedia(media: MediaObject): void {
    this.image_medias.push(media);
  }

  removeMedia(index: number): void {
    this.image_medias.splice(index, 1);
  }

  addArticle(article: ArticleObject): void {
    this.articles.push(article);
  }

  removeArticle(index: number): void {
    this.articles.splice(index, 1);
  }

  toJSON() {
    return {
      id: this.number_id,
      nom_bloc: this.text_nom_bloc,
      page_id: this.number_page_id,
      titre: this.text_titre,
      type: this.text_type,
      bloc_position: this.number_bloc_position,
      langue_bloc: this.text_langue_bloc,
      is_full_width: this.number_is_full_width,
      width: this.number_width,
      height: this.number_height,
      gap: this.number_gap,
      columns: this.number_columns,
      createdAt: this.number_createdAt,
      updatedAt: this.number_updatedAt,
      image_medias: this.image_medias.map((m) => m.toJSON()),
      articles: this.articles.map((a) => a.toJSON()),
    };
  }
}
