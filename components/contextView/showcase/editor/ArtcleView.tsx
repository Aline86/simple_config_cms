/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useMemo } from "react";
import { JSONContent } from "@tiptap/core";
import { output } from "../../../../lib/utils/functions";

interface BlocParams {
  index: number;
  bloc: JSONContent;
}

function ArticleView({ bloc }: BlocParams) {
  const html = useMemo(() => {
    if (!bloc) return [];
    return output(bloc) ?? [];
  }, [bloc]);

  // Si pas de contenu, retourner null
  if (!html || html.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {html.map((out, index) => (
        <div
          key={index}
          className="tiptap none"
          dangerouslySetInnerHTML={{ __html: out }}
        />
      ))}
    </div>
  );
}

export default ArticleView;
