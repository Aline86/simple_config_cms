import { useState } from "react";
import { TextValidator } from "../../../lib/validators/TextValidator";
import CloudinaryValidator from "../../../lib/validators/MediaValidator";
import { NumberValidator } from "../../../lib/validators/NumberValidator";
import ColorSelect from "./ColorSelect";
import { PALETTE } from "./TailwindPalette";

type ValidatorInstance = TextValidator | CloudinaryValidator | NumberValidator;

interface BaseInputProps {
  label?: string;
  name: string;
  className?: string;
  disabled?: boolean;
}

interface ColorInputProps<T> extends BaseInputProps {
  model: T;
  validator: ValidatorInstance;
  value: string;
  field: string;
  onChange: (fieldName: string, value: unknown) => void;
  selectedValidatorKey?: string;
}

export function ColorInput<T>({
  label,
  name,
  value,
  field,
  onChange,
  validator,
  className = "",
  disabled = false,
  selectedValidatorKey,
}: ColorInputProps<T>) {
  console.log("valuje", value);
  const params = validator.getParams();
  const [currentValue, setCurrentValue] = useState(value);
  const validation = validator.validate(value);
  const showError = !validation.valid;
  const handleTailwindChange = (e: string) => {
    setCurrentValue(e);
    onChange(field, e);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
    onChange(field, e.target.value);
  };

  return (
    <div className={`-input-wrapper ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {params.required && <span className="required">*</span>}
        </label>
      )}

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {selectedValidatorKey?.includes("tailwind") ? (
          <ColorSelect
            name={name}

            value={currentValue}
            onChange={handleTailwindChange}
            disabled={disabled}
            className={`color-input ${showError ? "error" : ""}`}

            field={field}
          />
        ) : (
          <input
            id={name}
            name={name}
            type="color"
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={`color-input ${showError ? "error" : ""}`}
            required={params.required}
          />
        )}
        <input
          type="text"
          defaultValue={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className={`input color-text-input ${showError ? "error" : ""}`}
          placeholder="#000000"
          maxLength={7}
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>

      {
        <div className="error-messages">
          {validation.errors.map((error: string, index: number) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      }
    </div>
  );
}
