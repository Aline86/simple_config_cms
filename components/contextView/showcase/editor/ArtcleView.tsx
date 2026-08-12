"use client";


  import { useMemo } from "react";
  import type { JSONContent } from "@tiptap/core";
  import { output } from "../../../../lib/helpers/tiptapFunctions";
  import AnimatedTitle from "../../../ui/animations/AnimatedTitle";

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
              dangerouslySetInnerHTML={{ __html: block.html }}
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
