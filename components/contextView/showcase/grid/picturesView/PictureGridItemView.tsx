// PicturesGridView.tsx
import React from "react";
import { BlocObject } from "@/model/Bloc";
import Image from "next/image";

export default function PicturesGridView({
  imageGroupData,
}: {
  imageGroupData: BlocObject;
}) {
  // Générer une hauteur aléatoire mais fixe pour chaque image
  const getRandomHeight = (index: number) => {
    const heights = [250, 350, 450, 300, 400, 500, 320, 380, 420];
    return heights[index % heights.length];
  };

  console.log(
    "number_columns:",
    imageGroupData.number_columns,
    typeof imageGroupData.number_columns,
  );

  return (
    <section className="min-h-screen bg-slate-100 text-center p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {imageGroupData.text_titre}
      </h2>
      <div
        style={{
          columnCount: imageGroupData.number_columns,
          columnGap: `${imageGroupData.number_gap}px`,
          border: "2px solid red", // Pour voir le conteneur
        }}
      >
        {imageGroupData.image_medias.map((img, idx) => {
          const height = getRandomHeight(idx);
          return (
            <div
              key={idx}
              className="relative w-full overflow-hidden rounded break-inside-avoid"
              style={{
                marginBottom: `${imageGroupData.number_gap}px`,
                height: `${height}px`,
              }}
            >
              <Image
                fill
                src={img.image_image_url}
                alt={img.alt || `img-${idx}`}
                className="rounded object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
