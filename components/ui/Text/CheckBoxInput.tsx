"use client";

import React, { useEffect, useState } from "react";
import { TextValidator } from "../../../lib/validators/TextValidator";
import { PageObject } from "../../../database/model/Page";

interface BaseInputProps<T> {
  label?: string;
  className?: string;
  disabled?: boolean;
}

interface ValidatedCheckboxInputProps<T> extends BaseInputProps<T> {
  value: boolean;
  validator: TextValidator;
  model: T;
  field: string;
  onChangeValue: (fieldName: string, value: boolean) => void;
  pages: PageObject[];
}

export default function CheckboxInput<T>({
  value,
  label,
  validator,
  className = "",
  disabled = false,
  model,
  field,
  pages,
  onChangeValue,
}: ValidatedCheckboxInputProps<T>) {
  const [touched, setTouched] = useState(false);
  const [localValue, setLocalValue] = useState<boolean>(value);

  // Sync avec le parent
  useEffect(() => {
    setLocalValue(!!value);
    validator.value = String(!!value);
    setTouched(false);
  }, [value, field]);

  // Validation
  const validation = validator.validate(String(localValue));
  const showError = touched && !validation.valid;
  const resetOtherInputs = () => {
    pages !== undefined &&
      Array.isArray(pages) &&
      pages.map((page) => {
        page.checkbox_home_page = false;
      });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    resetOtherInputs();
    setLocalValue(checked);
    validator.value = String(checked);

    onChangeValue(field, checked);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className={`validated-input-wrapper ${className} mb-4`}>
      <label className="checkbox-label flex items-center gap-2">
        <input
          className="checkmark"
          type="checkbox"
          checked={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
        />

        {label}
      </label>

      {showError && validation.errors?.length > 0 && (
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
