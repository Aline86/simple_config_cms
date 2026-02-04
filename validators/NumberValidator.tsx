import { z } from "zod";

/**
 * Configuration des paramètres de validation pour un input number
 */
export class Parameter {
  type?: "number" | "range";
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  integer?: boolean;
  positive?: boolean;
  negative?: boolean;
  nonnegative?: boolean;
  multipleOf?: number;
  defaultValue?: number;
  errorMessages?: {
    min?: string;
    max?: string;
    required?: string;
    integer?: string;
    positive?: string;
    negative?: string;
    nonnegative?: string;
    multipleOf?: string;
    type?: string;
  };

  constructor(config?: Partial<Parameter>) {
    Object.assign(this, config);
  }
}

/**
 * Validateur pour input number basé sur Zod
 */
export class NumberValidator {
  private schema: z.ZodNumber | z.ZodOptional<z.ZodNumber>;
  private params: Parameter;
  private _value: unknown;
  private errors: string[] = [];

  constructor(value: number | undefined, params: Parameter) {
    this.value = value;
    this.params = params;
    this.schema = this.buildSchema();
  }

  /**
   * Construit le schema Zod à partir des paramètres
   */
  private buildSchema() {
    let schema = z.number();

    if (!this.params.required) {
      schema = schema.refine((val) => typeof val === "number", {
        message: "Doit être un nombre",
      });
    }

    if (this.params.integer) {
      schema = schema.refine((val) => Number.isInteger(val), {
        message:
          this.params.errorMessages?.integer || "Doit être un nombre entier",
      });
    }

    if (this.params.min !== undefined) {
      schema = schema.refine((val) => val >= this.params.min!, {
        message:
          this.params.errorMessages?.min ||
          `La valeur minimale est ${this.params.min}`,
      });
    }

    if (this.params.max !== undefined) {
      schema = schema.refine((val) => val <= this.params.max!, {
        message:
          this.params.errorMessages?.max ||
          `La valeur maximale est ${this.params.max}`,
      });
    }

    if (this.params.positive) {
      schema = schema.refine((val) => val > 0, {
        message:
          this.params.errorMessages?.positive ||
          "Doit être un nombre positif (> 0)",
      });
    }

    if (this.params.nonnegative) {
      schema = schema.refine((val) => val >= 0, {
        message:
          this.params.errorMessages?.nonnegative ||
          "Doit être un nombre non négatif (≥ 0)",
      });
    }

    return schema;
  }

  /**
   * Valide la valeur et remplit this.errors
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
  getParams(): Parameter {
    return this.params;
  }

  // Getter et setter pour value
  get value(): unknown {
    return this._value;
  }

  set value(val: unknown) {
    this._value = val;
  }
}
