import { immerable } from "immer";
import { MediaObject } from "./MediaObject";
import { JSONContent } from "@tiptap/core";
import { BaseValidatable } from "../VaseValidator";

export class ArticleObject extends BaseValidatable {
  [immerable] = true;

  public number_id: string | null;
  public number_bloc_id: string | null;
  public text_text_article: JSONContent | null;
  public number_text_width: number | null;
  public number_text_height: number | null;
  public number_text_margins: number | null;
  public images: MediaObject[];
  public text_images_position: string;

  constructor(
    data: {
      id?: string | null;
      bloc_id?: string | null;
      text_article?: JSONContent;
      text_width?: number;
      text_height?: number;
      text_margins?: number;
      images?: MediaObject[];
      text_images_position?: string;
    } = {},
  ) {
    super();
    this.number_id = data.id ?? null;
    this.number_bloc_id = data.bloc_id ?? null;
    this.text_text_article = data.text_article ?? null;
    this.number_text_width = data.text_width ?? null;
    this.number_text_height = data.text_height ?? null;
    this.number_text_margins = data.text_margins ?? null;
    this.images = data.images ?? [];
    this.text_images_position = data.text_images_position ?? "top";
  }

  addImage(media: MediaObject): void {
    this.images.push(media);
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
  }

  toJSON() {
    return {
      id: this.number_id,
      bloc_id: this.number_bloc_id,
      text_article: this.text_text_article,
      text_images_position: this.text_images_position,
      text_width: this.number_text_width,
      text_height: this.number_text_height,
      text_margins: this.number_text_margins,
      images: this.images.map((img) => img.toJSON()),
    };
  }
}
