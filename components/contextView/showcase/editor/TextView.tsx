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

interface BlocParams {
  index: number;
  bloc: BlocObject;
}

function TextView({ bloc }: BlocParams) {
  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6  text-center ">
        {bloc.text_titre}
      </h2>
      <div
        className={clsx(
          "w-full grid gap-4",
          getGridClasses(bloc.number_columns),
        )}
      >
        {bloc.articles[0].images.map((media) => {
          return (
            <PicturesLinkItemView key={media.number_id} mediaObject={media} />
          );
        })}
      </div>
      {bloc.articles[0].text_text_article !== undefined && (
        <ArticleView
          index={0}
          bloc={bloc.articles[0].text_text_article as JSONContent}
        />
      )}
    </section>
  );
}

export default TextView;
