// PicturesLinkView.tsx

import clsx from "clsx";
import { getgridClasses } from "../../../../../lib/utils/functions";
import { BlocObject } from "../../../../../model/Bloc";
import PicturesLinkItemView from "./PictureLinkItemView";

export default function PicturesLinkView({ bloc }: { bloc: BlocObject }) {
  return (
    <section className="min-h-screen max-w-[1650px] w-full mx-auto text-center p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {bloc.text_titre}
      </h2>
      <div
        className={clsx(
          "w-full grid gap-4",
          getgridClasses(bloc.number_columns),
        )}
      >
        {bloc.image_medias.map((media) => {
          return (
            <PicturesLinkItemView
              key={media.id}
              mediaObject={media}
              isLink={true}
            />
          );
        })}
      </div>
    </section>
  );
}
