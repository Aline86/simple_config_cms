import sanitizeHtml from "sanitize-html";
const options: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",

    "audio",
    "track",
    "h1",
    "h2",
    "figure",
    "figcaption",
    "section",
    "article",
    "header",
    "footer",
    "aside",
    "main",
    "nav",
    "details",
    "summary",
    "mark",
    "small",
    "u",
    "s",
    "sub",
    "sup",
    "span",
  ],

  allowedAttributes: {
    "*": [
      "class",
      "id",
      "style",
      "title",
      "lang",
      "dir",
      "role",
      "data-*",
      "aria-*",
    ],
    a: ["href", "name", "target", "rel", "download"],
    img: [
      "src",
      "srcset",
      "sizes",
      "alt",
      "width",
      "height",
      "loading",
      "decoding",
    ],
    source: ["src", "srcset", "sizes", "type", "media"],
    video: [
      "src",
      "poster",
      "controls",
      "autoplay",
      "muted",
      "loop",
      "playsinline",
      "width",
      "height",
    ],
    td: ["colspan", "rowspan", "headers"],
    th: ["colspan", "rowspan", "headers", "scope"],
    ol: ["start", "type", "reversed"],
    table: ["border", "cellpadding", "cellspacing"],
  },

  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https", "data"] },
  allowProtocolRelative: true,

  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
  },
};
export function clean(html: string): string {
  return sanitizeHtml(html, options);
}