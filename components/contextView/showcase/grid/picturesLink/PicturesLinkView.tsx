// PicturesLinkView.tsx
import React from "react";
import { BlocObject } from "@/model/Bloc";
import PicturesLinkItemView from "./PictureLinkItemView";
import clsx from "clsx";

export default function PicturesLinkView({
  imageGroupData,
}: {
  imageGroupData: BlocObject;
}) {
  // Déterminer les classes de grille en fonction du nombre de colonnes
  const getGridClasses = (columns: number | null) => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 text-center p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {imageGroupData.text_titre}
      </h2>
      <div
        className={clsx(
          "w-full grid gap-4",
          getGridClasses(imageGroupData.number_columns),
        )}
      >
        {imageGroupData.image_medias.map((media) => {
          return (
            <PicturesLinkItemView key={media.number_id} mediaObject={media} />
          );
        })}
      </div>
    </section>
  );
}
