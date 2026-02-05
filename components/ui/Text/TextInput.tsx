"use client";

import React, { JSX, useEffect, useState } from "react";

import { ColorInput } from "./ColorInput";
import { TextValidator } from "../../../lib/validators/TextValidator";

interface BaseInputProps<T> {
  label?: string;
  className?: string;
  disabled?: boolean;
}

interface ValidatedTextInputProps<T> extends BaseInputProps<T> {
  value: unknown;
  validator: TextValidator;
  multiline?: boolean;
  rows?: number;
  model: T;
  field: string; // champ du modèle sur lequel on agit
  onChangeValue: (fieldName: string, value: any) => void; // remonte l'état au parent
}

export default function TextInput<T>({
  value,
  label,
  validator,
  multiline = false,
  rows = 4,
  className = "",
  disabled = false,
  model,
  field,
  onChangeValue,
}: ValidatedTextInputProps<T>) {
  const [touched, setTouched] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const params = validator.getParams();

  // Sync localValue si le modèle change depuis l'extérieur
  useEffect(() => {
    setLocalValue(value ?? "");
    validator.value = String(value ?? "");
    setTouched(false);
  }, [value, field]);

  // Validation
  const validation = validator.validate(localValue);
  const showError = !validation.valid;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.currentTarget.value;
    setLocalValue(newValue);
    validator.value = newValue; // met à jour le validator

    onChangeValue(field as string, newValue); // remonte l'état au parent
  };

  const commonProps: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    value: localValue as string | number,

    onChange: handleChange,

    disabled,

    className: `input ${showError ? "error" : ""}`,
    minLength: params.minLength,
    maxLength: params.maxLength,
    required: params.required,
    placeholder: params.placeholder,
  };
  let InputComponent: JSX.Element;

  switch (true) {
    case params.multiline !== undefined:
      // Texte multiligne
      InputComponent = <textarea {...commonProps} rows={rows ?? 4} />;
      break;

    case params.type === "color":
      // ColorInput
      InputComponent = (
        <ColorInput
          model={model}
          validator={validator}
          value={validator.value as string}
          field={field}
          onChange={onChangeValue}
          name={""}
        />
      );
      break;

    default:
      // Texte classique
      InputComponent = <input {...commonProps} type={params.type || "text"} />;
  }

  return (
    <div className={`validated-input-wrapper ${className}   mb-4`}>
      {label && (
        <label className="input-label">
          {label}
          {params.required && <span className="required">*</span>}
        </label>
      )}

      {InputComponent}

      {showError && validation.errors && validation.errors.length > 0 && (
        <div className="error-messages">
          {validation.errors.map((error, idx) => (
            <p key={idx} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
