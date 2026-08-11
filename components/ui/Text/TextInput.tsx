"use client";

import React, { JSX, useEffect, useState } from "react";

import { TextValidator } from "../../../lib/validators/TextValidator";
import FontSelect from "./PoliceSelect";


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
  onChangeValue: (fieldName: string, value: unknown) => void; // remonte l'état au parent
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
  const [localValue, setLocalValue] = useState(value);
  const params = validator.getParams();

  // Sync localValue si le modèle change depuis l'extérieur
  useEffect(() => {
    setLocalValue(value ?? "");
    validator.value = String(value ?? "");
  }, [value, field]);

  // Validation
  const validation = validator.validate(localValue);
  const showError = !validation.valid;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.currentTarget.value;
    updateValue(newValue);
  };
  const handleSelectChange = (e: string) => {
    updateValue(e);
  };

  const updateValue = (newValue: string) => {
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
    case field.includes("police"):
      InputComponent = (
        <FontSelect
          value={model[field]}

          label=""

          onChange={handleSelectChange}
        />
      );
      break;
    case params.multiline !== undefined:
      // Texte multiligne
      InputComponent = <textarea {...commonProps} rows={rows} />;
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

      {validation.errors.length > 0 && (
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
