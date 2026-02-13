"use client";

import { BlocObject } from "../../database/model/Bloc";
import { PageObject } from "../../database/model/Page";
import ComponentBloc from "./BlocComponent";

interface PageCrudProps {
  page_data: PageObject;
  show_debug?: boolean;
}

export default function PageBlocs({
  page_data,
  show_debug = false,
}: PageCrudProps) {
  return (
    <div className="p-6 space-y-6 ">
      {page_data.blocs.length > 0 &&
        page_data.blocs.map((bloc, index) => {
          return (
            <div
              key={index}
              className="grid  lg:grid-cols-1 gap-6  cursor-grab active:cursor-grabbing"
            >
              <ComponentBloc bloc={bloc} />
            </div>
          );
        })}

      {show_debug ? (
        <div className="mx-auto max-w-2xl mt-6 p-6">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold mb-2 text-slate-900">
              État global (Home component)
            </h3>
            <pre className="text-xs overflow-auto bg-slate-50 p-3 rounded">
              {JSON.stringify(page_data, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
