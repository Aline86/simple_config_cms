// PicturesGridView.tsx
import React, { useState } from "react";
import { BlocObject } from "@/model/Bloc";
import Image from "next/image";

export default function PicturesGridView({
  imageGroupData,
}: {
  imageGroupData: BlocObject;
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-slate-100 text-center p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {imageGroupData.text_titre}
      </h2>

      {/* Masonry */}
      <div
        className="masonry-container"
        style={{
          columnGap: `${imageGroupData.number_gap}px`,
          ["--max-columns" as any]: imageGroupData.number_columns,
        }}
      >
        {imageGroupData.image_medias.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(img.image_image_url)}
            className="w-full mb-4 overflow-hidden rounded focus:outline-none"
            style={{
              breakInside: "avoid",
              pageBreakInside: "avoid",
              display: "inline-block",
            }}
          >
            {img.image_image_url !== undefined &&
            img.image_image_url !== null ? (
              <Image
                src={img.image_image_url}
                alt={img.text_titre || `img-${idx}`}
                className="rounded w-full cursor-pointer"
                width={100}
                height={100}
              />
            ) : (
              <></>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative w-full max-w-6xl h-[90vh]">
            <Image
              src={activeImage}
              alt="Image agrandie"
              fill
              className="object-contain rounded"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
