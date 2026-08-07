import { immerable } from "immer";
import { BaseValidatable } from "./BaseValidator";

export class ConfigurationObject extends BaseValidatable {
  [immerable] = true;

  public number_id: number | null;
  public number_taille: number | null;
  public color_main_color: string;
  public text_police: string;
  public text_createdAt: Date | null;
  public text_updatedAt: Date | null;

  constructor(
    data: {
      number_id?: number | null;
      number_taille?: number | null;
      color_main_color?: string | null;
      text_police?: string | null;
      text_createdAt?: Date | string | null;
      text_updatedAt?: Date | string | null;
    } = {},
  ) {
    super();
    this.number_id = data.number_id ?? null;
    this.number_taille = data.number_taille ?? null;
    this.color_main_color = data.color_main_color ?? "#000000";
    this.text_police = data.text_police ?? "";
    this.text_createdAt = data.text_createdAt
      ? new Date(data.text_createdAt)
      : new Date();
    this.text_updatedAt = data.text_updatedAt
      ? new Date(data.text_updatedAt)
      : new Date();
  }

  toJSON() {
    return {
      number_id: this.number_id,
      number_taille: this.number_taille,
      color_main_color: this.color_main_color,
      text_police: this.text_police,
      text_createdAt: this.text_createdAt,
      text_updatedAt: this.text_updatedAt,
    };
  }
}
