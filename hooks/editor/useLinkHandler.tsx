// ================================================================================
// 8. hooks/useLinkHandler.ts
// ============================================
import { useCallback } from "react";
import { Editor } from "@tiptap/react";

export const useLinkHandler = (editor: Editor | null) => {
  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window?.prompt("URL", previousUrl);

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("Une erreur inconnue s'est produite.");
      }
    }
  }, [editor]);

  return { setLink };
};
