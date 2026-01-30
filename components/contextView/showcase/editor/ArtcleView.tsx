/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, Suspense } from "react";
import { JSONContent } from "@tiptap/core";
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
    <div className="min-w-sm">
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
  );
}

export default ArticleView;
