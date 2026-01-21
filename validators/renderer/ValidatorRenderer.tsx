"use client";

import { useEffect, useState, useMemo } from "react";
import { TextParameter, TextValidator } from "@/validators/TextValidator";
import {
  CloudinaryParameter,
  CloudinaryValidator,
} from "@/validators/MediaValidator";
import { NumberValidator, Parameter } from "@/validators/NumberValidator";
import MediaUploaderView from "@/components/ui/Uploader/MediaUploaderView";
import { ColorInput } from "@/components/ui/Text/ColorInput";
import TextInput from "@/components/ui/Text/TextInput";
import FIELD_CONFIGS from "@/config/fieldConfig";
import { MediaObject } from "@/model/bloc/MediaObject";

// Types
export type FieldPrefix = "text" | "image" | "video" | "number" | "color";

export type ValidatorInstance =
  | TextValidator
  | CloudinaryValidator
  | NumberValidator;

export type FieldRendererProps<T extends Record<string, any>> = {
  fieldName: string;
  selectedValidatorKey: string;
  model: T | MediaObject;
  setField: (fieldName: string, value: any) => void;
};

// --------------------
// VALIDATOR MAP
// --------------------
export const VALIDATOR_MAP: Record<FieldPrefix, any> = {
  text: TextValidator,
  color: TextValidator,
  image: CloudinaryValidator,
  video: CloudinaryValidator,
  number: NumberValidator,
};

// --------------------
// HELPERS
// --------------------
const extractPrefix = (fieldName: string): FieldPrefix => {
  const match = fieldName.match(/^(text|image|video|number|color)_/);
  if (!match) throw new Error(`Invalid field name format: ${fieldName}`);
  return match[1] as FieldPrefix;
};

const createValidator = (
  fieldName: string,
  value: unknown,
): ValidatorInstance => {
  const prefix = extractPrefix(fieldName);
  const ValidatorClass = VALIDATOR_MAP[prefix];
  const config = FIELD_CONFIGS[fieldName];
  if (!config) {
    console.warn(
      `No config found for field: ${fieldName}, using default config`,
    );
    const defaultConfig =
      prefix === "text" || prefix === "color"
        ? new TextParameter({})
        : prefix === "image" || prefix === "video"
          ? new CloudinaryParameter({})
          : new Parameter({});
    return new ValidatorClass(value, defaultConfig);
  }
  return new ValidatorClass(value, config);
};

// --------------------
// COMPONENT
// --------------------
export function FieldRenderer<T extends Record<string, any>>({
  fieldName,
  selectedValidatorKey,
  model,
  setField,
}: FieldRendererProps<T>) {
  const [currentValue, setCurrentValue] = useState<MediaObject | T>(
    model[fieldName],
  );

  useEffect(() => {
    setCurrentValue(model[fieldName]);
  }, [model, fieldName]);

  const validator = useMemo(
    () => createValidator(selectedValidatorKey, currentValue),
    [selectedValidatorKey, currentValue],
  );

  const validationResult = validator.validate(currentValue);
  const hasErrors = !validationResult.valid;
  const errors = validationResult.errors ?? [];

  const prefix = extractPrefix(selectedValidatorKey);

  const renderInput = () => {
    switch (prefix) {
      case "text":
        return (
          <TextInput
            value={currentValue}
            model={model}
            label=""
            field={fieldName}
            onChangeValue={setField}
            validator={validator as TextValidator}
          />
        );
      case "image":
      case "video":
        return (
          <MediaUploaderView
            value={currentValue}
            model={model as MediaObject}
            field={fieldName as string}
            onChangeValue={setField}
            previewImages
            label=""
          />
        );
      case "color":
        return (
          <ColorInput
            model={model}
            validator={validator}
            value={currentValue}
            field={fieldName as string}
            onChange={setField}
            name=""
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="field-group space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {String(fieldName)
          .replace(/_/g, " ")
          .replace(/^(text|image|video|number|color)\s/, "")}
        {validator.getParams().required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      {renderInput()}

      {hasErrors && (
        <div className="error-messages space-y-1">
          {errors.map((error: string, idx: number) => (
            <p key={idx} className="text-red-600 text-sm">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
