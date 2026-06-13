// ==================== UI COMPONENTS ====================

import Image from "next/image";
import VideoUploader from "../../../lib/mediaUploader/VideoUploader";

interface YouTubeVideo {
  url: string;
  videoid: string;
  thumbnail: string;
  id: string;
  type: "youtube";
}

type MediaItem = YouTubeVideo;

export default function VideoUploaderView({
  value,
  previewMedia = true,
  label = "Télécharger des médias",
  className = "",

  field,
  onChangeValue,
}: {
  value: string;
  previewMedia?: boolean;
  label?: string;
  className?: string;
  field: string;
  onChangeValue: (fieldName: string, value: unknown) => void;
}) {
  const uploader = VideoUploader({
    field: field,
    onChange: onChangeValue,
  });

  return (
    <div className={`media-uploader ${className}`}>
      <UploaderLabel label={label} />

      <YouTubeSection
        showInput={uploader.showYoutubeInput}
        youtubeUrl={uploader.youtubeUrl}
        onToggle={uploader.toggleYoutubeInput}
        onUrlChange={uploader.setYoutubeUrl}
        onAdd={uploader.addYouTubeVideo}
      />

      {uploader.errors.length > 0 && <ErrorBox errors={uploader.errors} />}

      {previewMedia && uploader.media !== undefined && (
        <PreviewSection media={uploader.media} onClearAll={uploader.clearAll} />
      )}

      <UploaderStyles />
    </div>
  );
}

function UploaderLabel({ label }: { label: string }) {
  return <label className="uploader-label">{label}</label>;
}

interface YouTubeSectionProps {
  showInput: boolean;
  youtubeUrl: string;
  onToggle: () => void;
  onUrlChange: (url: string) => void;
  onAdd: () => void;
}

function YouTubeSection({
  showInput,
  youtubeUrl,
  onToggle,
  onUrlChange,
  onAdd,
}: YouTubeSectionProps) {
  return (
    <div className="youtube-section">
      <button
        aria-label={showInput ? "Annuler" : "Ajouter une vidéo YouTube"}
        type="button"
        onClick={onToggle}
        className="youtube-toggle"
      >
        <YoutubeIcon />
        {showInput ? "Annuler" : "Ajouter une vidéo YouTube"}
      </button>

      {showInput && (
        <div className="youtube-input-container">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="youtube-input"
          />
          <button
            aria-label="Ajouter"
            type="button"
            onClick={onAdd}
            className="youtube-add-button"
          >
            Ajouter
          </button>
        </div>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="youtube-icon"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ErrorBox({ errors }: { errors: string[] }) {
  return (
    <div className="error-box">
      {errors.map((error, index) => (
        <p key={index} className="error-text">
          {error}
        </p>
      ))}
    </div>
  );
}

interface PreviewSectionProps {
  value?: string;
  media: MediaItem;

  onClearAll: () => void;
}

function PreviewSection({
  value,
  media,

  onClearAll,
}: PreviewSectionProps) {
  return (
    <div className="preview-section">
      <div className="preview-header">
        <span className="preview-count">
          {value !== "" && value !== undefined ? "1 média" : `média`}
        </span>
        <button
          aria-label="Tout supprimer"
          type="button"
          onClick={onClearAll}
          className="clear-button"
        >
          Tout supprimer
        </button>
      </div>

      <div className="preview-grid">
        <div className="preview-item">
          {media.url.includes("youtube.com") ||
          media.url.includes("youtu.be") ? (
            <YouTubePreview url={media.url} />
          ) : (
            <div className="image-wrapper">
              <Image
                src={media.url}
                alt="preview"
                fill
                className="preview-image"
                sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1440px
  "
              />
            </div>
          )}
        </div>

        {media !== undefined && (
          <PreviewItem key={media.id} item={media} onRemove={onClearAll} />
        )}
      </div>
    </div>
  );
}

interface PreviewItemProps {
  item: MediaItem;
  onRemove: (id: string) => void;
}

function PreviewItem({ item, onRemove }: PreviewItemProps) {
  return (
    <div className="preview-item youtube-item">
      <YouTubePreview url={item.url} videoid={item.videoid} />
      <div className="preview-overlay">
        <button
          aria-label="Supprimer le lien Youtube"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
          className="remove-button"
        >
          ✕
        </button>
      </div>
      <p className="preview-name youtube-label">
        <YoutubeIcon />
        Vidéo YouTube
      </p>
    </div>
  );
}

function YouTubePreview({ url, videoid }: { url: string; videoid?: string }) {
  const extractid = (url: string): string => {
    if (videoid) return videoid;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return "";
  };

  const id = extractid(url);

  return (
    <div className="youtube-preview">
      <iframe
        width="100%"
        height="150"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video preview"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtube-iframe"
      />
    </div>
  );
}

function UploaderStyles() {
  return (
    <style>{`
      .media-uploader { width: 100%; }
      .uploader-label { display: block; font-weight: 500; font-size: 14px; color: #374151; margin-bottom: 8px; }
      .drop-zone { border: 2px dashed #d1d5db; border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; transition: all 0.2s; background-color: #f9fafb; }
      .drop-zone:hover { border-color: #3b82f6; background-color: #eff6ff; }
      .drop-zone.dragging { border-color: #3b82f6; background-color: #dbeafe; transform: scale(1.02); }
      .drop-zone-content { display: flex; flex-direction: column; align-items: center; gap: 12px; color: #6b7280; }
      .drop-zone-text { margin: 0; font-size: 14px; color: #374151; }
      .drop-zone-text strong { color: #3b82f6; }
      
      .youtube-section { margin-top: 16px; }
      .youtube-toggle { width: 100%; padding: 10px 16px; background-color: #dc2626; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; }
      .youtube-toggle:hover { background-color: #b91c1c; transform: translateY(-1px); box-shadow: 0 4px 6px rgba(220, 38, 38, 0.2); }
      .youtube-icon { width: 20px; height: 20px; }
      .youtube-input-container { margin-top: 12px; display: flex; gap: 8px; }
      .youtube-input { flex: 1; padding: 10px 14px; border: 2px solid #d1d5db; border-radius: 8px; font-size: 14px; transition: border-color 0.2s; }
      .youtube-input:focus { outline: none; border-color: #dc2626; }
      .youtube-add-button { padding: 10px 20px; background-color: #16a34a; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 500; cursor: pointer; transition: background-color 0.2s; white-space: nowrap; }
      .youtube-add-button:hover { background-color: #15803d; }
      
      .error-box { margin-top: 12px; padding: 12px; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; }
      .error-text { margin: 0; font-size: 13px; color: #dc2626; }
      .error-text + .error-text { margin-top: 4px; }
      
      .preview-section { margin-top: 20px; }
      .preview-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
      .preview-count { font-size: 14px; font-weight: 500; color: #374151; }
      .clear-button { padding: 6px 12px; background-color: #ef4444; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; transition: background-color 0.2s; }
      .clear-button:hover { background-color: #dc2626; }
      .preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }
      .preview-item { position: relative; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background-color: white; }
      .preview-image { width: 100%; height: 150px; object-fit: cover; }
      .image-wrapper { position: relative; width: 100%; height: 150px; }
      .preview-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); opacity: 0; transition: opacity 0.2s; display: flex; align-items: center; justify-content: center; }
      .preview-item:hover .preview-overlay { opacity: 1; }
      .remove-button { width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; background-color: rgba(239, 68, 68, 0.9); color: white; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
      .remove-button:hover { transform: scale(1.1); background-color: #dc2626; }
      .preview-name { margin: 8px; font-size: 12px; color: #374151; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .preview-size { margin: 0 8px 8px; font-size: 11px; color: #9ca3af; }
      
      .youtube-item { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); }
      .youtube-preview { width: 100%; height: 150px; }
      .youtube-iframe { width: 100%; height: 100%; border-radius: 8px 8px 0 0; }
      .youtube-label { display: flex; align-items: center; gap: 6px; color: white; justify-content: center; }
      .youtube-label svg { width: 16px; height: 16px; }
    `}</style>
  );
}
