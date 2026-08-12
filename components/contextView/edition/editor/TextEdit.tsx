"use client";

import { Tiptap } from "./TipTapEditor";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { PictureEditor } from "../grid/image_grid/PictureEditor";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { BlocObject } from "../../../../database/model/Bloc";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import { DeleteButton } from "../../../ui/DeleteButton";

interface TextEditorProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (media: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  debug?: boolean;
  onDelete?: (bloc: BlocObject) => void;
}

export default function TextEditor({
  bloc,
  onChange,
  addElement,
  removeElement,
  onDragStart,
  onDrop,
  debug = false,
}: TextEditorProps) {
  const hasArticles = bloc.articles[0];
  const images = hasArticles.images;
  const [selectedValidatorKey, setSelectedValidatorKey] = useState<string>(
    hasArticles.text_images_position,
  );
  const availableValidators = {
    left: "Gauche",
    right: "Droite",
    top: "En haut",
  };

  const handleValidatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValidatorKey = e.target.value;
    setSelectedValidatorKey(newValidatorKey);

    onChange(
      (`blocs.` +
        bloc.bloc_position +
        `.articles.0.text_images_position`) as string,
      newValidatorKey,
    );
  };
  return (
    <section className="mx-auto w-full space-y-6 p-6 mb-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du composant "Texte avec images associées"
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez les différentes images de votre composant
        </p>
      </div>

      {/* Main Content */}
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
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
            fieldName={`blocs.` + bloc.bloc_position + ".text_titre"}
            model={bloc as BlocObject}
            setField={onChange}
          />

          <label className="input-label">
            Position des images par raport au texte
          </label>

          <select
            value={selectedValidatorKey}
            onChange={handleValidatorChange}
            className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-200 dark:bg-slate-950 dark:text-slate-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300"
          >
            {Object.entries(availableValidators).map(
              ([validatorKey, value]) => (
                <option
                  key={validatorKey}
                  value={validatorKey}
                  className="text-slate-900 dark:text-slate-50"
                >
                  {value}
                </option>
              ),
            )}
          </select>
          {selectedValidatorKey === "top" && (
            <>
              <label className="input-label">
                Réglette pour déterminer le nombre de colonnes des images : 4
                max
              </label>
              <div className="flex justify-between">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
              </div>
              <FieldRenderer
                label="Nombre de colonnes par ligne"
                fieldName={`blocs.` + bloc.bloc_position + ".number_columns"}
                model={bloc as Record<string, any>}
                setField={onChange}
              />
            </>
          )}
        </div>

        {/* Images grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {images.map((media) => (
              <PictureEditor
                key={(media as MediaObject).number_position_image}
                media={media as MediaObject}
                onChange={onChange}
                removeElement={removeElement}
                onDragStart={onDragStart}
                onDrop={onDrop}
                context="article"
                isLink={false}
                blocNumber={bloc.bloc_position}
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
        <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
          <h3 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Contenu de l'article
          </h3>
          <Tiptap
            bloc={bloc.articles[0]}
            updateComponent={onChange}
            blocNumber={bloc.bloc_position}
          />
        </div>
      </section>

      {/* Debug Panel */}
      {debug && (
        <aside className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-100">
            <span className="text-lg">🐛</span>
            Debug - Props reçues
          </h3>
          <pre className="overflow-auto text-xs text-amber-800 dark:text-amber-200">
            {JSON.stringify(bloc, null, 2)}
          </pre>
        </aside>
      )}
    </section>
  );
}
