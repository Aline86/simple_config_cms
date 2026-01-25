// PicturesGridView.tsx
import React from "react";
import { BlocObject } from "@/model/Bloc";
import Image from "next/image";

export default function PicturesGridView({
  imageGroupData,
}: {
  imageGroupData: BlocObject;
}) {
  return (
    <section className="min-h-screen bg-slate-100 text-center p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {imageGroupData.text_titre}
      </h2>
      <div
        style={{
          columnCount: imageGroupData.number_columns,
          columnGap: `${imageGroupData.number_gap}px`,
          width: "100%",
        }}
        className="masonry-container"
      >
        {imageGroupData.image_medias.map((img, idx) => {
          return (
            <div
              key={idx}
              className="w-full overflow-hidden rounded p-0"
              style={{
                marginBottom: `${imageGroupData.number_gap}px`,

                breakInside: "avoid",
                pageBreakInside: "avoid",
                display: "inline-block",
                width: "100%",
                position: "relative",
              }}
            >
              <Image
                src={img.image_image_url}
                alt={img.alt || `img-${idx}`}
                className="rounded w-full  p-0"
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
