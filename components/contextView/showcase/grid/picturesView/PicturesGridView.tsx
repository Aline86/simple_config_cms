// PicturesgridView.tsx
import { useState } from "react";

import Image from "next/image";
import { BlocObject } from "../../../../../database/model/Bloc";

export default function PicturesgridView({ bloc }: { bloc: BlocObject }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="max-w-[1650px] w-full mx-auto text-center p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {bloc.text_titre}
      </h2>

      {/* Masonry */}
      <div
        className="masonry-container"
        style={{
          columnGap: `${bloc.number_gap}px`,
          ["--max-columns" as any]: bloc.number_columns,
        }}
      >
        {bloc.image_medias.map((img, idx) => (
          <button
            aria-label="Agrandir l'image"
            key={idx}
            onClick={() => setActiveImage(img.image_url)}
            className="w-full mb-4 overflow-hidden rounded focus:outline-none"
            style={{
              breakInside: "avoid",
              pageBreakInside: "avoid",
              display: "inline-block",
            }}
          >
            {img.image_url !== "" ? (
              <Image
                src={img.image_url}
                alt={img.text_titre || `img-${idx}`}
                className="rounded w-full cursor-pointer"
                width={100}
                height={100}
                sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1440px
  "
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
              sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    1440px
  "
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
