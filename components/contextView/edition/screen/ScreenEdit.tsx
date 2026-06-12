"use client";

import { BlocObject } from "../../../../database/model/Bloc";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { EditorProps } from "../../../../lib/helpers/globabProps";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import { PictureEditor } from "../grid/image_grid/PictureEditor";

export default function ScreenEdit({
  bloc,
  onChange,

  removeElement,
  onDragStart,
  onDrop,

  show_debug = false,
}: EditorProps) {
  return (
    <section className="mx-auto w-full min-w-[44vw] space-y-6 p-6 mb-8">
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
          label="Titre de la carte de redirection"
          fieldName={`blocs.` + bloc.bloc_position + `.` + `text_titre`}
          model={bloc as BlocObject}
          setField={onChange}
        />
        <FieldRenderer
          label="text_description courte (texte court - 500 caractères)"
          fieldName={`blocs.` + bloc.bloc_position + `.` + `text_description`}
          model={bloc as BlocObject}
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
                blocNumber={bloc.bloc_position}
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
    </section>
  );
}
