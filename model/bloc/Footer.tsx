// classes/FooterObject.ts
import { immerable } from "immer";
import { MediaObject } from "./MediaObject";

export class FooterObject {
  [immerable] = true;

  public number_id: string | null;
  public image_reseaux: MediaObject[];
  public text_nom_site_adresse: string | null;
  public text_adresse_footer: string | null;
  public text_code_postal: string | null;
  public color_background_color: string | null;
  constructor(
    data: {
      id?: string;
      reseaux?: MediaObject[];
      color_background_color?: string;
      nom_site_adresse?: string;
      adresse_footer?: string;
      code_postal?: string;
    } = {},
  ) {
    this.number_id = data.id ?? null;
    this.color_background_color = data.color_background_color ?? "#ffffff";

    this.image_reseaux = data.reseaux ?? [];
    this.text_nom_site_adresse = data.nom_site_adresse ?? null;
    this.text_adresse_footer = data.adresse_footer ?? null;
    this.text_code_postal = data.code_postal ?? null;
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
      reseaux: this.image_reseaux.map((r) => r.toJSON()),
      color_background_color: this.color_background_color,
      nom_site_adresse: this.text_nom_site_adresse,
      adresse_footer: this.text_adresse_footer,
      code_postal: this.text_code_postal,
    };
  }
}
