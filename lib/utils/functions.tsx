import { ArticleObject } from "@/model/bloc/Article";
import { JSONContent } from "@tiptap/core";
import { produce } from "immer";
import DOMPurify from "dompurify";

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
    console.log("current", current, path, value);
    for (let i = 0; i < keys.length - 1; i++) {
      console.log("keys[i]", keys[i], path, value);
      if (current == null) return;

      current = current[keys[i]];
    }

    const lastKey = keys[keys.length - 1];

    if (current?.[lastKey] !== value) {
      current[lastKey] = value;
      updated = true;
    }
  });

  return {
    updated,
    data: updated ? result : obj,
  };
}

// Create texte for Editor view

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
        let size = "";

        if (mark.attrs?.size === "16") {
          size = "text-sm";
        } else if (mark.attrs?.size === "18") {
          size = "text-lg";
        } else if (mark.attrs?.size === "20") {
          size = "text-2xl";
        } else if (mark.attrs?.size === "24") {
          size = "text-3xl";
        }

        html = `<span class="${size}">${html}</span>`;
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
function extractTextFromNode(
  node:
    | { text?: string; content?: { text?: string; content?: unknown[] }[] }
    | { [key: string]: unknown }[],
): string {
  let result: string = "";

  if (Array.isArray(node)) {
    node.forEach(
      (
        child:
          | {
              text?: string;
              content?: { text?: string; content?: unknown[] }[];
            }
          | { [key: string]: unknown }[],
      ) => {
        result += extractTextFromNode(child);
      },
    );
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
function createMarks(nodes: JSONContent, html: string) {
  if (nodes?.type === "paragraph" && nodes?.content !== undefined) {
    html += `<p style="text-align: ${nodes.attrs?.textAlign || "left"}">`;
    nodes?.content.forEach((node: JSONContent) => {
      if (node.type === "text" && node.text !== undefined) {
        const text = node.text;
        const marks = node.marks || [];
        html += applyMarks(
          text,
          marks.filter((mark): mark is Mark =>
            [
              "bold",
              "link",
              "code",
              "italic",
              "underline",
              "strike",
              "fontSize",
            ].includes(mark.type),
          ),
        );
      }
    });

    html += "</p>";
  } else if (nodes !== undefined) {
    if (nodes.type === "text" && nodes.text !== undefined) {
      const text = nodes.text;
      const marks = nodes.marks || [];
      html += applyMarks(
        text,
        marks.filter((mark): mark is Mark =>
          [
            "bold",
            "link",
            "code",
            "italic",
            "underline",
            "strike",
            "fontSize",
          ].includes(mark.type),
        ),
      );
    }

    // html += "</p>";
  }
  return html;
}
// Function to convert the provided Tiptap JSON into HTML
function convertTiptapToHTML(nodes: JSONContent): string {
  let html = "";
  if (nodes !== undefined) {
    let paragraphHTML = "";
    if (nodes?.type === "heading" && nodes?.content !== undefined) {
      paragraphHTML += `<h2 style="text-align: ${
        nodes.attrs?.textAlign || "left"
      }; font-size: 45px"> ${extractTextFromNode(nodes?.content)}</h2>`;

      html += paragraphHTML;
    }
    if (nodes?.type === "bulletList" && nodes?.content !== undefined) {
      const html_string = "";
      const list = extractTextFromNodeBullet(nodes?.content, html_string);

      paragraphHTML += `<div class="ml-6 "><ul class="flex flex-col">`;

      list.forEach((enf: string) => {
        paragraphHTML += `<li class="mb-4 w-full"><span class="mr-2 mt-1">•</span>${enf}</li>`;
      });

      paragraphHTML += "</ul></div>";

      html += paragraphHTML;
    }
    if (nodes?.type === "paragraph" && nodes?.content !== undefined) {
      paragraphHTML += `<p style="text-align: ${
        nodes.attrs?.textAlign || "left"
      }">`;
      paragraphHTML = createMarks(nodes, html);
      paragraphHTML += "</p>";
      html += paragraphHTML;
    }
  }

  // your code
  // bloc?.text !== undefined && (text = html);
  return html;
}

export const output = (text_text_article: Record<string, any>) => {
  if (text_text_article !== undefined) {
    const html: string[] = [];

    if (
      text_text_article !== undefined &&
      text_text_article !== null &&
      text_text_article.content !== undefined &&
      text_text_article.content !== null &&
      Array.isArray(text_text_article.content) &&
      text_text_article.content.length > 0
    ) {
      text_text_article.content.map((value: object) => {
        html.push(convertTiptapToHTML(value));
      });
      const safeHtmlArray = html.map((item) => DOMPurify.sanitize(item));
      return safeHtmlArray;
    }
  }
};
// Déterminer les classes de grille en fonction du nombre de colonnes
export const getGridClasses = (columns: number | null) => {
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
