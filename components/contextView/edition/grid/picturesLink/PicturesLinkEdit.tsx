"use client";

import { MediaObject } from "@/model/bloc/MediaObject";
import { BlocObject } from "@/model/Bloc";
import { MediaEditor } from "../../media/Media";
import { PictureEditor } from "./PictureEditor";
import { FieldRenderer } from "@/validators/renderer/TextRenderer";

interface PicturesLinkEditorProps<T> {
  images_group: BlocObject;
  onChange: (fieldName: string, newValue: any) => void;
  addElement: () => void;
  removeElement: (images_group: T) => void;
}

export default function PicturesLinkEdit<T>({
  images_group,
  onChange,
  addElement,
  removeElement,
}: PicturesLinkEditorProps<T>) {
  const debug = true;
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du composant "Groupe d'images"
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez les différentes images de votre composant
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <button
          onClick={addElement}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <FieldRenderer
          label="Titre du bloc d'images avec lien de redirection"
          fieldName={`text_titre`}
          model={images_group as Record<string, any>}
          setField={onChange}
        />
        <FieldRenderer
          label="Nombre de colonnes par ligne"
          fieldName={`number_columns`}
          model={images_group as Record<string, any>}
          setField={onChange}
        />
        <div className="grid grid-cols-2 gap-6">
          {images_group.image_medias.map((media) => {
            return (
              <PictureEditor
                key={(media as MediaObject).number_id}
                imageGroup={media as MediaObject}
                onChange={onChange}
                removeElement={removeElement}
              />
            );
          })}
        </div>
      </div>

      {/* Debug panel */}
      {debug ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-2">
            Props reçues (HeaderEdit)
          </h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(images_group, null, 2)}
          </pre>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
