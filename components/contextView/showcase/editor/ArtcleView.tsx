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
import { output } from "@/lib/utils/functions";

interface BlocParams {
  index: number;
  bloc: JSONContent;
}

function ArticleView({ bloc }: BlocParams) {
  const [html, setHTML] = useState<Array<string>>();

  useEffect(() => {
    bloc !== null && setHTML(output(bloc) ?? []);
  }, [bloc]);
  useEffect(() => {
    console.log("html", html);
  }, [html]);
  return (
    <div className="">
      <div className="">
        <Suspense fallback={<div>Chargement...</div>}>
          {html !== undefined &&
            typeof html === "object" &&
            Array.isArray(html) &&
            html.length > 0 &&
            html.map((out, index) => {
              return (
                <div
                  key={index}
                  className="tiptap none"
                  dangerouslySetInnerHTML={{ __html: out }}
                />
              );
            })}
        </Suspense>
      </div>
    </div>
  );
}

export default ArticleView;
