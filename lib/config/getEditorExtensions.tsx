// ============================================
// lib/config/editorConfig.ts (VERSION CORRIGÉE)
// ============================================
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Paragraph from "@tiptap/extension-paragraph";

import {
  DISALLOWED_LINK_PROTOCOLS,
  NO_AUTOLINK_DOMAINS,
} from "./editorTypesConfig";
import { FontSize } from "../../lib/extensions/FontSize";

export const getEditorExtensions = () => [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "pl-5 list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
      HTMLAttributes: {
        class: "tiptap_heading",
      },
    },
  }),
  TextStyle,
  FontSize,
  TextAlign.configure({
    types: ["heading", "paragraph", "left", "right", "center", "justify"],
  }),

  Highlight,
  Underline,
  Paragraph.configure({
    HTMLAttributes: {
      class: "mt-5",
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        const protocol = parsedUrl.protocol.replace(":", "");
        if (DISALLOWED_LINK_PROTOCOLS.includes(protocol)) {
          return false;
        }

        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme,
        );
        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);
        return !NO_AUTOLINK_DOMAINS.includes(parsedUrl.hostname);
      } catch {
        return false;
      }
    },
  }),
];
