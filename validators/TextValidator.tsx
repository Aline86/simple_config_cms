import TextInput from "@/components/ui/Text/TextInput";
import { z } from "zod";

export class TextParameter {
  minLength?: number;
  maxLength?: number;
  isDate?: boolean;
  pattern?: RegExp;
  required?: boolean;
  email?: boolean;
  url?: boolean;
  trim?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  placeholder?: string;
  type?: string;
  multiline?: number;
  isInternUrl?: boolean;
  errorMessages?: {
    multiline?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
    required?: string;
    email?: string;
    url?: string;
    isDate?: string;
  };

  constructor(config?: Partial<TextParameter>) {
    Object.assign(this, config);
  }
}
// validators/types.ts
export interface IValidator {
  validate(value?: unknown): { valid: boolean; errors?: string[] };
  isValid(value?: unknown): boolean;
  getErrors(): readonly string[];
  render(): React.ReactElement | React.ReactNode;
}
export class TextValidator {
  private schema;
  private _params: TextParameter;
  private errors: string[] = [];
  private _value: unknown;

  constructor(value: unknown, params: TextParameter) {
    this._params = params;
    this._value = value;
    this.schema = this.buildSchema();
  }

  private buildSchema() {
    let schema = z.string();

    if (this._params.trim) schema = schema.trim();
    if (this._params.lowercase) schema = schema.toLowerCase();
    if (this._params.uppercase) schema = schema.toUpperCase();

    if (this._params.email && this._params.url) {
      throw new Error("email et url sont incompatibles");
    }

    if (this._params.email) {
      schema = schema.email({
        message:
          this._params.errorMessages?.email ??
          "Doit être une adresse email valide",
      });
    }
    if (this._params.isDate) {
      z.union([z.string(), z.date()])
        .refine(
          (value) => {
            const date = value instanceof Date ? value : new Date(value);
            return !isNaN(date.getTime());
          },
          {
            message:
              this._params.errorMessages?.isDate ?? "La date n’est pas valide",
          },
        )
        .transform((value) =>
          value instanceof Date ? value : new Date(value),
        );
    }

    /*if (this._params.url) {
      schema = schema.url(
        this._params.errorMessages?.url ?? "Doit être une URL valide",
      );
    }*/

    if (this._params.minLength !== undefined) {
      schema = schema.min(this._params.minLength, {
        message:
          this._params.errorMessages?.minLength ||
          `Doit contenir au moins ${this._params.minLength} caractère${
            this._params.minLength > 1 ? "s" : ""
          }`,
      });
    }

    if (this._params.maxLength !== undefined) {
      schema = schema.max(this._params.maxLength, {
        message:
          this._params.errorMessages?.maxLength ||
          `Doit contenir au maximum ${this._params.maxLength} caractère${
            this._params.maxLength > 1 ? "s" : ""
          }`,
      });
    }

    if (this._params.pattern) {
      schema = schema.regex(this._params.pattern, {
        message: this._params.errorMessages?.pattern || "Format invalide",
      });
    }

    /*if (this._params.multiline) {
      schema = schema.refine(
        (val) => typeof val === "string" && val.includes("\n"),
        {
          message:
            this._params.errorMessages?.multiline ||
            "Le texte doit contenir au moins un retour à la ligne",
        },
      );
    }*/

    return schema;
  }

  validate(value?: unknown): { valid: boolean; errors: string[] } {
    if (value !== undefined) this._value = value;

    const result = this.schema.safeParse(this._value);
    this.errors = [];

    if (!result.success) {
      this.errors = result.error.issues.map((issue) => issue.message);
      return { valid: false, errors: this.errors };
    }

    return { valid: true, errors: this.errors };
  }

  isValid(value?: unknown): boolean {
    return this.validate(value).valid;
  }

  getErrors(): readonly string[] {
    return this.errors;
  }

  // Getter et setter pour value

  get value(): unknown {
    return this._value;
  }

  set value(val: unknown) {
    this._value = val;
  }

  // Getter pour params
  getParams(): TextParameter {
    return this._params;
  }
}
