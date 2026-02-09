"use client";

import { BlocObject } from "../../../../../database/model/Bloc";
import { MediaObject } from "../../../../../database/model/bloc/MediaObject";
import { FieldRenderer } from "../../../../../lib/validators/renderer/TextRenderer";
import { PictureEditor } from "../../grid/image_grid/PictureEditor";

interface CarouselThumbnailsProps<T> {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (bloc: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  isLink?: boolean;
  showWidth?: boolean;
  debug?: boolean;
}

export default function CarouselThumbnailsEdit<T>({
  bloc,
  onChange,
  addElement,
  removeElement,
  onDragStart,
  onDrop,
  isLink,
  showWidth,
  debug = false,
}: CarouselThumbnailsProps<T>) {
  return (
    <section className="mx-auto w-full min-w-[43vw] space-y-6 p-6">
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
          aria-label="Ajouter un élément"
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
          label="text_titre du bloc carousel d'images"
          fieldName={`blocs.` + bloc.bloc_position + `.text_titre`}
          model={bloc as BlocObject}
          setField={onChange}
        />
        {showWidth && (
          <FieldRenderer
            label="Largeur de l'image sur grand écran"
            fieldName={`blocs.` + bloc.bloc_position + `.number_width`}
            model={bloc as BlocObject}
            setField={onChange}
          />
        )}
        <FieldRenderer
          label="Hauteur de l'image sur grand écran"
          fieldName={`number_height`}
          model={bloc as BlocObject}
          setField={onChange}
        />
        <div className="grid grid-cols-2 gap-6">
          {bloc.image_medias.map((media) => {
            return (
              <PictureEditor
                key={(media as MediaObject).id}
                media={media as MediaObject}
                onChange={onChange}
                removeElement={removeElement}
                onDragStart={onDragStart}
                onDrop={onDrop}
                isLink={isLink}
                blocNumber={bloc.bloc_position}
              />
            );
          })}
        </div>
      </div>

      {/* Debug panel */}
      {debug ? (
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
