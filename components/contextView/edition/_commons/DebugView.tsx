import { BlocObject } from "../../../../database/model/Bloc";
import { FooterObject } from "../../../../database/model/bloc/Footer";
import { HeaderObject } from "../../../../database/model/bloc/Header";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import { PageObject } from "../../../../database/model/Page";

export type Props = {
  data: BlocObject | PageObject | HeaderObject | FooterObject | MediaObject;
};

export default function DebugView({ data }: Props) {
  return (
    <div className="mx-auto max-w-2xl mt-6 p-6">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold mb-2 text-slate-900">
          État global (Home component)
        </h3>
        <pre className="text-xs overflow-auto bg-slate-50 p-3 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
