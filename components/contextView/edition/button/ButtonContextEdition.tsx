"use client";

import { BlocObject } from "../../../../database/model/Bloc";
import useUpdateUI from "../../../../hooks/editor/useUpdateUI";
import EditionDoubleView from "../../../ui/EditionDoubleView";
import ButtonEdit from "./ButtonEdit";
import ButtonView from "../../showcase/button/ButtonView";

interface EditionProps {
  bloc: BlocObject;
  onChange: (fieldName: string, value: unknown) => void;
}

const Edition: React.FC<EditionProps> = ({ bloc, onChange }) => {
  const { handleRemove, handleAdd, onDrop, onDragStart } = useUpdateUI({
    bloc,
    onChange,
  });

  return (
    <EditionDoubleView
      EditComponent={
        <ButtonEdit
          button={bloc}
          onChange={onChange}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      }
      ViewComponent={<ButtonView bloc={bloc} />}
    />
  );
};

export default Edition;
