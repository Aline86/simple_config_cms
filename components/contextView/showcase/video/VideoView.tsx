import React, { useState, useRef, MouseEvent } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { BlocObject } from "../../../../model/Bloc";

interface VideoPlayerProps {
  bloc: BlocObject;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ bloc }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (): void => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (): void => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = (): void => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = (): void => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const skip = (seconds: number): void => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = (): void => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Vérifier si c'est une vidéo YouTube
  const isYouTube =
    bloc.image_medias[0]?.image_url?.includes("youtube") ||
    bloc.image_medias[0]?.image_url?.includes("youtu.be");

  const extractYouTubeid = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  if (isYouTube && bloc.image_medias[0].image_url) {
    const videoid = extractYouTubeid(bloc.image_medias[0].image_url);

    return (
      <div className="p-8 max-w-[1650px] w-full mx-auto">
        {/* text_titre */}
        {bloc.text_titre && (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-slate-800">
              {bloc.text_titre}
            </h2>
            {bloc.text_description && (
              <p className="text-slate-600 mt-1">{bloc.text_description}</p>
            )}
          </div>
        )}

        {/* YouTube Embed */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoid}`}
              title={bloc.text_titre || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {bloc.text_titre && (
        <div className="mb-4">
          <h2 className=" text-2xl font-semibold text-slate-800">
            {bloc.text_titre}
          </h2>
          {bloc.text_description && (
            <p className="text-slate-600 mt-1">{bloc.text_description}</p>
          )}
        </div>
      )}

      {/* Conteneur vidéo */}
      <div className="relative group bg-black rounded-lg overflow-hidden shadow-lg">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={togglePlay}
        >
          <source src={bloc.image_medias[0]?.image_url} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>

        {/* Overlay play central */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button
              onClick={togglePlay}
              className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Play
                className="w-8 h-8 text-slate-800 ml-1"
                fill="currentColor"
              />
            </button>
          </div>
        )}

        {/* Contrôles */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Barre de progression */}
          <div
            className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-white rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Boutons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="hover:bg-white/20 rounded p-1.5 transition"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>

              {/* Skip */}
              <button
                onClick={() => skip(-10)}
                className="hover:bg-white/20 rounded p-1.5 transition"
                aria-label="Reculer de 10 secondes"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => skip(10)}
                className="hover:bg-white/20 rounded p-1.5 transition"
                aria-label="Avancer de 10 secondes"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Volume */}
              <button
                onClick={toggleMute}
                className="hover:bg-white/20 rounded p-1.5 transition"
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Temps */}
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Plein écran */}
            <button
              onClick={toggleFullscreen}
              className="hover:bg-white/20 rounded p-1.5 transition"
              aria-label="Plein écran"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
