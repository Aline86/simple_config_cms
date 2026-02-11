"use client";

import {
  blocksFrontToRender,
  blocksToRender,
} from "../../lib/config/componentsView";
import { BlocObject } from "../../database/model/Bloc";
import useUpdateUI from "../../hooks/updateByPath/useUpdateUI";
import EditionDoubleView from "../ui/EditionDoubleView";
import ScreenView from "./showcase/screen/ScreenView";
import { MediaObject } from "../../database/model/bloc/MediaObject";

interface PageCrudProps {
  bloc: BlocObject;
  onDelete: (bloc: BlocObject) => void;
  onChange: (fieldName: string, value: unknown) => void;
}
interface EditorProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: any) => void;
  addElement: () => void;
  removeElement: (button: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  isLink: boolean;
  show_debug?: boolean;
}

export default function ComponentBloc({ bloc, onChange }: PageCrudProps) {
  const is_custom = blocksToRender[bloc.type as string].is_custom;
  const ComponentBackend = blocksToRender[bloc.type][
    bloc.text_nom_bloc
  ] as React.FC<EditorProps>;
  if (!ComponentBackend) return null;
  const ComponentFrontend = blocksFrontToRender[bloc.type][bloc.text_nom_bloc];
  if (!ComponentFrontend) return null;
  const { handleRemove, handleAdd, onDrop, onDragStart } = useUpdateUI({
    bloc,
    onChange,
  });

  return (
    <main className="flex flex-col ">
      {!is_custom ? (
        <EditionDoubleView
          EditComponent={
            <ComponentBackend
              bloc={bloc}
              onChange={onChange}
              addElement={handleAdd}
              removeElement={handleRemove}
              onDrop={onDrop}
              onDragStart={onDragStart}
              isLink={true}
            />
          }
          ViewComponent={<ComponentFrontend bloc={bloc} />}
        />
      ) : (
        <ComponentBackend
          bloc={bloc}
          onChange={onChange}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      )}
    </main>
  );
}
