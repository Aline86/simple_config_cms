/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useMemo } from "react";
import { JSONContent } from "@tiptap/core";
import { output } from "../../../../lib/helpers/tiptapFunctions";

interface DOMPurifyI {
  sanitize: (
    source: string,
    config?: {
      ALLOWED_TAGS?: string[];
      ALLOWED_ATTR?: string[];
      ALLOW_DATA_ATTR?: boolean;
    },
  ) => string;
}

let DOMPurify: DOMPurifyI | undefined;
if (typeof window !== "undefined") {
  DOMPurify = require("dompurify");
}

interface BlocParams {
  index: number;
  bloc: JSONContent;
}

function ArticleView({ bloc }: BlocParams) {
  const html = useMemo(() => {
    if (!bloc) return [];
    return output(bloc) ?? [];
  }, [bloc]);

  return (
    <section className="w-full">
      {html.map((out, index) => (
        <div
          key={index}
          className="tiptap none"
          dangerouslySetInnerHTML={{ __html: out }}
        />
      ))}
    </section>
  );
}

export default ArticleView;
