"use client";

import { BlocObject } from "../../../../model/Bloc";
import ButtonView from "../../showcase/button/ButtonView";
import ButtonEdit from "./ButtonEdit";
import useUpdateUI from "../../../../hooks/editor/useUpdateUI";

interface ButtonContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const ButtonContextEdition: React.FC<ButtonContextEditionProps> = ({
  bloc,
  onChange,
}: ButtonContextEditionProps) => {
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
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 rounded-lg  p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
        <ButtonEdit
          button={localBloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      </div>

      <div className="flex-1 rounded-lg  p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <ButtonView bloc={bloc} />
      </div>
    </div>
  );
};
export default ButtonContextEdition;
