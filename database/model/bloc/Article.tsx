import { immerable } from "immer";
import { MediaObject } from "./MediaObject";
import { JSONContent } from "tiptap";
import { BaseValidatable } from "../BaseValidator";
import { output } from "../../../lib/helpers/tiptapFunctions";

export class ArticleObject extends BaseValidatable {
  [immerable] = true;

  // Structure des articles (stockés en JSON dans les blocs)
  public id: string | null;
  public text_bloc_id: string | null;
  public text_article: JSONContent | null;
  public number_text_width: number | null;
  public number_height: number | null;
  public number_text_margins: number | null;
  public images: MediaObject[];
  public text_images_position: string;

  constructor(
    data: {
      id?: string | null;
      text_bloc_id?: string | null;
      text_article?: JSONContent | null;
      number_text_width?: number | null;
      number_height?: number | null;
      number_text_margins?: number | null;
      images?: MediaObject[] | any[];
      text_images_position?: string;
    } = {},
  ) {
    super();

    this.id = data.id ?? null;
    this.text_bloc_id = data.text_bloc_id ?? null;
    this.text_article = data.text_article ?? null;
    this.number_text_width = data.number_text_width ?? 100;
    this.number_height = data.number_height ?? 100;
    this.number_text_margins = data.number_text_margins ?? 30;
    this.images = (data.images ?? []).map((img: any) =>
      img instanceof MediaObject ? img : new MediaObject(img),
    );
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
      id: this.id,
      text_bloc_id: this.text_bloc_id,
      text_article: this.text_article,
      text_images_position: this.text_images_position,
      text_width: this.number_text_width,
      number_height: this.number_height,
      text_margins: this.number_text_margins,
      images: this.images.map((img) => img.toJSON()),
    };
  }
}
