"use client";
import { useRef, useState } from "react";
import { extractYouTubeid } from "../helpers/mediaExtractUrlHelper";

interface YouTubeVideo {
  url: string;
  videoid: string;
  thumbnail: string;
  id: string;
  type: "youtube";
}

export default function VideoUploader<T>({
  field,
  onChange,
}: {
  field: string;
  onChange: (fieldName: string, value: unknown) => void;
}) {
  const [media, setMedia] = useState<YouTubeVideo>();

  const [errors, setErrors] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    const newYouTubeVideo: YouTubeVideo = {
      url: `https://www.youtube.com/watch?v=${videoid}`,
      videoid,
      thumbnail: `https://img.youtube.com/vi/${videoid}/maxresdefault.jpg`,
      id: `youtube-${Date.now()}-${Math.random()}`,
      type: "youtube",
    };

    setMedia(newYouTubeVideo);
    onChange(field, newYouTubeVideo.url);
    setYoutubeUrl(newYouTubeVideo.url);
    console.log(field, newYouTubeVideo);
    setShowYoutubeInput(false);
    setErrors([]);
  };

  const clearAll = () => {
    setMedia(undefined);
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
    fileInputRef,
    youtubeUrl,
    showYoutubeInput,
    setYoutubeUrl,
    clearAll,
    addYouTubeVideo,
    toggleYoutubeInput,
  };
}
