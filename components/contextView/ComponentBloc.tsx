"use client";

import {
  blocksFrontToRender,
  blocksToRender,
} from "../../lib/config/componentsView";
import { BlocObject } from "../../database/model/Bloc";
import useUpdateUI from "../../hooks/updateByPath/useUpdateUI";
import EditionDoubleView from "../ui/EditionDoubleView";
import { MediaObject } from "../../database/model/bloc/MediaObject";
import { DeleteButton } from "../ui/DeleteButton";
import { HeaderObject } from "../../database/model/bloc/Header";
import { FooterObject } from "../../database/model/bloc/Footer";

interface PageCrudProps {
  bloc: BlocObject | HeaderObject | FooterObject;
  onDelete?: (bloc: BlocObject) => void;
  onChange: (fieldName: string, value: unknown) => void;
}
interface EditorProps {
  bloc: BlocObject | HeaderObject | FooterObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (button: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  isLink: boolean;
  show_debug?: boolean;
}

export default function ComponentBloc({
  bloc,
  onChange,
  onDelete,
}: PageCrudProps) {
  const is_custom = blocksToRender[bloc.type as string].is_custom;
  const ComponentBackend = blocksToRender[bloc.type][
    bloc.text_nom_bloc
  ] as React.FC<EditorProps>;
  const ComponentFrontend = blocksFrontToRender[bloc.type][bloc.text_nom_bloc];
  const { handleRemove, handleAdd, onDrop, onDragStart } = useUpdateUI({
    bloc,
    onChange,
  });

  return (
    <section className="flex flex-col ">
      {bloc instanceof BlocObject && (
        <div className="flex justify-end w-[45%]">
          <DeleteButton bloc={bloc} onDelete={onDelete} />
        </div>
      )}

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
          ViewComponent={<ComponentFrontend bloc={bloc} editing={true} />}
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
    </section>
  );
}
