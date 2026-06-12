import { BlocObject } from "../../../../database/model/Bloc";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";

export interface EditorProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  name: string;
}

export default function HeadingComponent({
  bloc,
  onChange,
  name,
}: EditorProps) {
  return (
    <>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Configuration du composant "Ecran"
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configurez le contenu de votre composant {name}
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <FieldRenderer
          label="Titre de la carte de redirection"
          fieldName={`blocs.` + bloc.bloc_position + `.` + `text_titre`}
          model={bloc as BlocObject}
          setField={onChange}
        />
        <FieldRenderer
          label="text_description courte (texte court - 500 caractères)"
          fieldName={`blocs.` + bloc.bloc_position + `.` + `text_description`}
          model={bloc as BlocObject}
          setField={onChange}
        />
      </div>
    </>
  );
}
