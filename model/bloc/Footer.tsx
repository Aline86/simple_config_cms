import { immerable } from "immer";
import { MediaObject } from "./MediaObject";
import { BaseValidatable } from "../BaseValidator";

export class FooterObject extends BaseValidatable {
  [immerable] = true;

  // Aligné sur Prisma Footer: id, number_page_id, background_color, nom_site_adresse, adresse_footer, code_postal
  public number_id: number | null;
  public number_page_id: number | null;
  public color_background_color: string | null;
  public text_nom_site_adresse: string | null;
  public text_adresse_footer: string | null;
  public text_code_postal: string | null;

  // Relation
  public image_reseaux: MediaObject[];

  constructor(
    data: {
      id?: number | null;
      number_page_id?: number | null;
      background_color?: string | null;
      nom_site_adresse?: string | null;
      adresse_footer?: string | null;
      code_postal?: string | null;
      reseaux?: MediaObject[] | any[];
    } = {},
  ) {
    super();
    this.number_id = data.id ?? null;
    this.number_page_id = data.number_page_id ?? null;
    this.color_background_color = data.background_color ?? "#ffffff";
    this.text_nom_site_adresse = data.nom_site_adresse ?? null;
    this.text_adresse_footer = data.adresse_footer ?? null;
    this.text_code_postal = data.code_postal ?? null;

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
      background_color: this.color_background_color,
      nom_site_adresse: this.text_nom_site_adresse,
      adresse_footer: this.text_adresse_footer,
      code_postal: this.text_code_postal,
      reseaux: this.image_reseaux.map((r) => r.toJSON()),
    };
  }
}
