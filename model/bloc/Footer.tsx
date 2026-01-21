// classes/FooterObject.ts
import { immerable } from "immer";
import { MediaObject } from "./MediaObject";

export class FooterObject {
  [immerable] = true;

  public number_id: string | null;
  public number_bloc_id: number | null;
  public reseaux: MediaObject[];
  public text_nom_site_adresse: string | null;
  public text_adresse_footer: string | null;
  public text_code_postal: string | null;

  constructor(
    data: {
      id?: string;
      bloc_id?: number;
      reseaux?: MediaObject[];
      nom_site_adresse?: string;
      adresse_footer?: string;
      code_postal?: string;
    } = {},
  ) {
    this.number_id = data.id ?? null;
    this.number_bloc_id = data.bloc_id ?? null;
    this.reseaux = data.reseaux ?? [];
    this.text_nom_site_adresse = data.nom_site_adresse ?? null;
    this.text_adresse_footer = data.adresse_footer ?? null;
    this.text_code_postal = data.code_postal ?? null;
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
      bloc_id: this.number_bloc_id,
      reseaux: this.reseaux.map((r) => r.toJSON()),
      nom_site_adresse: this.text_nom_site_adresse,
      adresse_footer: this.text_adresse_footer,
      code_postal: this.text_code_postal,
    };
  }
}
