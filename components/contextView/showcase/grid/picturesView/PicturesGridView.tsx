"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { BlocObject } from "../../../../../database/model/Bloc";
import AnimatedTitle from "../../../../ui/animations/AnimatedTitle";

export default function PicturesgridView({
  bloc,
  editing = false,
}: {
  bloc: BlocObject;
  editing: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="max-w-[1650px] w-full mx-auto text-center p-8 mb-8">
      <AnimatedTitle
        children={
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {bloc.text_titre}
          </h2>
        }
        className="mb-12"
      ></AnimatedTitle>
      <div
        className="masonry-container"
        style={{
          columnGap: `${bloc.number_gap}px`,
          ["--max-columns" as any]: bloc.number_columns,
        }}
      >
        {bloc.image_medias.map((img, idx) => (
          <motion.button
            key={idx}
            layoutId={`photo-${idx}`}
            aria-label="Agrandir l'image"
            onClick={() => img.image_url !== "" && setActive(idx)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: Math.min(idx, 6) * 0.04 }}
            className="group relative w-full mb-4 overflow-hidden rounded focus:outline-none"
            style={{ breakInside: "avoid", display: "inline-block" }}
          >
            {editing && (
              <div className="absolute top-4 left-4 z-10 flex items-center justify-center text-gray-100 text-2xl border border-gray-300 rounded-full w-9 h-9">
                {idx + 1}
              </div>
            )}

            {img.image_url !== "" ? (
              <Image
                src={img.image_url}
                alt={img.text_titre || `img-${idx}`}
                width={800}
                height={800}
                className="w-full h-auto rounded cursor-pointer z-20"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={idx < 3}
              />
            ) : (
              <div className="w-full aspect-square rounded bg-slate-200" />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={`photo-${active}`}
              onClick={(e) => e.stopPropagation()}
              className="relative cursor-default"
            >
              <Image
                src={bloc.image_medias[active].image_url}
                alt={bloc.image_medias[active].text_titre || "Image agrandie"}
                width={1920}
                height={1080}
                className="max-h-[90vh] w-auto max-w-[90vw] rounded object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
