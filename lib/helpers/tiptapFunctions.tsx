import { JSONContent } from "@tiptap/core";

type Mark = {
  type:
    "bold" | "link" | "code" | "italic" | "underline" | "strike" | "textStyle";
  attrs?: {
    fontSize?: string;
    href?: string;
    target?: string;
    rel?: string;
  };
};

export type OutputBlock = {
  type: string;
  html: string;
};

const FONT_SIZE_MAP: Record<string, string> = {
  "16": "16px",
  "18": "18px",
  "20": "20px",
  "24": "24px",
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

const MARK_HANDLERS: Record<string, (html: string, attrs?: any) => string> = {
  bold: (html) => `<strong>${html}</strong>`,
  code: (html) => `<code>${html}</code>`,
  italic: (html) => `<em>${html}</em>`,
  underline: (html) => `<u>${html}</u>`,
  strike: (html) => `<s>${html}</s>`,
  link: (html, attrs = {}) => {
    const href = attrs.href || "#";
    const target = attrs.target || "_blank";
    const rel = attrs.rel || "noopener noreferrer";
    return `<a href="${href}" target="${target}" rel="${rel}">${html}</a>`;
  },
  textStyle: (html, attrs = {}) => {
    const raw = String(attrs.fontSize ?? "").replace("px", "");
    const size = FONT_SIZE_MAP[raw];
    return size ? `<span style="font-size: ${size};">${html}</span>` : html;
  },
};

function applyMarks(text: string, marks: Mark[] = []): string {
  return marks.reduce((html, mark) => {
    const handler = MARK_HANDLERS[mark.type];
    return handler ? handler(html, mark.attrs) : html;
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

function convertHeading(node: JSONContent): string {
  const textAlign = node.attrs?.textAlign || "left";
  const text = node.content?.map((n) => n.text || "").join(" ") || "";
  return `<h2 style="text-align: ${textAlign}; font-size: 65px">${text}</h2>`;
}

function convertParagraph(node: JSONContent): string {
  if (!node.content) return "";

  const textAlign = node.attrs?.textAlign || "left";
  const content = node.content.map(processTextNode).join("");

  return `<p style="text-align: ${textAlign}">${content}</p>`;
}

function isValidListItem(item: JSONContent): boolean {
  return item.type === "listItem" && !!item.content;
}

function isValidParagraph(child: JSONContent): boolean {
  return child.type === "paragraph" && !!child.content;
}

function hasContent(items: string[]): boolean {
  return items.length > 0;
}

function extractParagraphText(paragraph: JSONContent): string {
  return paragraph.content?.map(processTextNode).join("") || "";
}

function extractListItemText(item: JSONContent): string {
  const paragraphs = item.content?.filter(isValidParagraph) || [];
  return paragraphs.map(extractParagraphText).join("");
}

function wrapInListItem(text: string): string {
  return `<li class="mb-4 w-full"><span class="mr-2 mt-1">•</span>${text}</li>`;
}

function wrapInBulletList(itemsHtml: string): string {
  return `<div class="ml-6"><ul class="flex flex-col">${itemsHtml}</ul></div>`;
}

function processListItem(item: JSONContent): string {
  if (!isValidListItem(item)) return "";
  return extractListItemText(item);
}

function convertBulletList(node: JSONContent): string {
  if (!node.content) return "";

  const items = node.content.map(processListItem).filter(Boolean);

  if (!hasContent(items)) return "";

  const itemsHtml = items.map(wrapInListItem).join("");
  return wrapInBulletList(itemsHtml);
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
): OutputBlock[] | undefined => {
  if (!text_article?.content?.length) return undefined;

  return text_article.content.map((node: JSONContent) => ({
    type: node.type ?? "unknown",
    html: convertTiptapToHTML(node),
  }));
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
