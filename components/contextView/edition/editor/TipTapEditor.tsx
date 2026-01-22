import { useEditor, EditorContent, JSONContent, Editor } from "@tiptap/react";
import { useEditorContent } from "@/hooks/editor/useEditorContent";
import { ArticleObject } from "@/model/bloc/Article";
import { getEditorExtensions } from "@/config/getEditorExtensions";
import { EditorToolbar } from "./EditorToolbar";
import { useLinkHandler } from "@/hooks/editor/useLinkHandler";

interface TiptapProps {
  bloc: ArticleObject;
  updateComponent: (fieldName: string, newValue: JSONContent) => void;
}

export const Tiptap = ({ bloc, updateComponent }: TiptapProps) => {
  const { handleEditorUpdate, getInitialContent } = useEditorContent(
    bloc,
    updateComponent,
  );

  const editor = useEditor({
    immediatelyRender: false,
    editable: true,
    content: getInitialContent(),
    onCreate: ({ editor }) => handleEditorUpdate(editor),
    onUpdate: ({ editor }) =>
      updateComponent("articles.0.text_text_article", editor.getJSON()),
    extensions: getEditorExtensions(),
  });

  const { setLink } = useLinkHandler(editor);

  if (!editor) {
    return null;
  }

  return (
    <div className="ml-5">
      <EditorToolbar editor={editor} onSetLink={setLink} />
      <EditorContent
        editor={editor}
        className="border border-gray-300 rounded-md"
      />
    </div>
  );
};
