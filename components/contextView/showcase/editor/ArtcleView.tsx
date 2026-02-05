/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useMemo } from "react";
import { JSONContent } from "@tiptap/core";
import { output } from "../../../../lib/utils/functions";

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

  const sanitizedHtml = useMemo(() => {
    if (html.length === 0) return [];

    // Vérifier que DOMPurify est disponible (côté client uniquement)
    if (typeof window === "undefined" || !DOMPurify) return html;

    return html.map((content) =>
      DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "s",
          "a",
          "ul",
          "ol",
          "li",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "blockquote",
          "code",
          "pre",
          "img",
          "span",
          "div",
        ],
        ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "class", "style"],
        ALLOW_DATA_ATTR: false,
      }),
    );
  }, [html]);

  return (
    <div className="w-full">
      {sanitizedHtml.map((out, index) => (
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
