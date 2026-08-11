"use client";
import { motion } from "framer-motion";

import clsx from "clsx";
import { BlocObject } from "../../../../../database/model/Bloc";
import PicturesLinkItemView from "./PictureLinkItemView";
import { getgridClasses } from "../../../../../lib/helpers/tiptapFunctions";

export default function PicturesLinkView({
  bloc,
  editing = false,
}: {
  bloc: BlocObject;
  editing: boolean;
}) {
  return (
    <section className="max-w-[1650px] w-full mx-auto text-center p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {bloc.text_titre}
      </h2>
      <div
        className={clsx(
          "w-full grid gap-4",
          getgridClasses(bloc.number_columns),
        )}
      >
        {bloc.image_medias.map((media, idx) => (
          <motion.div
            key={media.id}
            className="h-full"
            initial={{ opacity: 0, y: -32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: Math.min(idx, 8) * 0.06,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            <PicturesLinkItemView
              mediaObject={media}
              isLink={true}
              editing={editing}
              cardNumber={idx}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
