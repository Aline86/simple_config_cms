"use client";

import { BlocObject } from "../../../../database/model/Bloc";
import useUpdateUI from "../../../../hooks/editor/useUpdateUI";
import EditionDoubleView from "../../../ui/EditionDoubleView";
import ButtonEdit from "./ButtonEdit";
import ButtonView from "../../showcase/button/ButtonView";

interface EditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const Edition: React.FC<EditionProps> = ({ bloc, onChange }) => {
  const {
    dragged,
    localBloc,
    handleRemove,
    handleAdd,
    updateField,
    onDrop,
    onDragStart,
  } = useUpdateUI({ bloc, onChange });

  return (
    <EditionDoubleView
      EditComponent={
        <ButtonEdit
          button={localBloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      }
      ViewComponent={<ButtonView bloc={localBloc} />}
    />
  );
};

export default Edition;
