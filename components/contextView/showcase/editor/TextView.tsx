"use client";

import { JSONContent } from "@tiptap/core";
import clsx from "clsx";
import { getgridClasses } from "../../../../lib/helpers/tiptapFunctions";
import { BlocObject } from "../../../../database/model/Bloc";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import PicturesLinkItemView from "../grid/picturesLink/PictureLinkItemView";
import ArticleView from "./ArtcleView";
import ContentLayout from "./ContentLayout";
import { motion } from "framer-motion";

interface BlocParams {
  bloc: BlocObject;
  editing?: boolean;
}
type ImagePosition = "top" | "left" | "right";

export default function TextView({ bloc, editing = false }: BlocParams) {
  const article = bloc.articles[0];
  const hasImages = article.images.length > 0;
  const hasText = article.text_article !== null;
  const imagePosition = (article.text_images_position ||
    "top") as ImagePosition;

  const imagesNode = hasImages ? (
    <div
      className={clsx(
        "grid gap-4 min-w-[150px]",
        imagePosition === "top"
          ? getgridClasses(bloc.number_columns || 3)
          : "grid-cols-1",
      )}
    >
      {article.images.map((media: MediaObject, idx: number) => (
        <motion.div
          key={media.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.4, delay: Math.min(idx, 8) * 0.05 }}
        >
          <PicturesLinkItemView
            mediaObject={media}
            editing={editing}
            cardNumber={idx}
          />
        </motion.div>
      ))}
    </div>
  ) : null;

  const textNode = hasText ? (
    <ArticleView index={0} bloc={article.text_article as JSONContent} />
  ) : null;

  return (
    <ContentLayout
      position={imagePosition}
      title={bloc.text_titre}
      images={imagesNode}
      text={textNode}
      hasImages={hasImages}
      hasText={hasText}
    />
  );
}
