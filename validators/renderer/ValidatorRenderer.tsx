"use client";

import { useEffect, useState, useMemo } from "react";
import { TextParameter, TextValidator } from "../TextValidator";
import CloudinaryValidator, { CloudinaryParameter } from "../MediaValidator";
import { NumberValidator, Parameter } from "../NumberValidator";
import ImageUploaderView from "../../components/ui/Uploader/ImageUploaderView";
import TextInput from "../../components/ui/Text/TextInput";
import FIELD_CONFIGS from "../../config/fieldConfig";
import { MediaObject } from "../../model/bloc/MediaObject";
import InternUrlInput from "../../components/ui/Text/InternUrlInput";
import { ColorInput } from "../../components/ui/Text/ColorInput";

// Types
export type FieldPrefix = "text" | "image" | "video" | "number" | "color";

export type ValidatorInstance =
  | TextValidator
  | CloudinaryValidator
  | NumberValidator;

export type FieldRendererProps<T extends Record<string, unknown>> = {
  fieldName: string;
  selectedValidatorKey: string;
  model: T | MediaObject;
  setField: (fieldName: string, value: any) => void;
};

// --------------------
// VALidATOR MAP
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

  let safeValue: unknown;
  switch (prefix) {
    case "text":
    case "color":
      safeValue = typeof value === "string" ? value : "";
      break;
    case "image":
    case "video":
      safeValue = value === "string" ? value : null;
      break;
    case "number":
      safeValue = typeof value === "number" ? value : 0;
      break;
    default:
      safeValue = "";
  }

  if (!config) {
    console.warn(
      `[FieldRenderer] No config found for field: ${fieldName}, using default config`,
    );
    const defaultConfig =
      prefix === "text" || prefix === "color"
        ? new TextParameter({})
        : prefix === "image" || prefix === "video"
          ? new CloudinaryParameter({})
          : new Parameter({});
    return new ValidatorClass(safeValue, defaultConfig);
  }

  return new ValidatorClass(safeValue, config);
};

export function FieldRenderer<T extends Record<string, any>>({
  fieldName,
  selectedValidatorKey,
  model,
  setField,
}: FieldRendererProps<T>) {
  const field = fieldName.split(".")[fieldName.split(".").length - 1];
  const [currentValue, setCurrentValue] = useState<string>(
    (model[field] as string) || "",
  );

  const validator = useMemo(
    () => createValidator(selectedValidatorKey, currentValue),
    [selectedValidatorKey, currentValue],
  );

  const validationResult = validator.validate(currentValue);
  const hasErrors = !validationResult.valid;
  const errors = validationResult.errors ?? [];

  const prefix = extractPrefix(selectedValidatorKey);
  useEffect(() => {
    setCurrentValue((model[fieldName as keyof typeof model] as string) || "");
  }, [model, fieldName]);

  const renderInput = () => {
    switch (prefix) {
      case "text":
        return selectedValidatorKey.includes("url_interne") ? (
          <InternUrlInput
            model={model}
            value={model[field]}
            field={fieldName as string}
            onChangeValue={setField}
            label="Lien vers une page"
          />
        ) : (
          <TextInput
            value={model[field]}
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
          <ImageUploaderView
            value={model[field]}
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
            value={model[field]}
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
