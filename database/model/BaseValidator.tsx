import {
  createValidator,
  FieldConfigsMap,
} from "../../lib/helpers/validators.utils";
import { JsonValidator } from "../../lib/validators/JSONValidator";
import { BlocObject } from "./Bloc";
import { MediaObject } from "./bloc/MediaObject";
import { PageObject } from "./Page";

export abstract class BaseValidatable {
  validateAll(): boolean {
    const validateValue = (value: unknown, fieldName?: string): boolean => {
      if (fieldName && fieldName.endsWith("_id")) {
        return true;
      }

      if (fieldName && (fieldName === "number_id" || fieldName === "id")) {
        return true;
      }

      if (Array.isArray(value)) {
        return value.every((item) => validateValue(item));
      }

      if (value && typeof value === "object") {
        if (
          typeof (value as BlocObject | MediaObject | PageObject)
            .validateAll === "function"
        ) {
          return (value as BlocObject | MediaObject | PageObject).validateAll();
        }
        // vérification des erreurs xss avant insertion serveur
        return new JsonValidator(value).isValid();
      }

      // Champs avec prefix text_|image_|video_|number_|color_
      if (fieldName) {
        const match = fieldName.match(/^(text|image|video|number|color)_/);

        if (match) {
          const validator = createValidator(
            fieldName as keyof FieldConfigsMap,
            value,
          );

          return validator.isValid();
        }
      }

      return true;
    };

    return (Object.keys(this) as Array<keyof this>).every((fieldName) => {
      try {
        return validateValue(this[fieldName], String(fieldName));
      } catch (e) {
        console.warn(`Validation failed on field ${String(fieldName)}`, e);
        return false;
      }
    });
  }
}
