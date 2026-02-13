import { immerable } from "immer";
import { BlocObject } from "./Bloc";
import { BaseValidatable } from "./BaseValidator";
import slugify from "slugify";

// enums/TypeBloc.ts
export enum TypeBloc {
  CAROUSEL = "CAROUSEL",
  IMAGE_GROUPE = "IMAGE_GROUPE",
  TEXTE = "TEXTE",
  BUTTON = "BOUTON",
  SCREEN = "SCREEN",
  VIDEO = "VIDEO",
  HEADER = "HEADER",
  FOOTER = "FOOTER",
}

export class PageObject extends BaseValidatable {
  [immerable] = true;

  public number_id: number | null;
  public number_parent_id: number | null;
  public checkbox_published: boolean;
  public checkbox_home_page: boolean;
  public text_titre: string | null;
  public text_description: string | null;
  public text_slug: string | null;
  public number_page_position: number | null;
  public text_langue: string | null;
  public text_createdAt: Date | null;
  public text_updatedAt: Date | null;
  public blocs: BlocObject[];
  public mode: string;

  constructor(
    data: {
      id?: number | null;
      number_id?: number | null;
      parent_id?: number | null;
      number_parent_id?: number | null;
      published?: boolean;
      checkbox_home_page?: boolean;
      checkbox_published?: boolean;
      text_titre?: string | null;
      text_description?: string | null;
      slug?: string | null;
      text_slug?: string | null;
      page_position?: number | null;
      number_page_position?: number | null;
      langue?: string | null;
      text_langue?: string | null;
      text_createdAt?: Date | string | null;

      text_updatedAt?: Date | string | null;
      blocs?: BlocObject[] | string;
    } = {},
    mode: string = "edition",
  ) {
    super();

    this.number_id = data.number_id ?? data.id ?? null;
    this.number_parent_id = data.number_parent_id ?? data.parent_id ?? null;
    this.checkbox_published =
      data.checkbox_published ?? data.published ?? false;
    this.checkbox_home_page =
      data.checkbox_home_page ?? data.checkbox_home_page ?? false;
    this.text_titre = data.text_titre ?? data.text_titre ?? null;
    this.text_slug = data.text_slug ?? data.slug ?? null;
    this.number_page_position =
      data.number_page_position ?? data.page_position ?? 0;
    this.text_langue = data.text_langue ?? data.langue ?? "fr_FR";
    this.text_description = data.text_description ?? "";
    this.text_createdAt = data.text_createdAt
      ? new Date(data.text_createdAt)
      : data.text_createdAt
        ? new Date(data.text_createdAt)
        : null;

    this.text_updatedAt = data.text_updatedAt
      ? new Date(data.text_updatedAt)
      : data.text_updatedAt
        ? new Date(data.text_updatedAt)
        : null;

    this.blocs = [];

    if (typeof data.blocs === "string") {
      const blocs = JSON.parse(data.blocs);
      blocs.length > 0 && Array.isArray(blocs)
        ? blocs.forEach((b: BlocObject) =>
            this.addBloc(new BlocObject(b, mode)),
          )
        : [];
    } else if (Array.isArray(data.blocs)) {
      data.blocs.forEach((b: BlocObject) => {
        if (b instanceof BlocObject) {
          this.addBloc(b);
        } else {
          this.addBloc(new BlocObject(b, mode));
        }
      });
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
    (this as unknown)[field] = value;
    if (field === "text_titre") {
      this.text_slug = slugify(value as unknown as string, {
        lower: true,
        strict: true,
      });
    }
  }

  toJSON() {
    return {
      number_id: this.number_id,
      number_parent_id: this.number_parent_id,
      checkbox_published: this.checkbox_published,
      checkbox_home_page: this.checkbox_home_page,
      text_titre: this.text_titre,
      text_description: this.text_description,
      text_slug: this.text_slug,
      number_page_position: this.number_page_position,
      text_langue: this.text_langue,
      text_createdAt: this.text_createdAt,
      text_updatedAt: this.text_updatedAt,
      blocs: this.blocs.map((b) => b.toJSON()),
    };
  }
}
