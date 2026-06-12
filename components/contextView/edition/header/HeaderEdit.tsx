"use client";

import { HeaderObject } from "../../../../database/model/bloc/Header";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { DynamicValidatorDropDown } from "../../../../lib/validators/DynamicValidatorDropDown";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import { SocialMediaModal } from "../../../modals/SocialMediaModal";
import { isValidColor } from "../../showcase/header/HeaderView";

interface EditorProps {
  bloc: HeaderObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (socialMedia: MediaObject) => void;
  show_debug: boolean;
}

export default function HeaderEdit<T>({
  bloc,
  onChange,
  addElement,
  removeElement,
  show_debug = false,
}: EditorProps) {
  const defaultValidator =
    bloc.text_background_url === "#000000"
      ? "text_empty"
      : isValidColor(bloc.text_background_url)
        ? "color_background_color"
        : "image_url";

  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6 mb-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration de l'en-tête du site
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez les différents champs de votre bandeau de haut de page
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <div className="space-y-6">
          <FieldRenderer
            fieldName="text_nom_site"
            model={bloc}
            setField={onChange}
            label={"Nom du site"}
          />
          <FieldRenderer
            fieldName="logo.image_url"
            model={bloc.logo !== null ? bloc.logo : new MediaObject()}
            setField={onChange}
            label={"Logo du site"}
          />
          <FieldRenderer
            fieldName="favicon.image_url"
            model={bloc.favicon !== null ? bloc.favicon : new MediaObject()}
            setField={onChange}
            label={"Favicon du site"}
          />
          <DynamicValidatorDropDown
            label="Image"
            fieldKey="text_background_url"
            availableValidators={[
              "image_url",
              "text_empty",
              "color_background_color",
            ]}
            model={bloc}
            onChange={onChange}
            defaultValidator={defaultValidator}
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
