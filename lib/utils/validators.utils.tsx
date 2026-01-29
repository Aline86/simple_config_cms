import FIELD_CONFIGS from "@/config/fieldConfig";
import CloudinaryValidator from "@/validators/MediaValidator";
import { NumberValidator } from "@/validators/NumberValidator";
import { TextParameter, TextValidator } from "@/validators/TextValidator";
// Types
export type FieldPrefix = "text" | "image" | "video" | "number" | "color";

export type ValidatorInstance =
  | TextValidator
  | CloudinaryValidator
  | NumberValidator;
// Map des classes de validators par préfixe
export const VALidATOR_MAP: Record<FieldPrefix, any> = {
  color: TextValidator,
  text: TextValidator,
  image: CloudinaryValidator,
  video: NumberValidator, // À remplacer par VideoValidator si tu en as un
  number: NumberValidator,
};

// Helper pour extraire le préfixe
export const extractPrefix = (fieldName: string): FieldPrefix => {
  const match = fieldName.match(/^(text|image|video|number|color)_/);
  if (!match) {
    throw new Error(
      `Invalid field name format: ${fieldName}. Expected format: "prefix_fieldname"`,
    );
  }
  return match[1] as FieldPrefix;
};
export type FieldConfigsMap = typeof FIELD_CONFIGS;

// Helper pour créer le validator
export const createValidator = <K extends keyof FieldConfigsMap>(
  fieldName: K,
  value: unknown,
): ValidatorInstance => {
  const prefix = extractPrefix(fieldName);
  const ValidatorClass = VALidATOR_MAP[prefix];
  const config = FIELD_CONFIGS[fieldName];

  if (!config) {
    console.warn(
      `No config found for field: ${String(fieldName)}, using default config`,
    );

    const defaultConfig =
      prefix === "text" ? new TextParameter({}) : new TextParameter({});

    return new ValidatorClass(value, defaultConfig);
  }

  return new ValidatorClass(value, config);
};
