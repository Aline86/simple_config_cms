// PicturesLinkView.tsx
import React from "react";
import { BlocObject } from "@/model/Bloc";
import PicturesLinkItemView from "./PictureLinkItemView";
import clsx from "clsx";
import { getGridClasses } from "@/lib/utils/functions";

export default function PicturesLinkView({
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
