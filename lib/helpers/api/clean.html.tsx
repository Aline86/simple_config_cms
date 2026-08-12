import sanitizeHtml from "sanitize-html";
const options: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "picture",
    "source",
    "video",
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
    "iframe",
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
    audio: ["src", "controls", "autoplay", "muted", "loop"],
    iframe: [
      "src",
      "width",
      "height",
      "allow",
      "allowfullscreen",
      "frameborder",
      "title",
    ],
    td: ["colspan", "rowspan", "headers"],
    th: ["colspan", "rowspan", "headers", "scope"],
    ol: ["start", "type", "reversed"],
    table: ["border", "cellpadding", "cellspacing"],
  },

  // style non filtré (allowedStyles absent = tout passe)
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedSchemesByTag: { img: ["http", "https", "data"] },
  allowProtocolRelative: true,

  // embeds : restreins aux hôtes que tu utilises vraiment
  allowedIframeHostnames: [
    "www.youtube.com",
    "youtube.com",
    "player.vimeo.com",
  ],

  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
  },
};

export async function clean(html: string): Promise<string> {
  return await sanitizeHtml(html, options);
}
