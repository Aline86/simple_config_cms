import React, { useState } from "react";
import { FieldRenderer } from "./renderer/ValidatorRenderer";

const LABEL_HEADER = {
  image_url: "URL de l'image",
  text_empty: "Fond vide",
  color_background_color: "Choisir une couleur de fond",
};

const LABEL_LINKS = {
  // à faire
  text_url_interne: "Lien vers une url interne",
  text_url: "Lien vers une url externe",
  // à faire
  text_mailto: "Lien vers un mailto",
};
interface DynamicValidatorDropDownProps<T> {
  label?: string;
  fieldKey: string;
  availableValidators: string[];
  model: T;
  onChange: (fieldName: string, newValue: any) => void;
  defaultValidator?: string;
}

export function DynamicValidatorDropDown<T extends Record<keyof T, any>>({
  label,
  fieldKey,
  availableValidators,
  model,
  onChange,
  defaultValidator,
}: DynamicValidatorDropDownProps<T>) {
  const [selectedValidatorKey, setSelectedValidatorKey] = useState<string>(
    defaultValidator || availableValidators[0] || "",
  );

  const handleValidatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValidatorKey = e.target.value;
    setSelectedValidatorKey(newValidatorKey);

    // Garder la valeur si compatible, sinon réinitialiser
    const newValue = shouldResetValue(selectedValidatorKey, newValidatorKey)
      ? getDefaultValue(newValidatorKey)
      : // Réinitialiser la valeur quand on change de type de validator
        "";

    onChange(fieldKey as string, newValue);
  };

  // Helper pour déterminer si on doit reset la valeur
  const shouldResetValue = (oldKey: string, newKey: string): boolean => {
    const oldPrefix = oldKey.split("_")[0];
    const newPrefix = newKey.split("_")[0];
    return oldPrefix !== newPrefix;
  };

  // Helper pour obtenir la valeur par défaut selon le type
  const getDefaultValue = (validatorKey: string): any => {
    const prefix = validatorKey.split("_")[0];
    switch (prefix) {
      case "text":
      case "color":
      case "image":
        return "";
      case "number":
        return 0;

      default:
        return "";
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}
      </label>

      <select
        value={selectedValidatorKey}
        onChange={handleValidatorChange}
        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
      >
        {availableValidators.map((validatorKey) => (
          <option
            key={validatorKey}
            value={validatorKey}
            className="text-slate-900 dark:text-slate-50"
          >
            {typeof validatorKey === "string" && validatorKey in LABEL_HEADER
              ? LABEL_HEADER[validatorKey as keyof typeof LABEL_HEADER]
              : ""}
            {typeof validatorKey === "string" && validatorKey in LABEL_LINKS
              ? LABEL_LINKS[validatorKey as keyof typeof LABEL_LINKS]
              : ""}
          </option>
        ))}
      </select>

      <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
        <FieldRenderer
          selectedValidatorKey={selectedValidatorKey}
          fieldName={fieldKey as string}
          model={model}
          setField={onChange}
        />
      </div>
    </div>
  );
}
