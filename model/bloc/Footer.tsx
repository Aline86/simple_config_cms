import { immerable } from "immer";
import { MediaObject } from "./MediaObject";
import { BaseValidatable } from "../BaseValidator";

export class FooterObject extends BaseValidatable {
  [immerable] = true;

  // Aligné sur Prisma Footer: id, number_page_id, color_background_color, text_nom_site_adresse, text_adresse_footer, text_code_postal
  public number_id: number | null;

  public color_background_color: string | null;
  public text_nom_site_adresse: string | null;
  public text_adresse_footer: string | null;
  public text_code_postal: string | null;

  // Relation
  public reseaux: MediaObject[];
  public mode: string;
  constructor(
    data: {
      number_id?: number | null;

      color_background_color?: string | null;
      text_nom_site_adresse?: string | null;
      text_adresse_footer?: string | null;
      text_code_postal?: string | null;
      reseaux?: MediaObject[] | any[];
    } = {},
    mode: string,
  ) {
    super();
    this.number_id = data.number_id ?? null;

    this.color_background_color = data.color_background_color ?? "#ffffff";
    this.text_nom_site_adresse = data.text_nom_site_adresse ?? null;
    this.text_adresse_footer = data.text_adresse_footer ?? null;
    this.text_code_postal = data.text_code_postal ?? null;

    // Réhydrater les réseaux sociaux
    this.reseaux = (data.reseaux ?? []).map((r: any) =>
      r instanceof MediaObject ? r : new MediaObject(r),
    );
    this.mode = mode ?? "edition";
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

      color_background_color: this.color_background_color,
      text_nom_site_adresse: this.text_nom_site_adresse,
      text_adresse_footer: this.text_adresse_footer,
      text_code_postal: this.text_code_postal,
      reseaux: this.reseaux.map((r) => r.toJSON()),
    };
  }
}
