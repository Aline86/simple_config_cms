"use client";


import { ConfigurationObject } from "../../../../database/model/Configuration";

import { DynamicValidatorDropDown } from "../../../../lib/validators/DynamicValidatorDropDown";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import DebugView from "../_commons/DebugView";

interface EditorProps {
  bloc: ConfigurationObject;
  onChange: (fieldName: string, newValue: unknown) => void;
 
  show_debug: boolean;
}

export default function ConfigurationEdit({
  bloc,
  onChange,
  show_debug = false,
}: EditorProps) {
  const defaultValidator = "color_main_color"
 

  return (
    <section className="mx-auto max-w-2xl space-y-6 p-6 mb-8">
      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configurer les éléments généraux du site (taille, couleur et police des sous titres)
        </h2>
      
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <div className="space-y-6">
          <FieldRenderer
            label="Taille de la police"
            fieldName={"number_taille"}
            model={bloc as Record<string, any>}
            setField={onChange}
          />
          <DynamicValidatorDropDown
            label="Police du texte"
            fieldKey="text_police"
            availableValidators={["text_police"]}
            model={bloc}
            onChange={onChange}
            defaultValidator={"text_police"}
          />
          <DynamicValidatorDropDown
            label="Couleur"
            fieldKey="color_main_color"
            availableValidators={["color_tailwind"]}
            model={bloc}
            onChange={onChange}
            defaultValidator={defaultValidator}
          />
        </div>
      </div>

      {/* Debug panel */}
      {show_debug ? <DebugView data={bloc} /> : <></>}
    </section>
  );
}
