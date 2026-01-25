// components/FieldRenderer.tsx
"use client";

import { TextParameter, TextValidator } from "@/validators/TextValidator";

import { NumberValidator } from "@/validators/NumberValidator";
import { useEffect, useState } from "react";
import MediaUploaderView from "@/components/ui/Uploader/MediaUploaderView";
import { ColorInput } from "@/components/ui/Text/ColorInput";
import TextInput from "@/components/ui/Text/TextInput";
import FIELD_CONFIGS from "@/config/fieldConfig";
import firstLetterToUperCase from "@/helpers/firstLetterToUpperCase";
import { MediaObject } from "@/model/bloc/MediaObject";
import CloudinaryValidator from "../MediaValidator";
import NumberInput from "@/components/ui/Text/RangeInput";

// Types
type FieldPrefix = "text" | "image" | "video" | "number" | "color";

type ValidatorInstance = TextValidator | CloudinaryValidator | NumberValidator;

type FieldRendererProps<T> = {
  label: string;
  fieldName: string;
  model: Record<string, any>;
  setField: (fieldName: string, value: any) => void;
};

// Map des classes de validators par préfixe
const VALIDATOR_MAP: Record<FieldPrefix, any> = {
  color: TextValidator,
  text: TextValidator,
  image: CloudinaryValidator,
  video: NumberValidator, // À remplacer par VideoValidator si tu en as un
  number: NumberValidator,
};

// Helper pour extraire le préfixe
const extractPrefix = (fieldName: string): FieldPrefix => {
  const match = fieldName.match(/^(text|image|video|number)_/);
  if (!match) {
    throw new Error(
      `Invalid field name format: ${fieldName}. Expected format: "prefix_fieldname"`,
    );
  }
  return match[1] as FieldPrefix;
};
type FieldConfigsMap = typeof FIELD_CONFIGS;

// Helper pour créer le validator
const createValidator = <K extends keyof FieldConfigsMap>(
  fieldName: K,
  value: unknown,
): ValidatorInstance => {
  const prefix = extractPrefix(fieldName);
  const ValidatorClass = VALIDATOR_MAP[prefix];
  const config = FIELD_CONFIGS[fieldName];

  if (!config) {
    console.warn(
      `No config found for field: ${String(fieldName)}, using default config`,
    );

    const defaultConfig = prefix === "text" ? new TextParameter({}) : {};

    return new ValidatorClass(value, defaultConfig);
  }

  return new ValidatorClass(value, config);
};

export function FieldRenderer<T>({
  label,
  fieldName,
  model,
  setField,
}: FieldRendererProps<T>) {
  const fieldNameToInvestigate =
    fieldName.split(".")[fieldName.split(".").length - 1];

  const currentValue = model[fieldNameToInvestigate];
  console.log("currentValue", currentValue);
  const validator = createValidator(fieldNameToInvestigate, currentValue);
  const prefix = extractPrefix(fieldNameToInvestigate);

  const renderInput = () => {
    switch (prefix) {
      case "text": {
        return (
          <TextInput
            label={label}
            value={currentValue}
            validator={validator as TextValidator}
            model={model}
            field={fieldName}
            onChangeValue={setField}
          />
        );
      }
      case "color":
        return (
          <ColorInput
            label={label}
            value={currentValue}
            model={model}
            field={fieldName as string}
            onChange={setField}
            validator={validator}
            name={fieldName as string}
          />
        );

      case "image":
        return (
          <MediaUploaderView
            label={label}
            value={currentValue}
            model={model[fieldNameToInvestigate] as MediaObject}
            field={fieldName}
            onChangeValue={setField}
          />
        );

      case "video":
        return (
          <NumberInput
            label={label}
            validator={validator as NumberValidator}
            value={currentValue}
            field={""}
            onChangeValue={function (fieldName: string, value: number): void {
              throw new Error("Function not implemented.");
            }}
          />
        );

      case "number": {
        return (
          <NumberInput
            label={label}
            value={currentValue}
            field={fieldName}
            onChangeValue={setField}
            validator={validator as NumberValidator}
          />
        );
      }

      default:
        return null;
    }
  };

  return <div className="field-group">{renderInput()}</div>;
}
