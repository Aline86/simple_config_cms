"use client";

import { HeaderObject } from "@/model/bloc/Header";
import { MediaObject } from "@/model/bloc/MediaObject";
import { DynamicValidatorDropDown } from "@/validators/DynamicValidatorDropDown";
import { FieldRenderer } from "@/validators/renderer/TextRenderer";
import { useEffect } from "react";

import { MediaEditor } from "../media/Media";
import { Modal } from "@/components/modals/Modal";
import { SocialMediaModal } from "@/components/modals/SocialMediaModal";

interface MediaEditorProps<T> {
  header: HeaderObject;
  onChange: (fieldName: string, newValue: any) => void;
  addElement: () => void;
  removeElement: (socialMedia: T) => void;
}

export default function HeaderEdit<T>({
  header,
  onChange,
  addElement,
  removeElement,
}: MediaEditorProps<T>) {
  const debug = false;
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration de l'en-tête du site
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez les différents champs de votre bandeau de haut de page
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="space-y-6">
          <FieldRenderer
            fieldName="text_nom_site"
            model={header}
            setField={onChange}
            label={"Nom du site"}
          />
          <FieldRenderer
            fieldName="image_logo.image_image_url"
            model={
              header.image_logo !== null ? header.image_logo : new MediaObject()
            }
            setField={onChange}
            label={"Logo du site"}
          />
          <FieldRenderer
            fieldName="image_favicon.image_image_url"
            model={
              header.image_logo !== null ? header.image_logo : new MediaObject()
            }
            setField={onChange}
            label={"Favicon du site"}
          />
          <DynamicValidatorDropDown
            label="Image"
            fieldKey="text_background_url"
            availableValidators={[
              "image_image_url",
              "text_empty",
              "color_background_color",
            ]}
            model={header}
            onChange={onChange}
          />

          <SocialMediaModal
            socialMedia={header.image_reseaux as T[]}
            onChange={onChange}
            addElement={addElement}
            removeElement={removeElement}
          />

          <button className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-8 py-2 text-sm font-medium text-slate-50 ring-offset-white transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:ring-offset-slate-950 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300">
            Sauvegarder
          </button>
        </div>
      </div>

      {/* Debug panel */}
      {debug ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-2">
            Props reçues (HeaderEdit)
          </h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(header, null, 2)}
          </pre>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
