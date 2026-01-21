"use client";
import { useEffect, useState } from "react";

import { MediaPreview } from "@/components/contextView/showcase/media/MediaPreview";
import { MediaEditor } from "@/components/contextView/edition/media/Media";
import { MediaObject } from "@/model/bloc/TestMediaObject";

export type UpdateResult<T> = {
  updated: boolean;
  data: T;
};

export default function MediaContainer({
  mediaObject,
  onChange,
}: {
  mediaObject: MediaObject;
  onChange: (fieldName: string, newValue: any) => MediaObject;
}) {
  useEffect(() => {
    console.log("🔄 Media updated:", {
      titre: mediaObject.text_titre,
      image_url: mediaObject.image_image_url,
      image_lien: mediaObject.text_image_lien,
    });
  }, [mediaObject]);
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Éditeur */}
      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
        <MediaEditor media={mediaObject} onChange={onChange} />
      </div>

      {/* Preview */}
      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <MediaPreview media={mediaObject} />
      </div>
    </div>
  );
}
