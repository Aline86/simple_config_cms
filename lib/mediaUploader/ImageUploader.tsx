"use client";
import React, { useRef, DragEvent, ChangeEvent, useState } from "react";

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}

export default function ImageUploader<T>({
  value,
  model,
  field,
  onChange,
}: {
  value: string;
  model: T;
  field: string;
  onChange: (fieldName: string, value: any) => void;
}) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const MAX_FILES = 1;
  const MAX_SIZE_MB = 5;
  const ACCEPTED_FORMATS = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf", // Ajout du PDF
  ];

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return `${file.name}: Format non accepté (${file.type})`;
    }

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      return `${file.name}: Taille trop grande (${sizeMB.toFixed(2)}MB > ${MAX_SIZE_MB}MB)`;
    }

    return null;
  };

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    if (images.length + fileArray.length > MAX_FILES) {
      newErrors.push(
        `Maximum ${MAX_FILES} image${MAX_FILES > 1 ? "s" : ""} autorisÃ©e${MAX_FILES > 1 ? "s" : ""}`,
      );
      setErrors(newErrors);
      return;
    }

    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    setErrors(newErrors);

    if (validFiles.length > 0) {
      const newImages: UploadedImage[] = validFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: `${Date.now()}-${Math.random()}`,
      }));

      setImages((prev) => [...prev, ...newImages]);
      const firstFileName = newImages[0].file.name;
      onChange(field, firstFileName);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement | null>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
    setErrors([]);
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setErrors([]);
    onChange(field, "");
  };

  return {
    images,
    errors,
    isDragging,
    fileInputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInput,
    handleClick,
    removeImage,
    clearAll,
  };
}
