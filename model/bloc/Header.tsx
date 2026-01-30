import { immerable } from "immer";
import { MediaObject } from "./MediaObject";
import { BaseValidatable } from "../BaseValidator";

export class HeaderObject extends BaseValidatable {
  [immerable] = true;

  // Aligné sur Prisma Header: id, number_page_id, nom_site, background_url
  public number_id: number | null;

  public text_nom_site: string | null;
  public text_background_url: string | null;

  // Relations
  public image_logo: MediaObject | null;
  public image_favicon: MediaObject | null;
  public reseaux: MediaObject[];
  public mode: string;
  constructor(
    data: {
      number_id?: number | null;

      text_nom_site?: string | null;
      text_background_url?: string | null;
      image_logo?: MediaObject | any;
      image_favicon?: MediaObject | any;
      reseaux?: MediaObject[] | any[];
    } = {},
    mode: string,
  ) {
    super();
    this.number_id = data.number_id ?? null;
    this.text_nom_site = data.text_nom_site ?? null;
    this.text_background_url = data.text_background_url ?? null;
    this.mode = mode ?? "edition";
    // Réhydrater le logo
    if (data.image_logo) {
      this.image_logo =
        data.image_logo instanceof MediaObject
          ? data.image_logo
          : new MediaObject(data.image_logo);
    } else {
      this.image_logo = new MediaObject({
        text_bloc_id: data.number_id as number,
      });
    }

    // Réhydrater le favicon
    if (data.image_favicon) {
      this.image_favicon =
        data.image_favicon instanceof MediaObject
          ? data.image_favicon
          : new MediaObject(data.image_favicon);
    } else {
      this.image_favicon = new MediaObject({
        text_bloc_id: data.number_id as number,
      });
    }

    // Réhydrater les réseaux sociaux
    this.reseaux = (data.reseaux ?? []).map((r: any) => new MediaObject(r));
  }

  addReseau(media: MediaObject): void {
    this.reseaux.push(media);
  }

  removeReseau(index: number): void {
    this.reseaux.splice(index, 1);
  }

  toJSON() {
    return {
      id: this.number_id,

      nom_site: this.text_nom_site,
      background_url: this.text_background_url,
      logo: this.image_logo?.toJSON() ?? null,
      favicon: this.image_favicon?.toJSON() ?? null,
      reseaux: this.reseaux.map((r) => r.toJSON()),
    };
  }
}
