"use client";
import React, { useRef, DragEvent, ChangeEvent, useState } from "react";

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

export default function ImageUploader<T>({
  field,
  onChange,
}: {
  field: string;
  onChange: (fieldName: string, value: any) => void;
}) {
  const [images, setImages] = useState<UploadedImage[]>([]);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);

    onChange(field, "");
  };

  return {
    images,
    removeImage,
    clearAll,
  };
}
