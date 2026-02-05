// components/FieldRenderer.tsx
"use client";

import CheckboxInput from "../../../components/ui/Text/CheckBoxInput";
import { ColorInput } from "../../../components/ui/Text/ColorInput";
import NumberInput from "../../../components/ui/Text/RangeInput";
import TextInput from "../../../components/ui/Text/TextInput";
import ImageUploaderView from "../../../components/ui/Uploader/ImageUploaderView";
import VideoUploaderView from "../../../components/ui/Uploader/VideoUploaderView";
import { MediaObject } from "../../../database/model/bloc/MediaObject";
import { PageObject } from "../../../database/model/Page";
import { extractPrefix } from "../../helpers/objectUpdater";
import { createValidator } from "../../helpers/validators.utils";
import { NumberValidator } from "../NumberValidator";
import { TextValidator } from "../TextValidator";

type FieldRendererProps<T> = {
  label: string;
  fieldName: string;
  model: unknown;
  setField: (fieldName: string, value: unknown) => void;
  isVideo?: boolean;
  pages?: PageObject[];
};

export function FieldRenderer<T>({
  label,
  fieldName,
  model,
  setField,
  isVideo,
  pages,
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
      case "checkbox": {
        return (
          <CheckboxInput
            label={label}
            value={currentValue as boolean}
            validator={validator as TextValidator}
            model={model}
            field={fieldName}
            onChangeValue={setField}
            pages={pages}
          />
        );
      }
      case "color":
        return (
          <ColorInput
            label={label}
            value={currentValue as string}
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
            value={currentValue as string}
            model={model[fieldNameToInvestigate] as MediaObject}
            field={fieldName}
            onChangeValue={setField}
          />
        ) : (
          <VideoUploaderView
            label={label}
            value={currentValue as string}
            model={model[fieldNameToInvestigate] as MediaObject}
            field={fieldName}
            onChangeValue={setField}
          />
        );

      case "number": {
        return (
          <NumberInput
            label={label}
            value={currentValue as number}
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
