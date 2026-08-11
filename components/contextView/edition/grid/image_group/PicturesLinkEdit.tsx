"use client";

import { EditorProps } from "../../../../../lib/helpers/globabProps";
import { FieldRenderer } from "../../../../../lib/validators/renderer/TextRenderer";
import DebugView from "../../_commons/DebugView";
import { PictureEditor } from "../image_grid/PictureEditor";

export default function PicturesLinkEdit({
  bloc,
  onChange,
  addElement,
  removeElement,
  onDragStart,
  onDrop,

  show_debug = false,
}: EditorProps) {
  const isLink = bloc.text_nom_bloc === "grid" ? false : true;
  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6 mb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du composant "Groupe d'images"
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez les différentes images de votre composant
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <button
          aria-label="AJouter un élément"
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
          fieldName={`blocs.${bloc.bloc_position}.text_titre`}
          model={bloc}
          setField={onChange}
        />
        <FieldRenderer
          label="Nombre de colonnes par ligne"
          fieldName={`blocs.${bloc.bloc_position}.number_columns`}
          model={bloc}
          setField={onChange}
        />
        <FieldRenderer
          label="Espacement entre les images"
          fieldName={`blocs.${bloc.bloc_position}.number_gap`}
          model={bloc}
          setField={onChange}
        />
        <div className="grid grid-cols-2 gap-6">
          {bloc.image_medias.map((media) => {
            return (
              <PictureEditor
                key={media.number_position_image}
                media={media}
                onChange={onChange}
                removeElement={removeElement}
                onDragStart={onDragStart}
                onDrop={onDrop}
                blocNumber={bloc.bloc_position}
                isLink={isLink}
              />
            );
          })}
        </div>
      </div>

      {/* Debug panel */}
      {show_debug ? <DebugView data={bloc} /> : <></>}
    </section>
  );
}
