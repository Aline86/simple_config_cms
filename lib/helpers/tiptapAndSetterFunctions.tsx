"use client";

import { JSONContent } from "@tiptap/core";

type Mark = {
  type:
    | "bold"
    | "link"
    | "code"
    | "italic"
    | "underline"
    | "strike"
    | "textStyle";
  attrs?: {
    fontSize?: string;
    href?: string;
    target?: string;
    rel?: string;
  };
};

const FONT_SIZE_MAP: Record<number, string> = {
  16: "16px",
  18: "18px",
  20: "20px",
  24: "24px",
};

const VALID_MARK_TYPES = [
  "bold",
  "link",
  "code",
  "italic",
  "underline",
  "strike",
  "textStyle",
];

function applyMarks(text: string, marks: Mark[] = []): string {
  return marks.reduce((html, mark) => {
    switch (mark.type) {
      case "bold":
        return `<strong>${html}</strong>`;
      case "code":
        return `<code>${html}</code>`;
      case "italic":
        return `<em>${html}</em>`;
      case "underline":
        return `<u>${html}</u>`;
      case "strike":
        return `<strike>${html}</strike>`;
      case "link":
        const href = mark.attrs?.href || "#";
        const target = mark.attrs?.target || "_blank";
        const rel = mark.attrs?.rel || "noopener noreferrer";
        return `<a title="${target}" href="${href}" target="${target}" rel="${rel}">${html}</a>`;
      case "textStyle":
        const size = FONT_SIZE_MAP[mark.attrs?.fontSize || ""];

        return size ? `<span style="font-size: ${size};">${html}</span>` : html;
      default:
        return html;
    }
  }, text);
}

function getValidMarks(node: JSONContent): Mark[] {
  return (node.marks || []).filter((mark): mark is Mark =>
    VALID_MARK_TYPES.includes(mark.type),
  );
}

function processTextNode(node: JSONContent): string {
  if (node.type !== "text" || !node.text) return "";
  return applyMarks(node.text, getValidMarks(node));
}

function processListItem(item: JSONContent): string {
  if (item.type !== "listItem" || !item.content) return "";

  return item.content
    .filter((child) => child.type === "paragraph" && child.content)
    .map((paragraph) => paragraph.content!.map(processTextNode).join(""))
    .join("");
}

function convertHeading(node: JSONContent): string {
  const textAlign = node.attrs?.textAlign || "left";
  const text = node.content?.map((n) => n.text || "").join(" ") || "";

  return `<h2 style="text-align: ${textAlign}; font-size: 65px">${text}</h2>`;
}

function convertBulletList(node: JSONContent): string {
  if (!node.content) return "";

  const items = node.content.map(processListItem).filter(Boolean);
  if (items.length === 0) return "";

  const itemsHtml = items
    .map(
      (item) =>
        `<li class="mb-4 w-full"><span class="mr-2 mt-1">•</span>${item}</li>`,
    )
    .join("");

  return `<div class="ml-6"><ul class="flex flex-col">${itemsHtml}</ul></div>`;
}

function convertParagraph(node: JSONContent): string {
  if (!node.content) return "";

  const textAlign = node.attrs?.textAlign || "left";
  const content = node.content.map(processTextNode).join("");

  return `<p style="text-align: ${textAlign}">${content}</p>`;
}

function convertTiptapToHTML(node: JSONContent): string {
  if (!node) return "";

  switch (node.type) {
    case "heading":
      return convertHeading(node);
    case "bulletList":
      return convertBulletList(node);
    case "paragraph":
      return convertParagraph(node);
    default:
      return "";
  }
}

export const output = (
  text_article: Record<string, any>,
): string[] | undefined => {
  if (!text_article?.content?.length) return undefined;

  return text_article.content.map(convertTiptapToHTML);
};

export const getgridClasses = (columns: number | null): string => {
  const gridMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return gridMap[columns || 4] || gridMap[4];
};
