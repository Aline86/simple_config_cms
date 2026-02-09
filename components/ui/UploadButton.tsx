"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

import type { CloudinaryUploadWidgetResults } from "next-cloudinary";

type CloudinarySuccessResult = CloudinaryUploadWidgetResults & {
  info?: {
    secure_url?: string;
  };
};

interface UploadButtonProps {
  onChangeValue: (fieldName: string | undefined, value: any) => void;
  fieldName?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function UploadButton({
  onChangeValue,
  fieldName,
  className,
  children,
}: UploadButtonProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="z-100">
      {" "}
      <CldUploadWidget
        uploadPreset="site_cms_config"
        onSuccess={(result: CloudinaryUploadWidgetResults) => {
          setLoading(false);

          const url = (result as CloudinarySuccessResult).info?.secure_url;
          if (url) {
            console.log("fielName", fieldName);
            onChangeValue(fieldName, url);
          }
        }}
        onOpen={() => {
          setLoading(true);
        }}
        onError={() => {
          setLoading(false);
        }}
      >
        {({ open }) => (
          <button
            aria-label={loading ? "Chargement..." : "Charger un fichier"}
            type="button"
            className={className}
            onClick={() => open()}
            disabled={loading}
          >
            {loading ? "Chargement..." : (children ?? "Charger un fichier")}
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
