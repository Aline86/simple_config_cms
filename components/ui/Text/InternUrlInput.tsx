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
  model,
  field,
  onChangeValue,
  className = "",
  disabled = false,
}: InternUrlInputProps<T>) {
  const { pages, loading } = usePages();

  if (loading) return <div>Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value;

    onChangeValue(field as string, newValue); // remonte l'état au parent
  };

  return (
    <div className={`validated-input-wrapper ${className} mb-4`}>
      {label && <label className="input-label">{label}</label>}
      <select value={value} onChange={handleChange}>
        <option value="">-- Choisir une page --</option>
        {pages.map((p) => (
          <option key={p.slug} value={p.slug}>
            {p.title}
          </option>
        ))}
      </select>
    </div>
  );
}
