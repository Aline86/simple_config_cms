"use client";

import { NumberValidator } from "@/validators/NumberValidator";
import React, { useEffect, useState } from "react";

interface BaseInputProps<T> {
  label?: string;
  className?: string;
  disabled?: boolean;
}

interface NumberInputProps<T> extends BaseInputProps<T> {
  value: number | null;

  field: string;
  onChangeValue: (fieldName: string, value: number) => void;
  showValue?: boolean;
  validator: NumberValidator;
}

export default function NumberInput<T>({
  value,
  label,

  className = "",
  disabled = false,

  field,
  onChangeValue,
  showValue = true,
  validator,
}: NumberInputProps<T>) {
  const [localValue, setLocalValue] = useState<number>(value ?? 1);
  const [touched, setTouched] = useState(false);

  const params = validator.getParams();

  // Validation
  const validation = validator.validate();

  const showError = touched && !validation.valid;
  const commonProps: React.InputHTMLAttributes<HTMLInputElement> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    value: localValue as string | number,

    disabled,

    className: `input ${showError ? "error" : ""}`,
    min: params.min,
    max: params.max,
    required: params.required,
  };
  // Sync si la valeur change depuis l'extérieur
  // Sync localValue si le modèle change depuis l'extérieur
  useEffect(() => {
    validator.value = String(value ?? "");
  }, [localValue, field, validator]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.currentTarget.value);
    setLocalValue(newValue);
    onChangeValue(field, newValue);
  };

  return (
    <div className={`validated-input-wrapper ${className}`}>
      {label && (
        <label className="input-label flex justify-between items-center">
          <span>{label}</span>
          {showValue && (
            <span className="text-sm text-gray-500">{localValue}</span>
          )}
        </label>
      )}

      <input
        {...commonProps}
        type={params.type || "text"}
        onChange={handleChange}
        className="w-full cursor-pointer"
      />
    </div>
  );
}
