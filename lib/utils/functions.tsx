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
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (
        current[key] === undefined ||
        current[key] === null ||
        typeof current[key] !== "object"
      ) {
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

  return {
    updated,
    data: result,
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
        html = `__${html}__`;
        break;
      case "strike":
        html = `~~${html}~~`;
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
    html += `<p>`;
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
  }

  return html;
}

// Function to convert the provided Tiptap JSON into HTML
function convertTiptapToHTML(nodes: JSONContent): string {
  let html = "";

  if (nodes !== undefined) {
    let paragraphHTML = "";

    if (nodes?.type === "heading" && nodes?.content !== undefined) {
      const textAlign = nodes?.attrs?.textAlign || "left";
      const level = nodes?.attrs?.level || 1;

      let alignClass = "";
      let sizeClass = "";

      if (textAlign === "center") {
        alignClass = "text-center";
      } else if (textAlign === "right") {
        alignClass = "text-right";
      } else if (textAlign === "justify") {
        alignClass = "text-justify";
      }

      // Ajouter des classes de taille selon le niveau
      switch (level) {
        case 1:
          sizeClass = "text-4xl ";
          break;
        case 2:
          sizeClass = "text-3xl ";
          break;
        case 3:
          sizeClass = "text-2xl ";
          break;
        case 4:
          sizeClass = "text-xl ";
          break;
        case 5:
          sizeClass = "text-lg ";
          break;
        case 6:
          sizeClass = "text-base ";
          break;
        default:
          sizeClass = "text-4xl ";
      }

      paragraphHTML += `<h${level} class="${sizeClass} ${alignClass}">${extractTextFromNode(nodes?.content)}</h${level}>`;
      html += paragraphHTML;
    }

    if (nodes?.type === "bulletList" && nodes?.content !== undefined) {
      const html_string = "";
      const list = extractTextFromNodeBullet(nodes?.content, html_string);
      paragraphHTML += `<div class="ml-4">`;
      list.forEach((enf: string) => {
        paragraphHTML += `<div class="ml-8">• ${enf}</div>`;
      });
      paragraphHTML += "</div>";
      html += paragraphHTML;
    }

    if (nodes?.type === "paragraph" && nodes?.content !== undefined) {
      const textAlign = nodes?.attrs?.textAlign || "left";
      let alignClass = "";

      if (textAlign === "center") {
        alignClass = "text-center";
      } else if (textAlign === "right") {
        alignClass = "text-right";
      } else if (textAlign === "justify") {
        alignClass = "text-justify";
      }

      paragraphHTML += `<p class="${alignClass}">`;
      nodes?.content.forEach((node: JSONContent) => {
        if (node.type === "text" && node.text !== undefined) {
          const text = node.text;
          const marks = node.marks || [];
          paragraphHTML += applyMarks(
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
      paragraphHTML += "</p>";
      html += paragraphHTML;
    }
  }

  return html;
}

// Et dans la fonction output :
export const output = (text_article: Record<string, any>) => {
  if (text_article !== undefined) {
    const html: string[] = [];
    if (
      text_article !== undefined &&
      text_article !== null &&
      text_article.content !== undefined &&
      text_article.content !== null &&
      Array.isArray(text_article.content) &&
      text_article.content.length > 0
    ) {
      text_article.content.map((value: object) => {
        html.push(convertTiptapToHTML(value));
      });
      // Utiliser DOMPurify directement comme fonction
      const safeHtmlArray = html.map((item) => {
        return DOMPurify.sanitize(item);
      });
      return safeHtmlArray;
    }
  }
};

// Déterminer les classes de grille en fonction du nombre de colonnes
export const getgridClasses = (columns: number | null) => {
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
