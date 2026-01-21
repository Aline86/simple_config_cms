import { CloudinaryValidator } from "@/validators/MediaValidator";
import { NumberValidator } from "@/validators/NumberValidator";
import { TextValidator } from "@/validators/TextValidator";
import { useState } from "react";

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
  onChange: (fieldName: string, value: any) => void;
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
}: ColorInputProps<T>) {
  const [touched, setTouched] = useState(false);
  const params = validator.getParams();

  const validation = validator.validate(value);
  const showError = touched && !validation.valid;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target.value);
    onChange(field, e.target.value);
  };
  const handleBlur = () => {
    setTouched(true);
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
        <input
          id={name}
          name={name}
          type="color"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`color-input ${showError ? "error" : ""}`}
          required={params.required}
        />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={`input color-text-input ${showError ? "error" : ""}`}
          placeholder="#000000"
          maxLength={7}
          pattern="^#[0-9A-Fa-f]{6}$"
        />
      </div>

      {showError && validation.errors && (
        <div className="error-messages">
          {validation.errors.map((error, index) => (
            <p key={index} className="error-message">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
