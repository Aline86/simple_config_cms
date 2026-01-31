// ==================== UI COMPONENTS ====================

import Image from "next/image";

import UploadButton from "../UploadButton";
import ImageUploader from "../../../lib/mediaUploader/ImageUploader";
import { MediaObject } from "../../../model/bloc/MediaObject";

export default function ImageUploaderView<T>({
  value,
  previewImages = true,
  label = "Télécharger des images",
  className = "",
  model,
  field,
  onChangeValue,
}: {
  value: string;
  previewImages?: boolean;
  label?: string;
  className?: string;
  model: MediaObject;
  field: string;
  onChangeValue: (fieldName: string, value: any) => void;
}) {
  console.log("value", value, field.split(".")[1]);
  const uploader = ImageUploader({
    value: value,
    model: model,
    field: field,
    onChange: onChangeValue,
  });

  return (
    <div className={`image-uploader ${className}`}>
      <UploaderLabel label={label} />

      <UploadButton
        onChangeValue={onChangeValue}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        fieldName={field}
      />

      {uploader.errors.length > 0 && <ErrorBox errors={uploader.errors} />}

      {previewImages && uploader.images.length > 0 ? (
        <PreviewSection
          images={uploader.images}
          onRemove={uploader.removeImage}
          onClearAll={uploader.clearAll}
        />
      ) : (
        value !== "" &&
        value !== undefined && (
          <PreviewSection
            value={value}
            onRemove={uploader.removeImage}
            onClearAll={uploader.clearAll}
            images={[]}
          />
        )
      )}

      <UploaderStyles />
    </div>
  );
}

function UploaderLabel({ label }: { label: string }) {
  return <label className="uploader-label">{label}</label>;
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
interface UploadedImage {
  file: File;
  preview: string;
  id: string;
}
interface PreviewSectionProps {
  value?: string;
  images: UploadedImage[] | string;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

function PreviewSection({
  value,
  images,
  onRemove,
  onClearAll,
}: PreviewSectionProps) {
  console.log("value", value);
  return (
    <div className="preview-section">
      <div className="preview-header">
        <span className="preview-count">
          {value !== ""
            ? "1 image"
            : `${images.length} image${images.length > 1 ? "s" : ""}`}
        </span>
        <button type="button" onClick={onClearAll} className="clear-button">
          Tout supprimer
        </button>
      </div>

      <div className="preview-grid">
        {value !== undefined &&
        value !== null &&
        value !== "" &&
        !value.includes("#") ? (
          <div className="image-wrapper">
            <Image src={value} alt="preview" fill className="preview-image" />
          </div>
        ) : Array.isArray(images) ? (
          images.map((img) => (
            <PreviewItem key={img.id} image={img} onRemove={onRemove} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

interface PreviewItemProps {
  image: UploadedImage;
  onRemove: (id: string) => void;
}

function PreviewItem({ image, onRemove }: PreviewItemProps) {
  return (
    <div className="preview-item">
      <img
        src={image.preview}
        alt={image.file.name}
        className="preview-image"
      />
      <div className="preview-overlay">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(image.id);
          }}
          className="remove-button"
        >
          ✕
        </button>
      </div>
      <p className="preview-name">{image.file.name}</p>
      <p className="preview-size">{(image.file.size / 1024).toFixed(0)} KB</p>
    </div>
  );
}

function UploaderStyles() {
  return (
    <style>{`
      .image-uploader { width: 100%; }
      .uploader-label { display: block; font-weight: 500; font-size: 14px; color: #374151; margin-bottom: 8px; }
      .drop-zone { border: 2px dashed #d1d5db; border-radius: 8px; padding: 20px 20px; text-align: center; cursor: pointer; transition: all 0.2s; background-color: #f9fafb; }
      .drop-zone:hover { border-color: #3b82f6; background-color: #eff6ff; }
      .drop-zone.dragging { border-color: #3b82f6; background-color: #dbeafe; transform: scale(1.02); }
      .drop-zone-content { display: flex; flex-direction: column; align-items: center; gap: 12px; color: #6b7280; }
      .drop-zone-text { margin: 0; font-size: 14px; color: #374151; }
      .drop-zone-text strong { color: #3b82f6; }
      .drop-zone-info { margin: 0; font-size: 12px; color: #9ca3af; }
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
      .preview-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); opacity: 0; transition: opacity 0.2s; display: flex; align-items: center; justify-content: center; }
      .preview-item:hover .preview-overlay { opacity: 1; }
      .remove-button { width: 40px; height: 40px; border-radius: 50%; border: 2px solid white; background-color: rgba(239, 68, 68, 0.9); color: white; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; }
      .remove-button:hover { transform: scale(1.1); background-color: #dc2626; }
      .preview-name { margin: 8px; font-size: 12px; color: #374151; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .preview-size { margin: 0 8px 8px; font-size: 11px; color: #9ca3af; }
    `}</style>
  );
}
