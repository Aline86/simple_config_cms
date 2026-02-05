"use client";

import React, { useEffect, useState } from "react";
import usePages from "../../../hooks/dropdown/usePages";
import { PageObject } from "../../../database/model/Page";
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

  return value !== undefined ? (
    <div className={`validated-input-wrapper ${className} mb-4`}>
      {label && (
        <label className="input-label" htmlFor="page-select">
          {label}
        </label>
      )}

      <select id="page-select" value={value} onChange={handleChange}>
        <option value="">- Page -</option>

        {pages &&
          Object.entries(pages).map(([, p]) => {
            const page = new PageObject(p);
            return (
              <option key={page.text_slug} value={page.text_slug}>
                {page.text_titre}
              </option>
            );
          })}
      </select>
    </div>
  ) : (
    <></>
  );
}
