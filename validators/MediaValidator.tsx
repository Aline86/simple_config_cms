import { z } from "zod";

/**
 * Configuration des paramètres de validation pour une URL Cloudinary
 */
export class CloudinaryParameter {
  required?: boolean;
  resourceTypes?: Array<"image" | "video" | "raw">;
  allowedFormats?: string[];
  placeholder?: string;
  errorMessages?: {
    required?: string;
    url?: string;
    cloudinary?: string;
    format?: string;
  };

  constructor(config?: Partial<CloudinaryParameter>) {
    Object.assign(this, config);
  }
}

/**
 * Validateur Cloudinary basé sur Zod
 */
export default class CloudinaryValidator {
  private schema: z.ZodString | z.ZodOptional<z.ZodString>;
  private params: CloudinaryParameter;
  private _value: unknown; //
  private errors: string[] = [];

  constructor(value: unknown, params: CloudinaryParameter = {}) {
    this._value = value;
    this.params = params;
    this.schema = this.buildSchema();
  }

  /**
   * Construit le schema Zod à partir des paramètres
   */
  private buildSchema() {
    let schema = z.string();

    // Required
    if (this.params.required) {
      schema = schema.min(1, {
        message: this.params.errorMessages?.required || "Champ requis",
      });
    }

    // Validation Cloudinary
    schema = schema.refine(
      (url) => {
        if (
          url === null ||
          url === undefined ||
          typeof url !== "string" ||
          url === ""
        ) {
          return true; // optional ou vide accepté
        }

        const resourceTypes =
          this.params.resourceTypes?.join("|") || "image|video|raw";
        const allowedFormats =
          this.params.allowedFormats?.join("|") || "jpg|jpeg|png|webp";

        // Regex plus permissive
        const cloudinaryRegex = new RegExp(
          `^https?:\\/\\/res\\.cloudinary\\.com\\/[^/]+\\/(${resourceTypes})\\/upload(?:\\/[^/]+)*\\/[^/]+\\.(${allowedFormats})(\\?.*)?$`,
          "i",
        );

        return cloudinaryRegex.test(url);
      },
      {
        message:
          this.params.errorMessages?.cloudinary ||
          "Doit être une URL Cloudinary valide",
      },
    );

    // Si le champ n’est pas requis, rendre optionnel
    if (!this.params.required) {
      schema.optional();
    }

    return schema;
  }

  /**
   * Vérifie la validité et remplit this.errors
   */
  validate(): { valid: boolean; errors: string[] } {
    const result = this.schema.safeParse(this.value);

    this.errors = [];

    if (!result.success) {
      this.errors = result.error.issues.map((issue) => issue.message);
      return { valid: false, errors: this.errors };
    }

    return { valid: true, errors: this.errors };
  }

  // Getter et setter pour value

  get value(): unknown {
    return this._value;
  }

  set value(val: unknown) {
    this._value = val;
  }
  /**
   * Raccourci booléen
   */
  isValid(): boolean {
    return this.validate().valid;
  }

  /**
   * Récupère les erreurs
   */
  getErrors(): readonly string[] {
    return this.errors;
  }

  /**
   * Récupère les paramètres
   */
  getParams(): CloudinaryParameter {
    return this.params;
  }
}
