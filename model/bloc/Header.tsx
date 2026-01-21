// classes/HeaderObject.ts
import { immerable } from "immer";
import { MediaObject } from "./MediaObject";

export class HeaderObject {
  [immerable] = true;

  public number_id: string | null;
  public number_bloc_id: number | null;
  public image_logo: MediaObject | null;
  public image_favicon: MediaObject | null;
  public text_nom_site: string | null;
  public text_background_url: string | null | MediaObject;
  public image_reseaux: MediaObject[];

  constructor(
    data: {
      id?: string;
      bloc_id?: number;
      logo?: MediaObject;
      favicon?: MediaObject;
      nom_site?: string;
      background_url?: string | MediaObject;
      description?: string;
      reseaux?: MediaObject[];
    } = {},
  ) {
    this.number_id = data.id ?? null;
    this.number_bloc_id = data.bloc_id ?? null;
    this.image_logo = data.logo ?? null;
    this.image_favicon = data.favicon ?? null;
    this.text_nom_site = data.nom_site ?? null;
    this.text_background_url = data.background_url ?? null;
    this.image_reseaux = data.reseaux ?? [];
  }

  addReseau(media: MediaObject): HeaderObject {
    return new HeaderObject({
      reseaux: [...this.image_reseaux, media],
    });
  }

  removeReseau(index: number): void {
    this.image_reseaux.splice(index, 1);
  }

  toJSON() {
    return {
      id: this.number_id,
      bloc_id: this.number_bloc_id,
      logo: this.image_logo?.toJSON() ?? null,
      favicon: this.image_favicon?.toJSON() ?? null,
      nom_site: this.text_nom_site,
      background_url: this.text_background_url,
      reseaux: this.image_reseaux.map((r) => r.toJSON()),
    };
  }
}
