"use client";

import { BlocObject } from "@/model/Bloc";
import { MediaObject } from "@/model/bloc/MediaObject";
import { FieldRenderer } from "@/validators/renderer/TextRenderer";
import { PictureEditor } from "../../edition/grid/picturesLink/PictureEditor";
import { Tiptap } from "./TipTapEditor";
import { PlusIcon } from "lucide-react";

interface TextEditorProps {
  text: BlocObject;
  onChange: (fieldName: string, newValue: any) => void;
  addElement: () => void;
  removeElement: (media: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  debug?: boolean;
}

export default function TextEditor({
  text,
  onChange,
  addElement,
  removeElement,
  onDragStart,
  onDrop,
  debug = false,
}: TextEditorProps) {
  // Vérification de sécurité
  const hasArticles = text?.articles?.[0];
  const images = hasArticles?.images || [];

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header Section */}
      <header className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du composant "Texte avec images associées"
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez les différentes images de votre composant
        </p>
      </header>

      {/* Main Content */}
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={addElement}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:bg-slate-700 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            aria-label="Ajouter une image"
          >
            <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        {/* Configuration Fields */}
        <div className="space-y-4 mb-6">
          <FieldRenderer
            label="Titre du bloc d'images avec lien de redirection"
            fieldName="text_titre"
            model={text as Record<string, any>}
            setField={onChange}
          />

          <FieldRenderer
            label="Nombre de colonnes par ligne"
            fieldName="number_columns"
            model={text as Record<string, any>}
            setField={onChange}
          />
        </div>

        {/* Images Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {images.map((media) => (
              <PictureEditor
                key={(media as MediaObject).number_id}
                media={media as MediaObject}
                onChange={onChange}
                removeElement={removeElement}
                onDragStart={onDragStart}
                onDrop={onDrop}
                context="article"
              />
            ))}
          </div>
        ) : (
          <div className="mb-6 rounded-lg border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Aucune image ajoutée. Cliquez sur le bouton + pour commencer.
            </p>
          </div>
        )}

        {/* Rich Text Editor */}
        {hasArticles && (
          <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
            <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
              Contenu de l'article
            </h3>
            <Tiptap bloc={text.articles[0]} updateComponent={onChange} />
          </div>
        )}
      </section>

      {/* Debug Panel */}
      {debug && (
        <aside className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-100">
            <span className="text-lg">🐛</span>
            Debug - Props reçues
          </h3>
          <pre className="overflow-auto text-xs text-amber-800 dark:text-amber-200">
            {JSON.stringify(text, null, 2)}
          </pre>
        </aside>
      )}
    </div>
  );
}
