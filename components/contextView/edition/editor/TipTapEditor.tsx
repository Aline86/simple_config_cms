import { useEditor, EditorContent, JSONContent, Editor } from "@tiptap/react";
import { useEditorContent } from "../../../../hooks/editor/useEditorContent";
import { getEditorExtensions } from "../../../../lib/config/getEditorExtensions";
import { useLinkHandler } from "../../../../hooks/editor/useLinkHandler";
import { ArticleObject } from "../../../../database/model/bloc/Article";
import { EditorToolbar } from "./EditorToolbar";

interface TiptapProps {
  bloc: ArticleObject;
  updateComponent: (fieldName: string, newValue: JSONContent) => void;
}

export const Tiptap = ({ bloc, updateComponent }: TiptapProps) => {
  const { handleEditorUpdate } = useEditorContent(bloc, updateComponent);

  const editor = useEditor({
    immediatelyRender: false,

    editable: true,
    content: bloc.text_article,
    onCreate: ({ editor }) => handleEditorUpdate(editor),
    onUpdate: ({ editor }) =>
      updateComponent("articles.0.text_article", editor.getJSON()),
    extensions: getEditorExtensions(),
  });

  const { setLink } = useLinkHandler(editor);

  if (!editor) {
    return null;
  }

  return (
    <div className="ml-5 edition">
      <EditorToolbar editor={editor} onSetLink={setLink} />
      <EditorContent
        editor={editor}
        className="border border-gray-700 p-2 rounded-md"
      />
    </div>
  );
};
