import { createValidator, FieldConfigsMap } from "@/lib/utils/validators.utils";

export abstract class BaseValidatable {
  validateAll(): boolean {
    const validateValue = (value: any, fieldName?: string): boolean => {
      // Tableaux → récursif
      if (Array.isArray(value)) {
        return value.every((item) => validateValue(item));
      }

      // Objet avec validateAll → délégation
      if (value && typeof value === "object") {
        if (typeof (value as any).validateAll === "function") {
          return (value as any).validateAll();
        }
        return true;
      }

      // Champs avec prefix text_|image_|video_|number_|color_
      if (fieldName) {
        const match = fieldName.match(/^(text|image|video|number|color)_/);
        if (match) {
          const validator = createValidator(
            fieldName as keyof FieldConfigsMap,
            value,
          );
          console.log("fieldName", fieldName, validator.isValid());
          return validator.isValid();
        }
      }

      return true; // skip fields that don't match
    };

    return (Object.keys(this) as Array<keyof this>).every((fieldName) => {
      try {
        return validateValue((this as any)[fieldName], String(fieldName));
      } catch (e) {
        console.warn(`Validation failed on field ${String(fieldName)}`, e);
        return false;
      }
    });
  }
}
