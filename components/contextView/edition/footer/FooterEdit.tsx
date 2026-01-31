"use client";

import { FooterObject } from "../../../../model/bloc/Footer";
import { MediaObject } from "../../../../model/bloc/MediaObject";
import { FieldRenderer } from "../../../../validators/renderer/TextRenderer";
import { SocialMediaModal } from "../../../modals/SocialMediaModal";

interface MediaEditorProps<T> {
  footer: FooterObject;
  onChange: (fieldName: string, newValue: any) => void;
  addElement: () => void;
  removeElement: (socialMedia: MediaObject) => void;
}

export default function FooterEdit<T>({
  footer,
  onChange,
  addElement,
  removeElement,
}: MediaEditorProps<T>) {
  const debug = false;
  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du pied de page du site
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez les différents champs de votre bandeau de haut de page
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <div className="space-y-6">
          <FieldRenderer
            fieldName="text_nom_site_adresse"
            model={footer}
            setField={onChange}
            label={"Nom du site"}
          />
          <FieldRenderer
            fieldName="color_background_color"
            model={footer}
            setField={onChange}
            label={"Couleur du pied de page"}
          />
          <FieldRenderer
            fieldName="text_adresse_footer"
            model={footer}
            setField={onChange}
            label={"Adresse du site"}
          />
          <FieldRenderer
            fieldName="text_code_postal"
            model={footer}
            setField={onChange}
            label={"Code postal et Ville"}
          />
          <SocialMediaModal
            socialMedia={footer.reseaux as MediaObject[]}
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
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-200 dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-2">
            Props reçues (footerEdit)
          </h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(footer, null, 2)}
          </pre>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
