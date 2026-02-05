"use client";

import { useState } from "react";
import { MediaObject } from "../../../../model/bloc/MediaObject";
import { FieldRenderer } from "../../../../validators/renderer/TextRenderer";

interface VideoEditorProps<T> {
  media: MediaObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  removeElement: (media: T) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  context?: string;
  isLink?: boolean;
  show_debug?: boolean;
}
export function VideoEditor<T>({ ...props }: VideoEditorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const context_medias =
    props.context === "article" ? `articles.0.images.` : `image_medias.`;
  return (
    <div
      className={
        "border rounded-lg overflow-hidden cursor-grab active:cursor-grabbing " +
        isOpen
          ? ""
          : "h-[10vh]"
      }
      draggable
      onDragStart={() => {
        props.onDragStart(props.media as MediaObject);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={() => {
        props.onDrop(props.media);
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-black">
          vidéo n° {Number(props.media.number_position_image) + 1}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0 hidden"
        }`}
      >
        <div className="p-4 border-t">
          {" "}
          <div className="mx-auto max-w-2xl space-y-6 p-6 cursor-grab active:cursor-grabbing">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Configuration du Média
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Configurez les différents champs de votre objet média
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
              <div className="w-full flex justify-end items-center">
                <div className="mb-4 flex-1">
                  <p className="text-lg font-semibold text-slate-800 mb-2">
                    vidéo n° {Number(props.media.number_position_image) + 1}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {props.isLink && (
                  <>
                    <FieldRenderer
                      label="text_titre de la vidéo"
                      fieldName={
                        context_medias +
                        `${(props.media as MediaObject).number_position_image}.text_titre`
                      }
                      model={props.media as MediaObject}
                      setField={props.onChange}
                    />
                    <FieldRenderer
                      label="Lien de la vidéo"
                      fieldName={
                        context_medias +
                        `${(props.media as MediaObject).number_position_image}.text_image_lien`
                      }
                      model={props.media as MediaObject}
                      setField={props.onChange}
                    />
                  </>
                )}
                <FieldRenderer
                  label="Image associée à la vidéo"
                  fieldName={
                    context_medias +
                    `${(props.media as MediaObject).number_position_image}.image_url`
                  }
                  model={props.media as MediaObject}
                  setField={props.onChange}
                  isVideo={true}
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
                  {JSON.stringify(props.media, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
