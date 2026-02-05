"use client";

import { BlocObject } from "../../../../model/Bloc";
import { MediaObject } from "../../../../model/bloc/MediaObject";
import { FieldRenderer } from "../../../../validators/renderer/TextRenderer";
import { PictureEditor } from "../grid/image_grid/PictureEditor";

interface ButtonEditorProps<T> {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: any) => void;
  addElement: () => void;
  removeElement: (button: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  isLink: boolean;
  show_debug?: boolean;
}

export default function ButtonEdit<T>({
  bloc,
  onChange,

  removeElement,
  onDragStart,
  onDrop,
  isLink,
  show_debug = false,
}: ButtonEditorProps<T>) {
  return (
    <div className="mx-auto min-w-2xl max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du composant "Ecran"
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez le contenu de votre composant
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <FieldRenderer
          label="text_titre de la carte de redirection"
          fieldName={`text_titre`}
          model={bloc as Record<string, any>}
          setField={onChange}
        />
        <FieldRenderer
          label="text_description courte (texte court - 500 caractères)"
          fieldName={`text_description`}
          model={bloc as Record<string, any>}
          setField={onChange}
        />
        <div
          className={
            bloc.image_medias.length === 1
              ? "grid grid-cols-1 "
              : "grid grid-cols-2 gap-6"
          }
        >
          {bloc.image_medias.map((media) => {
            return (
              <PictureEditor
                key={(media as MediaObject).id}
                media={media as MediaObject}
                onChange={onChange}
                removeElement={removeElement}
                onDragStart={onDragStart}
                onDrop={onDrop}
                isLink={false}
              />
            );
          })}
        </div>
      </div>

      {/* Debug panel */}
      {show_debug ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-200 dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-2">
            Props reçues (HeaderEdit)
          </h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(bloc, null, 2)}
          </pre>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
