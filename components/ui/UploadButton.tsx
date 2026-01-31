"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";

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

          const url = result?.info?.secure_url;
          if (url) {
            onChangeValue(fieldName, url);
          }
        }}
        onOpen={() => setLoading(true)}
        onError={() => setLoading(false)}
      >
        {({ open }) => (
          <button
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
