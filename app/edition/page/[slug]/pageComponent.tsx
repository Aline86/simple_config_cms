"use client";

import { useEffect } from "react";
import ComponentBloc from "../../../../components/contextView/ComponentBloc";
import { Accordion } from "../../../../components/ui/Accordeon";
import { BlocObject } from "../../../../database/model/Bloc";
import { PageObject } from "../../../../database/model/Page";

interface PageCrudProps {
  page_data: PageObject;
  onDelete: (page: BlocObject) => void;
  updateBloc: (fieldName: string, value: unknown) => void;
  onAdd?: () => void;
  onDragStart: (page: BlocObject) => void;
  onDrop: (page: BlocObject) => void;
  draggableEnabled: boolean;
  show_debug?: boolean;
}

export default function PageBlocs({
  page_data,
  onDelete,
  updateBloc,
  onDragStart,
  onDrop,
  draggableEnabled,
  show_debug = false,
}: PageCrudProps) {
  useEffect(() => {}, [draggableEnabled]);

  return (
    <div className="p-6  space-y-6 ">
      {page_data.blocs.length > 0 &&
        page_data.blocs.map((bloc, index) => {
          bloc = bloc.set_mode("edition");
          const num = Number(index) + 1;
          const sub_title =
            bloc.type !== bloc.text_nom_bloc.toUpperCase()
              ? bloc.text_nom_bloc.toUpperCase()
              : "";
          return (
            <div
              key={bloc.id}
              draggable={draggableEnabled}
              onDragStart={() => {
                onDragStart(bloc);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={() => {
                onDrop(bloc);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <Accordion
                children={
                  <ComponentBloc
                    bloc={bloc}
                    onDelete={onDelete}
                    onChange={updateBloc}
                  />
                }
                header={" Bloc n° : " + num + " " + bloc.type + " " + sub_title}
              />
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
