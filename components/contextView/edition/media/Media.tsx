"use client";

import { MediaObject } from "../../../../model/bloc/MediaObject";
import { FieldRenderer } from "../../../../validators/renderer/TextRenderer";

interface MediaEditorProps<T> {
  socialMedia: MediaObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  removeElement: (socialMedia: T) => void;
  isLink?: boolean;
  show_debug?: boolean;
}
export function MediaEditor<T>({ ...props }: MediaEditorProps<T>) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du Média
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez les différents champs de votre objet média
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <div
          className="w-full flex justify-end items-center"
          onClick={() => props.removeElement(props.socialMedia as T)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-red-600 hover:text-red-800 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="space-y-6">
          <FieldRenderer
            label="Nom du réseau social"
            fieldName={`reseaux.${(props.socialMedia as MediaObject).number_position_image}.text_titre`}
            model={props.socialMedia as MediaObject}
            setField={props.onChange}
          />
          <FieldRenderer
            label="Lien du réseau social"
            fieldName={`reseaux.${(props.socialMedia as MediaObject).number_position_image}.text_image_lien`}
            model={props.socialMedia as MediaObject}
            setField={props.onChange}
          />
          <FieldRenderer
            label="Image associée au réseau social"
            fieldName={`reseaux.${(props.socialMedia as MediaObject).number_position_image}.image_url`}
            model={props.socialMedia as MediaObject}
            setField={props.onChange}
          />

          <button className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-8 py-2 text-sm font-medium text-slate-50 ring-offset-white transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:ring-offset-slate-950 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300">
            Sauvegarder
          </button>
        </div>
      </div>

      {/* Debug panel */}
      {props.show_debug && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-200 dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-2">
            Props reçues (MediaEditor)
          </h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(props.socialMedia, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
