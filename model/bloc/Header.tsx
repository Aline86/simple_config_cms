import { immerable } from "immer";
import { MediaObject } from "./MediaObject";
import { BaseValidatable } from "../BaseValidator";

export class HeaderObject extends BaseValidatable {
  [immerable] = true;

  // Aligné sur Prisma Header: id, number_page_id, nom_site, background_url
  public number_id: number | null;
  public number_page_id: number | null;
  public text_nom_site: string | null;
  public text_background_url: string | null;

  // Relations
  public image_logo: MediaObject | null;
  public image_favicon: MediaObject | null;
  public image_reseaux: MediaObject[];

  constructor(
    data: {
      id?: number | null;
      number_page_id?: number | null;
      nom_site?: string | null;
      background_url?: string | null;
      logo?: MediaObject | any;
      favicon?: MediaObject | any;
      reseaux?: MediaObject[] | any[];
    } = {},
  ) {
    super();
    this.number_id = data.id ?? null;
    this.number_page_id = data.number_page_id ?? null;
    this.text_nom_site = data.nom_site ?? null;
    this.text_background_url = data.background_url ?? null;

    // Réhydrater le logo
    if (data.logo) {
      this.image_logo =
        data.logo instanceof MediaObject
          ? data.logo
          : new MediaObject(data.logo);
    } else {
      this.image_logo = null;
    }

    // Réhydrater le favicon
    if (data.favicon) {
      this.image_favicon =
        data.favicon instanceof MediaObject
          ? data.favicon
          : new MediaObject(data.favicon);
    } else {
      this.image_favicon = null;
    }

    // Réhydrater les réseaux sociaux
    this.image_reseaux = (data.reseaux ?? []).map((r: any) =>
      r instanceof MediaObject ? r : new MediaObject(r),
    );
  }

  addReseau(media: MediaObject): void {
    this.image_reseaux.push(media);
  }

  removeReseau(index: number): void {
    this.image_reseaux.splice(index, 1);
  }

  toJSON() {
    return {
      id: this.number_id,
      number_page_id: this.number_page_id,
      nom_site: this.text_nom_site,
      background_url: this.text_background_url,
      logo: this.image_logo?.toJSON() ?? null,
      favicon: this.image_favicon?.toJSON() ?? null,
      reseaux: this.image_reseaux.map((r) => r.toJSON()),
    };
  }
}
