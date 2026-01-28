import { immerable } from "immer";
import { BlocObject } from "./Bloc";
import { BaseValidatable } from "./VaseValidator";
import slugify from "slugify";

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

export class PageObject extends BaseValidatable {
  [immerable] = true;

  public number_id: number | null;
  public number_parent_id: number | null;
  public checkbox_published: boolean;
  public text_titre: string | null;
  public text_slug: string | null;
  public number_page_position: number | null;
  public text_langue: string | null;
  public number_createdAt: Date | null;
  public number_updatedAt: Date | null;
  public blocs: BlocObject[];
  public mode: string;
  constructor(
    data: {
      id?: number | null;
      parent_id?: number | null;
      published?: boolean;
      titre?: string;
      slug?: string;
      page_position?: number;
      langue?: string;
      createdAt?: Date;
      updatedAt?: Date;
      blocs?: BlocObject[] | string;
    } = {},
    mode: string = "edition",
  ) {
    super();
    this.number_id = data.id ?? -1;
    this.number_parent_id = data.parent_id ?? -1;
    this.checkbox_published = data.published ?? false;
    this.text_titre = data.titre ?? null;
    this.text_slug = data.slug ?? null;
    this.number_page_position = data.page_position ?? null;
    this.text_langue = data.langue ?? "fr_FR";
    this.number_createdAt = data.createdAt ? new Date(data.createdAt) : null;
    this.number_updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;

    this.blocs = [];

    if (typeof data.blocs === "string") {
      JSON.parse(data.blocs).forEach((b: any) =>
        this.addBloc(new BlocObject(b)),
      );
    } else {
      (data.blocs ?? []).forEach((b: any) => this.addBloc(new BlocObject(b)));
    }

    this.mode = mode;
  }

  addBloc(bloc: BlocObject): void {
    this.blocs.push(bloc);
  }

  removeBloc(index: number): void {
    this.blocs.splice(index, 1);
  }
  setField<K extends keyof PageObject>(field: K, value: PageObject[K]) {
    (this as any)[field] = value;
    if (field === "text_titre") {
      this.text_slug = slugify(value as unknown as string);
    }
  }
  toJSON() {
    return {
      id: this.number_id,
      parent_id: this.number_parent_id,
      published: this.checkbox_published,
      titre: this.text_titre,
      slug: this.text_slug,
      page_position: this.number_page_position,
      langue: this.text_langue,
      createdAt: this.number_createdAt,
      updatedAt: this.number_updatedAt,
      blocs: this.blocs.map((b) => b.toJSON()),
    };
  }
}
