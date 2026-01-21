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

    // Required
    if (this.params.required) {
      schema = schema.refine((val) => val !== undefined && val !== null, {
        message: this.params.errorMessages?.required || "Champ requis",
      });
    }

    // Type number
    schema = schema.refine(
      (val) => typeof val === "number" && !Number.isNaN(val),
      {
        message: this.params.errorMessages?.type || "Doit être un nombre",
      },
    );

    // Integer
    if (this.params.integer) {
      schema = schema.refine((val) => Number.isInteger(val), {
        message:
          this.params.errorMessages?.integer || "Doit être un nombre entier",
      });
    }

    // Min
    if (this.params.min !== undefined) {
      schema = schema.refine((val) => val >= this.params.min!, {
        message:
          this.params.errorMessages?.min ||
          `La valeur minimale est ${this.params.min}`,
      });
    }

    // Max
    if (this.params.max !== undefined) {
      schema = schema.refine((val) => val <= this.params.max!, {
        message:
          this.params.errorMessages?.max ||
          `La valeur maximale est ${this.params.max}`,
      });
    }

    // Positive (> 0)
    if (this.params.positive) {
      schema = schema.refine((val) => val > 0, {
        message:
          this.params.errorMessages?.positive ||
          "Doit être un nombre positif (> 0)",
      });
    }

    // Negative (< 0)
    if (this.params.negative) {
      schema = schema.refine((val) => val < 0, {
        message:
          this.params.errorMessages?.negative ||
          "Doit être un nombre négatif (< 0)",
      });
    }

    // Nonnegative (>= 0)
    if (this.params.nonnegative) {
      schema = schema.refine((val) => val >= 0, {
        message:
          this.params.errorMessages?.nonnegative ||
          "Doit être un nombre non négatif (≥ 0)",
      });
    }

    // MultipleOf
    if (this.params.multipleOf !== undefined) {
      schema = schema.refine((val) => val % this.params.multipleOf! === 0, {
        message:
          this.params.errorMessages?.multipleOf ||
          `Doit être un multiple de ${this.params.multipleOf}`,
      });
    }

    // Step
    if (
      this.params.step !== undefined &&
      this.params.multipleOf === undefined
    ) {
      schema = schema.refine(
        (val) => {
          const factor = 1 / this.params.step!;
          return Math.abs((val * factor) % 1) < 0.0001;
        },
        {
          message:
            this.params.errorMessages?.multipleOf ||
            `La valeur doit être un multiple de ${this.params.step}`,
        },
      );
    }

    // Optional
    if (!this.params.required) {
      return schema.optional();
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

  /**
   * Génère les attributs HTML pour l'input
   */
  getInputAttributes(): {
    type: "number" | "range";
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
  } {
    return {
      type: this.params.type === "range" ? "range" : "number",
      ...(this.params.min !== undefined && { min: this.params.min }),
      ...(this.params.max !== undefined && { max: this.params.max }),
      ...(this.params.step !== undefined && { step: this.params.step }),
      ...(this.params.required && { required: true }),
    };
  }
}
