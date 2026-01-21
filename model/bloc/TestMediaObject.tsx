import { immerable } from "immer";

export class MediaObject {
  [immerable] = true;

  public number_id: string | null;
  public number_bloc_id: number | null;
  public text_titre: string | null;
  public text_image_lien: string | null;
  public number_position_image: number | null;
  public image_image_url: string | null;
  public color_background_color: string | null;

  constructor(data: {
    id?: string;
    bloc_id?: number;
    titre?: string;
    image_lien?: string;
    position_image?: number;
    image_url?: string;
    background_color?: string;
  }) {
    this.number_id = data.id ?? null;
    this.number_bloc_id = data.bloc_id ?? null;
    this.text_titre = data.titre ?? null;
    this.text_image_lien = data.image_lien ?? null;
    this.number_position_image = data.position_image ?? null;
    this.image_image_url = data.image_url ?? null;
    this.color_background_color = data.background_color ?? null;
  }
}
