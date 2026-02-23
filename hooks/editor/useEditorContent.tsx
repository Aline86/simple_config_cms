import { Editor, JSONContent } from "@tiptap/core";
import { useCallback } from "react";
import { ArticleObject } from "../../database/model/bloc/Article";

export const useEditorContent = (
  bloc: ArticleObject,
  updateComponent: (fieldName: string, newValue: JSONContent[]) => void,
) => {
  const handleEditorUpdate = useCallback(
    (editor: Editor) => {
      const jsonData = editor.getJSON();
      if (jsonData.content !== undefined) {
        updateComponent("text_article", jsonData.content);
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

    if (bloc.text_article !== undefined && bloc.text_article.length > 0) {
      bloc.text_article.forEach((data: JSONContent) => {
        contentData.content.push(data);
      });
    }

    return contentData;
  }, [bloc]);

  return { handleEditorUpdate, getInitialContent };
};
