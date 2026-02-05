"use client";

import { BlocObject } from "../../../../database/model/Bloc";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import { PictureEditor } from "../grid/image_grid/PictureEditor";

interface ButtonEditorProps<T> {
  button: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (button: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  isLink: boolean;
  show_debug?: boolean;
}

export default function ButtonEdit<T>({
  button,
  onChange,
  removeElement,
  onDragStart,
  onDrop,
  isLink,
  show_debug = false,
}: ButtonEditorProps<T>) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du composant "Bouton"
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez le contenu de votre composant
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <FieldRenderer
          fieldName="color_background_color"
          model={button as BlocObject}
          setField={onChange}
          label={"Couleur de fond de la carte de redirection"}
        />
        <FieldRenderer
          label="text_titre de la carte de redirection"
          fieldName={`text_titre`}
          model={button as BlocObject}
          setField={onChange}
        />
        <FieldRenderer
          label="text_description courte (texte court - 500 caractères)"
          fieldName={`text_description`}
          model={button as BlocObject}
          setField={onChange}
        />
        <div
          className={
            button.image_medias.length === 1
              ? "grid grid-cols-1 "
              : "grid grid-cols-2 gap-6"
          }
        >
          {button.image_medias.map((media) => {
            return (
              <PictureEditor
                key={(media as MediaObject).id}
                media={media as MediaObject}
                onChange={onChange}
                removeElement={removeElement}
                onDragStart={onDragStart}
                onDrop={onDrop}
                isLink={isLink}
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
            {JSON.stringify(button, null, 2)}
          </pre>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
