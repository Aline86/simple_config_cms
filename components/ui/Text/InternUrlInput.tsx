"use client";

import React from "react";
import usePages from "../../../hooks/dropdown/usePages";
interface InternUrlInputProps<T> {
  value: string;
  model: T;
  field: string;
  onChangeValue: (fieldName: string, value: any) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
  options?: { slug: string; title: string }[]; // options déjà passées
}

export default function InternUrlInput<T>({
  value,
  label,

  field,
  onChangeValue,
  className = "",
}: InternUrlInputProps<T>) {
  const { pages, loading } = usePages();
  console.log("value", value);
  if (loading) return <div>Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value;
    onChangeValue(field as string, newValue); // remonte l'état au parent
  };

  return (
    <div className={`validated-input-wrapper ${className} mb-4`}>
      {label && <label className="input-label">{label}</label>}
      <select onChange={handleChange}>
        <option key="0" value="">
          - Page -
        </option>
        {pages.map((p) => (
          <option
            key={p.text_titre}
            value={p.text_slug}
            selected={p.text_slug === value}
          >
            {p.text_titre}
          </option>
        ))}
      </select>
    </div>
  );
}
