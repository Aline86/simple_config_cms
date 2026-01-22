/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  useEffect,
  useState,
  Suspense,
  CSSProperties,
  useCallback,
} from "react";

import { ArticleObject } from "@/model/bloc/Article";
import { JSONContent } from "@tiptap/core";
import DOMPurify from "dompurify";
import { getGridClasses, output } from "@/lib/utils/functions";
import PicturesLinkItemView from "../grid/picturesLink/PictureLinkItemView";
import { BlocObject } from "@/model/Bloc";
import ArticleView from "./ArtcleView";
import clsx from "clsx";
import ContentLayout from "./ContentLayout";
import { MediaObject } from "@/model/bloc/MediaObject";

interface BlocParams {
  index: number;
  bloc: BlocObject;
}
type ImagePosition = "top" | "left" | "right";

// Version refactorisée du composant
export default function TextView({ index, bloc }: BlocParams) {
  const article = bloc.articles?.[0];
  const hasImages = article?.images?.length > 0;
  const hasText = article?.text_text_article !== null;
  const imagePosition = (article.text_images_position ||
    "top") as ImagePosition;

  if (!article) return null;

  const imagesNode = hasImages ? (
    <div
      className={clsx(
        "grid gap-4",
        imagePosition === "top"
          ? getGridClasses(bloc.number_columns || 3)
          : "grid-cols-1",
      )}
    >
      {article.images.map((media: MediaObject) => (
        <PicturesLinkItemView key={media.number_id} mediaObject={media} />
      ))}
    </div>
  ) : null;

  const textNode = hasText ? (
    <ArticleView
      index={index}
      bloc={article.text_text_article as JSONContent}
    />
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
