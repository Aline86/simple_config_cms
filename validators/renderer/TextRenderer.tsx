// components/FieldRenderer.tsx
"use client";

import { ColorInput } from "../../components/ui/Text/ColorInput";
import NumberInput from "../../components/ui/Text/RangeInput";
import TextInput from "../../components/ui/Text/TextInput";
import ImageUploaderView from "../../components/ui/Uploader/ImageUploaderView";
import VideoUploaderView from "../../components/ui/Uploader/VideoUploaderView";
import {
  createValidator,
  extractPrefix,
} from "../../lib/utils/validators.utils";
import { MediaObject } from "../../model/bloc/MediaObject";
import { NumberValidator } from "../NumberValidator";
import { TextValidator } from "../TextValidator";

type FieldRendererProps<T> = {
  label: string;
  fieldName: string;
  model: Record<string, any>;
  setField: (fieldName: string, value: any) => void;
  isVideo?: boolean;
};

export function FieldRenderer<T>({
  label,
  fieldName,
  model,
  setField,
  isVideo,
}: FieldRendererProps<T>) {
  const fieldNameToInvestigate =
    fieldName.split(".")[fieldName.split(".").length - 1];

  const currentValue = model[fieldNameToInvestigate];
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
        return !isVideo ? (
          <ImageUploaderView
            label={label}
            value={currentValue}
            model={model[fieldNameToInvestigate] as MediaObject}
            field={fieldName}
            onChangeValue={setField}
          />
        ) : (
          <VideoUploaderView
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
