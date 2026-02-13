"use client";
import React, { useRef, DragEvent, ChangeEvent, useState } from "react";

interface UploadedImage {
  file: File;
  preview: string;
  id: string;
  type: "file";
}

interface YouTubeVideo {
  url: string;
  videoid: string;
  thumbnail: string;
  id: string;
  type: "youtube";
}

type MediaItem = UploadedImage | YouTubeVideo;

export default function VideoUploader<T>({
  field,
  onChange,
}: {
  field: string;
  onChange: (fieldName: string, value: unknown) => void;
}) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const MAX_FILES = 1;
  const MAX_SIZE_MB = 5;
  const ACCEPTED_FORMATS = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
  ];

  // Fonction pour extraire l'id de la vidéo YouTube
  const extractYouTubeid = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  // Fonction pour valider et ajouter une vidéo YouTube
  const addYouTubeVideo = () => {
    if (!youtubeUrl.trim()) {
      setErrors(["Veuillez entrer une URL YouTube"]);
      return;
    }

    const videoid = extractYouTubeid(youtubeUrl);
    if (!videoid) {
      setErrors(["URL YouTube invalide"]);
      return;
    }

    if (media.length >= MAX_FILES) {
      setErrors([
        `Maximum ${MAX_FILES} média${MAX_FILES > 1 ? "s" : ""} autorisé${MAX_FILES > 1 ? "s" : ""}`,
      ]);
      return;
    }

    const newYouTubeVideo: YouTubeVideo = {
      url: `https://www.youtube.com/watch?v=${videoid}`,
      videoid,
      thumbnail: `https://img.youtube.com/vi/${videoid}/maxresdefault.jpg`,
      id: `youtube-${Date.now()}-${Math.random()}`,
      type: "youtube",
    };

    setMedia((prev) => [...prev, newYouTubeVideo]);
    onChange(field, newYouTubeVideo.url);
    setYoutubeUrl("");
    setShowYoutubeInput(false);
    setErrors([]);
  };

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

    if (media.length + fileArray.length > MAX_FILES) {
      newErrors.push(
        `Maximum ${MAX_FILES} média${MAX_FILES > 1 ? "s" : ""} autorisé${MAX_FILES > 1 ? "s" : ""}`,
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
        id: `file-${Date.now()}-${Math.random()}`,
        type: "file",
      }));

      setMedia((prev) => [...prev, ...newImages]);
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

  const removeMedia = (id: string) => {
    setMedia((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      const removed = prev.find((item) => item.id === id);
      if (removed && removed.type === "file") {
        URL.revokeObjectURL(removed.preview);
      }
      return updated;
    });
    setErrors([]);
  };

  const clearAll = () => {
    media.forEach((item) => {
      if (item.type === "file") {
        URL.revokeObjectURL(item.preview);
      }
    });
    setMedia([]);
    setErrors([]);
    setYoutubeUrl("");
    setShowYoutubeInput(false);
    onChange(field, "");
  };

  const toggleYoutubeInput = () => {
    setShowYoutubeInput(!showYoutubeInput);
    setErrors([]);
  };

  return {
    media,
    errors,
    isDragging,
    fileInputRef,
    youtubeUrl,
    showYoutubeInput,
    setYoutubeUrl,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInput,
    handleClick,
    removeMedia,
    clearAll,
    addYouTubeVideo,
    toggleYoutubeInput,
  };
}
