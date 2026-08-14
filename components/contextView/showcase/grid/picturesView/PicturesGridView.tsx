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
  const activeImg = active !== null ? bloc.image_medias[active] : null;

  return (
    <section className="max-w-[1650px] w-full mx-auto text-center mt-24 mb-8">
      <AnimatedTitle className="mb-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {bloc.text_titre}
        </h2>
      </AnimatedTitle>

      <div
        className="masonry-container"
        style={{
          columnGap: `${bloc.number_gap}px`,
          ["--max-columns" as any]: bloc.number_columns,
        }}
      >
        {bloc.image_medias.map((img, idx) => (
          <motion.div
            key={img.number_position_image ?? idx}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: Math.min(idx, 6) * 0.04 }}
            className="w-full mb-4"
            style={{ breakInside: "avoid", display: "inline-block" }}
          >
            <motion.button
              layoutId={`photo-${bloc.id ?? "grid"}-${idx}`}
              aria-label="Agrandir l'image"
              onClick={() => img.image_url !== "" && setActive(idx)}
              className="group relative w-full overflow-hidden rounded focus:outline-none"
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
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded cursor-pointer"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={idx < 3}
                />
              ) : (
                <div className="w-full aspect-square rounded bg-slate-200" />
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeImg && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              layoutId={`photo-${bloc.id ?? "grid"}-${active}`}
              onClick={(e) => e.stopPropagation()}
              className="relative cursor-default"
            >
              <Image
                src={activeImg.image_url ?? ""}
                alt={activeImg.text_titre || "Image agrandie"}
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
