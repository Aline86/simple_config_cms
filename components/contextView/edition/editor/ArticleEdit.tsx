"use client";

import { BlocObject } from "@/model/Bloc";
import { ArticleObject } from "@/model/bloc/Article";
import { MediaObject } from "@/model/bloc/MediaObject";
import { FieldRenderer } from "@/validators/renderer/TextRenderer";
import { useState } from "react";
import { PictureEditor } from "../grid/picturesLink/PictureEditor";
import { Tiptap } from "./TipTapEditor";

interface ArticleEditorProps<T> {
  article: ArticleObject;
  onChange: (fieldName: string, newValue: any) => void;
  addElement: () => void;
  removeElement: (media: T) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
}
export function ArticleEditor<T>({
  article,
  onChange,
  addElement,
  removeElement,
  onDragStart,
  onDrop,
}: ArticleEditorProps<T>) {
  const debug = false;
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
          label="Titre de l'article"
          fieldName={`text_text_article`}
          model={article as Record<string, any>}
          setField={onChange}
        />
        <FieldRenderer
          label="Nombre de colonnes par ligne"
          fieldName={`number_text_width`}
          model={article as Record<string, any>}
          setField={onChange}
        />
        <div className="grid grid-cols-2 gap-6">
          {article.images.map((media) => {
            return (
              <PictureEditor
                key={(media as MediaObject).number_id}
                media={media as MediaObject}
                onChange={onChange}
                removeElement={removeElement}
                onDragStart={onDragStart}
                onDrop={onDrop}
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
            {JSON.stringify(article, null, 2)}
          </pre>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
