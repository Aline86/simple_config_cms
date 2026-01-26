import { immerable } from "immer";
import { BlocObject } from "./Bloc";

// enums/TypeMedia.ts
export enum TypeMedia {
  RESEAU_SOCIAL = "RESEAU_SOCIAL",
  LOGO = "LOGO",
  FAVICON = "FAVICON",
  IMAGE_BLOC = "IMAGE_BLOC",
  IMAGE_ARTICLE = "IMAGE_ARTICLE",
}

// enums/TypeBloc.ts
export enum TypeBloc {
  CAROUSEL = "CAROUSEL",
  IMAGE_GROUPE = "IMAGE_GROUPE",
  TEXTE = "TEXTE",
  BUTTON = "BOUTON",
  SCREEN = "SCREEN",
  VIDEO = "VIDEO",
}

// classes/MediaObject.ts

export class PageObject {
  [immerable] = true;

  public number_id: string | null;
  public number_parent_id: number | null;
  public checkbox_published: boolean;
  public text_titre: string | null;
  public number_page_position: number | null;
  public text_langue: string | null;
  public number_createdAt: Date | null;
  public number_updatedAt: Date | null;
  public blocs: BlocObject[];
  public mode: string;
  constructor(
    data: {
      id?: string | null;
      parent_id?: number | null;
      published?: boolean;
      titre?: string;
      page_position?: number;
      langue?: string;
      createdAt?: Date;
      updatedAt?: Date;
      blocs?: BlocObject[];
    } = {},
    mode: string = "edition",
  ) {
    this.number_id = data.id ?? null;
    this.number_parent_id = data.parent_id ?? null;
    this.checkbox_published = data.published ?? false;
    this.text_titre = data.titre ?? null;
    this.number_page_position = data.page_position ?? null;
    this.text_langue = data.langue ?? null;
    this.number_createdAt = data.createdAt ?? null;
    this.number_updatedAt = data.updatedAt ?? null;
    this.blocs = data.blocs ?? [];
    this.mode = mode;
  }

  addBloc(bloc: BlocObject): void {
    this.blocs.push(bloc);
  }

  removeBloc(index: number): void {
    this.blocs.splice(index, 1);
  }

  toJSON() {
    return {
      id: this.number_id,
      parent_id: this.number_parent_id,
      published: this.checkbox_published,
      titre: this.text_titre,
      page_position: this.number_page_position,
      langue: this.text_langue,
      createdAt: this.number_createdAt,
      updatedAt: this.number_updatedAt,
      blocs: this.blocs.map((b) => b.toJSON()),
    };
  }
}
