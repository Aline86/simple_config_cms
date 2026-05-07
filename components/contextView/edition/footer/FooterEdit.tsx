"use client";

import { FooterObject } from "../../../../database/model/bloc/Footer";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import { SocialMediaModal } from "../../../modals/SocialMediaModal";

interface EditorProps<T> {
  bloc: FooterObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (socialMedia: MediaObject) => void;
  show_debug?: boolean;
}

export default function FooterEdit<T>({
  bloc,
  onChange,
  addElement,
  removeElement,
  show_debug = false,
}: EditorProps<T>) {
  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6 mb-8">
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
            model={bloc}
            setField={onChange}
            label={"Nom du site"}
          />
          <FieldRenderer
            fieldName="color_background_color"
            model={bloc}
            setField={onChange}
            label={"Couleur du pied de page"}
          />
          <FieldRenderer
            fieldName="text_adresse_footer"
            model={bloc}
            setField={onChange}
            label={"Adresse du site"}
          />
          <FieldRenderer
            fieldName="text_code_postal"
            model={bloc}
            setField={onChange}
            label={"Code postal et Ville"}
          />
          <SocialMediaModal
            socialMedia={bloc.reseaux as MediaObject[]}
            onChange={onChange}
            addElement={addElement}
            removeElement={removeElement}
          />
        </div>
      </div>

      {/* Debug panel */}
      {show_debug ? (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-200 dark:bg-slate-900">
          <h3 className="text-sm font-semibold mb-2">
            Props reçues (footerEdit)
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
