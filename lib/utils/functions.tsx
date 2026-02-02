import { JSONContent } from "@tiptap/core";
import { produce } from "immer";

type UpdateResult<T> = {
  updated: boolean;
  data: T;
};

export function updateObjectBySetter<T>(
  obj: T,
  path: string,
  value: unknown,
): UpdateResult<T> {
  const keys = path.split(".");
  let updated = false;

  const result = produce(obj, (draft: any) => {
    let current = draft;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    if (current[lastKey] !== value) {
      current[lastKey] = value;
      updated = true;
    }
  });

  return { updated, data: result };
}

export interface Content {
  type: string;
  attrs?: {
    size?: string;
    href?: string;
    target?: string;
    rel?: string;
    class?: string | null;
    textAlign?: string | null;
  };
  content: {
    type: string;
    text: string;
    marks: Mark[];
  }[];
}

type Mark = {
  type:
    | "bold"
    | "link"
    | "code"
    | "italic"
    | "underline"
    | "strike"
    | "fontSize";
  attrs?: {
    size?: string;
    href?: string;
    target?: string;
    rel?: string;
    class?: string | null;
  };
};

const VALID_MARK_TYPES = [
  "bold",
  "link",
  "code",
  "italic",
  "underline",
  "strike",
  "fontSize",
];

function applyMarks(text: string, marks: Mark[] = []): string {
  let html = text;

  marks.forEach((mark) => {
    switch (mark.type) {
      case "bold":
        html = `<strong>${html}</strong>`;
        break;
      case "code":
        html = `<code>${html}</code>`;
        break;
      case "link": {
        const href = mark.attrs?.href || "#";
        const target = mark.attrs?.target || "_blank";
        const rel = mark.attrs?.rel || "noopener noreferrer";
        html = `<a href="${href}" target="${target}" rel="${rel}">${html}</a>`;
        break;
      }
      case "fontSize": {
        const sizeMap: Record<string, string> = {
          "16": "text-sm",
          "18": "text-lg",
          "20": "text-2xl",
          "24": "text-3xl",
        };
        const size = sizeMap[mark.attrs?.size || ""] || "";
        if (size) {
          html = `<span class="${size}">${html}</span>`;
        }
        break;
      }
      case "italic":
        html = `<em>${html}</em>`;
        break;
      case "underline":
        html = `<u>${html}</u>`;
        break;
      case "strike":
        html = `<strike>${html}</strike>`;
        break;
    }
  });

  return html;
}

function extractTextFromNode(node: any): string {
  let result = "";

  if (Array.isArray(node)) {
    node.forEach((child) => {
      result += extractTextFromNode(child);
    });
  } else if (typeof node === "object" && node !== null) {
    if (node.text) {
      result += node.text + " ";
    }
    if (node.content) {
      result += extractTextFromNode(node.content);
    }
  }

  return result;
}

function extractTextFromNodeBullet(node: JSONContent, html: string): string[] {
  const result: string[] = [];

  if (Array.isArray(node)) {
    node.forEach((child) => {
      result.push(extractTextFromNodeBullet(child, html).join(""));
    });
  } else if (typeof node === "object" && node !== null) {
    if (node.text) {
      const res = createMarks(node, html);
      result.push(res);
    }
    if (node.content) {
      result.push(extractTextFromNodeBullet(node.content, html).join(""));
    }
  }

  return result;
}

function createMarks(nodes: JSONContent, html: string): string {
  if (nodes?.type === "paragraph" && nodes?.content) {
    const textAlign = nodes.attrs?.textAlign || "left";
    html += `<p style="text-align: ${textAlign}">`;

    nodes.content.forEach((node: JSONContent) => {
      if (node.type === "text" && node.text) {
        const marks = (node.marks || []).filter((mark): mark is Mark =>
          VALID_MARK_TYPES.includes(mark.type),
        );
        html += applyMarks(node.text, marks);
      }
    });

    html += "</p>";
  } else if (nodes?.type === "text" && nodes.text) {
    const marks = (nodes.marks || []).filter((mark): mark is Mark =>
      VALID_MARK_TYPES.includes(mark.type),
    );
    html += applyMarks(nodes.text, marks);
  }

  return html;
}

function convertTiptapToHTML(nodes: JSONContent): string {
  if (!nodes) return "";

  let html = "";

  // Heading
  if (nodes.type === "heading" && nodes.content) {
    const textAlign = nodes.attrs?.textAlign || "left";
    const text = extractTextFromNode(nodes.content);
    html += `<h2 style="text-align: ${textAlign}; font-size: 65px">${text}</h2>`;
  }

  // Bullet List
  if (nodes.type === "bulletList" && nodes.content) {
    const list = extractTextFromNodeBullet(nodes.content, "");
    html += `<div class="ml-6"><ul class="flex flex-col">`;

    list.forEach((item: string) => {
      html += `<li class="mb-4 w-full"><span class="mr-2 mt-1">•</span>${item}</li>`;
    });

    html += "</ul></div>";
  }

  // Paragraph
  if (nodes.type === "paragraph" && nodes.content) {
    html = createMarks(nodes, html);
  }

  return html;
}

export const output = (
  text_article: Record<string, any>,
): string[] | undefined => {
  if (
    !text_article?.content ||
    !Array.isArray(text_article.content) ||
    text_article.content.length === 0
  ) {
    return undefined;
  }

  const html = text_article.content.map((value: JSONContent) =>
    convertTiptapToHTML(value),
  );

  return html.map((item) => item);
};

export const getgridClasses = (columns: number | null): string => {
  switch (columns) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 3:
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    case 4:
    default:
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  }
};
