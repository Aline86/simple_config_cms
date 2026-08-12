import { immerable } from "immer";
import { MediaObject } from "./MediaObject";
import { BaseValidatable } from "../BaseValidator";
import { TypeBloc } from "../Page";

export class HeaderObject extends BaseValidatable {
  [immerable] = true;
  public number_id: number | null;
  public text_nom_bloc = "header";
  public type = TypeBloc.HEADER;
  public text_nom_site: string | null;
  public text_background_url: string | null;
  public logo: MediaObject | null;
  public favicon: MediaObject | null;
  public reseaux: MediaObject[];
  public mode: string;
  constructor(
    data: {
      number_id?: number | null;

      text_nom_site?: string | null;
      text_background_url?: string | null;
      logo?: MediaObject;
      favicon?: MediaObject;
      reseaux?: MediaObject[];
    } = {},
    mode: string,
  ) {
    super();
    this.number_id = data.number_id ?? null;
    this.text_nom_site = data.text_nom_site ?? null;
    this.text_background_url = data.text_background_url ?? null;
    this.mode = mode;
    // Réhydrater le logo
    if (data.logo) {
      this.logo =
        data.logo instanceof MediaObject
          ? data.logo
          : new MediaObject(data.logo);
    } else {
      this.logo = new MediaObject({
        text_bloc_id: data.number_id as number,
      });
    }

    // Réhydrater le favicon
    if (data.favicon) {
      this.favicon =
        data.favicon instanceof MediaObject
          ? data.favicon
          : new MediaObject(data.favicon);
    } else {
      this.favicon = new MediaObject({
        text_bloc_id: data.number_id as number,
      });
    }

    // Réhydrater les réseaux sociaux
    this.reseaux = (data.reseaux ?? []).map(
      (r: MediaObject) => new MediaObject(r),
    );
  }
  set_mode(mode: string): HeaderObject {
    return new HeaderObject(this, mode);
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
      logo: this.logo?.toJSON() ?? null,
      favicon: this.favicon?.toJSON() ?? null,
      reseaux: this.reseaux.map((r) => r.toJSON()),
    };
  }
}
