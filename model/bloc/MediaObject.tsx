import { immerable } from "immer";
import { BaseValidatable } from "../VaseValidator";
export class MediaObject extends BaseValidatable {
  [immerable] = true;

  public number_id: string | null;
  public number_bloc_id: string | null;
  public text_titre: string | null;
  public text_image_lien: string | null;
  public number_position_image: number | null;
  public image_image_url: string | null;

  constructor(
    data: {
      id?: string | null;
      bloc_id?: string | null;
      titre?: string;
      image_lien?: string;
      position_image?: number;
      image_url?: string;
    } = {},
  ) {
    super();
    this.number_id = data.id ?? crypto.randomUUID();
    this.number_bloc_id = data.bloc_id ?? null;
    this.text_titre = data.titre ?? null;
    this.text_image_lien = data.image_lien ?? null;
    this.number_position_image = data.position_image ?? null;
    this.image_image_url = data.image_url ?? null;
  }

  toJSON() {
    return {
      id: this.number_id,
      bloc_id: this.number_bloc_id,
      titre: this.text_titre,
      image_lien: this.text_image_lien,
      position_image: this.number_position_image,
      image_url: this.image_image_url,
    };
  }
}
