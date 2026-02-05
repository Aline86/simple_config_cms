import { immerable } from "immer";
import { MediaObject } from "./bloc/MediaObject";
import { TypeBloc } from "./Page";
import { ArticleObject } from "./bloc/Article";
import { BaseValidatable } from "./BaseValidator";

export class BlocObject extends BaseValidatable {
  [immerable] = true;

  // Structure des blocs (stockés en JSON dans Prisma)
  public id: string | null;
  public text_nom_bloc: string | null;
  public number_page_id: number | null;
  public text_titre: string | null;
  public text_description: string | null;
  public color_background_color: string | null;
  public type: TypeBloc | string;
  public bloc_position: number | null;
  public langue_bloc: string | null;
  public checkbox_is_full_width: boolean;
  public number_width: number | null;
  public number_height: number | null;
  public number_gap: number | null;
  public number_columns: number | null;
  public text_createdAt: Date | null;
  public text_updatedAt: Date | null;
  public image_medias: MediaObject[];
  public articles: ArticleObject[];
  public mode: string;

  constructor(
    data: {
      id?: string | null;
      text_nom_bloc?: string | null;
      number_page_id?: number | null;
      text_titre?: string | null;
      text_description?: string | null;
      color_background_color?: string | null;
      type?: TypeBloc | string;
      bloc_position?: number | null;
      langue_bloc?: string | null;
      checkbox_is_full_width?: boolean;
      number_width?: number | null;
      number_height?: number | null;
      number_gap?: number | null;
      number_columns?: number | null;
      text_createdAt?: Date | null;
      text_updatedAt?: Date | null;
      image_medias?: MediaObject[] | any[];
      articles?: ArticleObject[];
    } = {},
    mode: string = "edition",
  ) {
    super();
    this.id = data.id ?? null;
    this.text_nom_bloc = data.text_nom_bloc ?? "";
    this.number_page_id = data.number_page_id ?? null;
    this.text_titre = data.text_titre ?? "";
    this.text_description = data.text_description ?? "";
    this.color_background_color = data.color_background_color ?? null;
    this.type = data.type ?? "";
    this.bloc_position = data.bloc_position ?? null;
    this.langue_bloc = data.langue_bloc ?? null;
    this.checkbox_is_full_width = data.checkbox_is_full_width ?? false;
    this.number_width = data.number_width ?? 75;
    this.number_height = data.number_height ?? 75;
    this.number_gap = data.number_gap ?? 30;
    this.number_columns = data.number_columns ?? 3;
    this.text_createdAt = data.text_createdAt
      ? new Date(data.text_createdAt)
      : new Date();
    this.text_updatedAt = data.text_updatedAt
      ? new Date(data.text_updatedAt)
      : new Date();
    // Réhydrater les MediaObject
    this.image_medias = (data.image_medias ?? []).map((m: any) => {
      if (m instanceof MediaObject) return m;
      return new MediaObject(m);
    });

    // Réhydrater les ArticleObject
    this.articles = (data.articles ?? []).map((a: any) => {
      if (a instanceof ArticleObject) return a;
      return new ArticleObject(a);
    });

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
      id: this.id,
      text_nom_bloc: this.text_nom_bloc,
      number_page_id: this.number_page_id,
      text_titre: this.text_titre,
      text_description: this.text_description,
      color_background_color: this.color_background_color,
      type: this.type,
      bloc_position: this.bloc_position,
      langue_bloc: this.langue_bloc,
      checkbox_is_full_width: this.checkbox_is_full_width,
      number_width: this.number_width,
      number_height: this.number_height,
      number_gap: this.number_gap,
      number_columns: this.number_columns,
      text_createdAt: this.text_createdAt,
      text_updatedAt: this.text_updatedAt,
      image_medias: this.image_medias.map((m) => m.toJSON()),
      articles: this.articles.map((a) => a.toJSON()),
    };
  }
}
