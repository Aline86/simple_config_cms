import { immerable } from "immer";
import { BaseValidatable } from "../BaseValidator";
import { nanoid } from "nanoid";

export class MediaObject extends BaseValidatable {
  [immerable] = true;

  // Aligné sur Prisma Media: id, text_titre, couleur_bg, image_lien, number_position_image, image_url
  // Autoincrement en BDD
  public id: string | number | null; // id temporaire côté client
  public text_bloc_id: string | null | number; // Pour les médias dans les blocs JSON
  public text_titre: string | null;
  public color_couleur_bg: string | null;
  public text_image_lien: string | null;
  public number_position_image: number | null;
  public image_url: string | null;

  constructor(
    data: {
      id?: string | number | null;
      text_bloc_id?: string | null | number;
      text_titre?: string | null;
      color_couleur_bg?: string | null;
      text_image_lien?: string | null;
      number_position_image?: number | null;
      image_url?: string | null;
      number_header_logo_id?: number | null;
      number_header_favicon_id?: number | null;
      number_header_reseaux_id?: number | null;
      number_footer_id?: number | null;
    } = {},
  ) {
    super();

    // Génération d'un id temporaire si non fourni
    this.id = data.id ?? nanoid();

    this.text_bloc_id = data.text_bloc_id ?? null;
    this.text_titre = data.text_titre ?? "";
    this.color_couleur_bg = data.color_couleur_bg ?? "#ffffff";
    this.text_image_lien = data.text_image_lien ?? "";
    this.number_position_image = data.number_position_image ?? 0;
    this.image_url = data.image_url ?? "";
  }

  toJSON() {
    return {
      id: this.id, // Pour JSON, on utilise le string id
      bloc_id: this.text_bloc_id,
      text_titre: this.text_titre,
      couleur_bg: this.color_couleur_bg,
      image_lien: this.text_image_lien,
      number_position_image: this.number_position_image,
      image_url: this.image_url,
    };
  }
}
