// ============================================
// components/editor/EditorToolbar.tsx (VERSION MISE À JOUR)
// ============================================
import { Editor } from "@tiptap/core";

import { FontSizeSelector } from "./FontSizeSelector";
import { ToolbarButton } from "./ToolbarButton";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
  UnlinkIcon,
} from "lucide-react";
import { BulletListIcon } from "../../../../icons/EditorIcons";

interface EditorToolbarProps {
  editor: Editor;
  onSetLink: () => void;
}

export const EditorToolbar = ({ editor, onSetLink }: EditorToolbarProps) => (
  <div className="mb-5 border-b pb-2">
    <div className="flex gap-1 flex-wrap">
      <button
        aria-label="Paragraphe"
        onClick={() => editor.chain().focus().setParagraph().run()}
        disabled={!editor.can().chain().focus().setParagraph().run()}
        className={`px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
          editor.isActive("paragraph") ? "bg-blue-100 text-blue-600" : ""
        }`}
      >
        Paragraphe
      </button>

      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        // disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        icon={<BoldIcon />}
        alt="Gras"
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        // disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        icon={<ItalicIcon />}
        alt="Italique"
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        //disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        icon={<StrikethroughIcon />}
        alt="Barré"
      />

      <ToolbarButton
        onClick={() =>
          editor.isActive("underline")
            ? editor.chain().focus().unsetUnderline().run()
            : editor.chain().focus().setUnderline().run()
        }
        isActive={editor.isActive("underline")}
        icon={<UnderlineIcon />}
        alt="Souligné"
      />

      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        icon={<BulletListIcon />}
        alt="Liste à puces"
      />

      <div className="w-px bg-gray-300 mx-1" />

      <FontSizeSelector editor={editor} />

      <button
        className="px-3 py-2 rounded hover:bg-gray-100 transition-colors text-sm flex items-center gap-1"
        onClick={() => editor.chain().focus().unsetFontSize()}
        title="Réinitialiser la taille"
        aria-label="Réinitialiser la taille"
      >
        <UndoIcon className="w-4 h-4" />
        <span>Taille</span>
      </button>

      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        //  disabled={!editor.can().chain().focus().undo().run()}
        icon={<UndoIcon />}
        alt="Annuler"
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        //  disabled={!editor.can().chain().focus().redo().run()}
        icon={<RedoIcon />}
        alt="Rétablir"
      />

      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
        onClick={onSetLink}
        isActive={editor.isActive("link")}
        icon={<LinkIcon />}
        alt="Ajouter un lien"
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().unsetLink().run()}
        //  disabled={!editor.isActive("link")}
        icon={<UnlinkIcon />}
        alt="Supprimer le lien"
      />

      <div className="w-px bg-gray-300 mx-1" />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        icon={<AlignLeftIcon />}
        alt="Aligner à gauche"
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        icon={<AlignCenterIcon />}
        alt="Centrer"
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        icon={<AlignRightIcon />}
        alt="Aligner à droite"
      />

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        isActive={editor.isActive({ textAlign: "justify" })}
        icon={<AlignJustifyIcon />}
        alt="Justifier"
      />
    </div>
  </div>
);
