import { BlocObject } from "../../../../database/model/Bloc";
import { FieldRenderer } from "../../../../lib/validators/renderer/TextRenderer";
import HeadingMediaComponent from "./HeadingMediaComponent";

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
      <HeadingMediaComponent />

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-200 dark:bg-slate-950">
        <FieldRenderer
          label="Titre de la carte de redirection"
          fieldName={`blocs.` + bloc.bloc_position + `.` + `text_titre`}
          model={bloc}
          setField={onChange}
        />
        <FieldRenderer
          label="text_description courte (texte court - 500 caractères)"
          fieldName={`blocs.` + bloc.bloc_position + `.` + `text_description`}
          model={bloc}
          setField={onChange}
        />
      </div>
    </>
  );
}
