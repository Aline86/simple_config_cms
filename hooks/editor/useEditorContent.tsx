import { ArticleObject } from "@/model/bloc/Article";
import { Editor, JSONContent } from "@tiptap/core";
import { useCallback } from "react";

export const useEditorContent = (
  bloc: ArticleObject,
  updateComponent: (fieldName: string, newValue: JSONContent[]) => void,
) => {
  const handleEditorUpdate = useCallback(
    (editor: Editor) => {
      const jsonData = editor.getJSON();
      if (bloc !== undefined && jsonData.content !== undefined) {
        updateComponent("text_text_article", jsonData.content);
      }
    },
    [bloc, updateComponent],
  );

  const getInitialContent = useCallback((): JSONContent => {
    const init: JSONContent[] = [];
    const contentData: JSONContent = {
      type: "doc",
      content: init,
    };

    if (
      bloc?.text_text_article !== undefined &&
      Array.isArray(bloc.text_text_article)
    ) {
      bloc.text_text_article.forEach((data) => {
        contentData?.content?.push(data);
      });
    }

    return contentData;
  }, [bloc]);

  return { handleEditorUpdate, getInitialContent };
};
