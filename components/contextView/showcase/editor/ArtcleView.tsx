"use client";

import { useMemo } from "react";
import { JSONContent } from "@tiptap/core";
import { output } from "../../../../lib/helpers/tiptapFunctions";
import AnimatedTitle from "../../../ui/animations/AnimatedTitle";
import DOMPurify from "isomorphic-dompurify";

function clean(html: string): string {
  if (!DOMPurify) return "";
  return DOMPurify.sanitize(html);
}

interface BlocParams {
  index: number;
  bloc: JSONContent;
}

function ArticleView({ bloc }: BlocParams) {
  const blocks = useMemo(() => {
    if (!bloc) return [];
    return output(bloc) ?? [];
  }, [bloc]);

  return (
    <section className="w-full mb-8">
      {blocks.map((block, index) => {
        const content = (
          <div
            className="tiptap none"
            dangerouslySetInnerHTML={{ __html: clean(block.html) }}
          />
        );

        if (block.type === "heading") {
          return <AnimatedTitle key={index}>{content}</AnimatedTitle>;
        }

        return <div key={index}>{content}</div>;
      })}
    </section>
  );
}

export default ArticleView;
