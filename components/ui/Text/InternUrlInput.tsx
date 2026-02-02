"use client";

import React from "react";
import usePages from "../../../hooks/dropdown/usePages";
import { PageObject } from "../../../model/Page";
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

  if (loading) return <div>Loading...</div>;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.currentTarget.value;
    onChangeValue(field as string, newValue); // remonte l'état au parent
  };

  return (
    <div className={`validated-input-wrapper ${className} mb-4`}>
      {label && <label className="input-label">{label}</label>}
      <select onChange={handleChange}>
        <option key="0">- Page -</option>
        {pages !== undefined &&
          Array.isArray(pages) &&
          pages.map((p) => (
            <option
              key={new PageObject(p).text_titre}
              value={new PageObject(p).text_slug}
              selected={new PageObject(p).text_slug === value}
            >
              {new PageObject(p).text_titre}
            </option>
          ))}
      </select>
    </div>
  );
}
