// helpers/validatorHelper.ts
import { TextParameter, TextValidator } from "@/validators/TextValidator";
import {
  CloudinaryValidator,
  CloudinaryParameter,
} from "@/validators/MediaValidator";
import { NumberValidator, Parameter } from "@/validators/NumberValidator";
import FIELD_CONFIGS from "@/config/fieldConfig";

// Types
export type FieldPrefix = "text" | "image" | "number" | "color";

export type ValidatorInstance =
  | TextValidator
  | CloudinaryValidator
  | NumberValidator;

type ValidatorClass =
  | typeof TextValidator
  | typeof CloudinaryValidator
  | typeof NumberValidator;
type ParameterClass = CloudinaryParameter | TextParameter | Parameter;

// Map des classes de validators par préfixe
const VALidATOR_MAP: Record<FieldPrefix, ValidatorClass> = {
  text: TextValidator,
  image: CloudinaryValidator,
  number: NumberValidator,
  color: TextValidator,
};

// Map des paramètres par défaut par préfixe
const DEFAULT_PARAMS: Record<FieldPrefix, ParameterClass> = {
  text: new TextParameter({}),
  image: new CloudinaryParameter({}),
  number: new Parameter({}),
  color: new TextParameter({}),
};

/**
 * Extrait le préfixe d'un nom de champ
 * @param fieldName - Nom du champ (ex: "text_titre", "image_hero")
 * @returns Le préfixe (ex: "text", "image")
 */
export const extractPrefix = (fieldName: string): FieldPrefix => {
  const match = fieldName.match(/^(text|image|number|color)_/);

  if (!match) {
    throw new Error(
      `Invalid field name format: "${fieldName}". Expected format: "prefix_fieldname" where prefix is one of: text, image, video, number`,
    );
  }

  return match[1] as FieldPrefix;
};

/**
 * Récupère la configuration d'un champ
 * @param fieldName - Nom du champ
 * @returns La configuration du champ ou une config par défaut
 */
export const getFieldConfig = (fieldName: string): ParameterClass => {
  const config = FIELD_CONFIGS[fieldName] as ParameterClass;

  if (!config) {
    const prefix = extractPrefix(fieldName);
    console.warn(
      `No config found for field: "${fieldName}". Using default ${prefix} config.`,
    );
    return DEFAULT_PARAMS[prefix];
  }

  return config;
};

/**
 * Crée un validator pour un champ donné
 * @param fieldName - Nom du champ (ex: "text_titre")
 * @param value - Valeur à valider
 * @returns Une instance du validator approprié
 */
export const createValidatorForField = (
  fieldName: string,
  value: any,
): ValidatorInstance => {
  try {
    // 1. Extraire le préfixe
    const prefix = extractPrefix(fieldName);

    // 2. Récupérer la classe de validator
    const ValidatorClass = VALidATOR_MAP[prefix];

    if (!ValidatorClass) {
      throw new Error(`No validator found for prefix: "${prefix}"`);
    }

    // 3. Récupérer la config
    const config = getFieldConfig(fieldName);

    // 4. Instancier le validator
    return new ValidatorClass(value, config);
  } catch (error) {
    console.error(`Error creating validator for field "${fieldName}":`, error);
    throw error;
  }
};
