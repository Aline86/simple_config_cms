"use client";

import { HeaderObject } from "../../../../database/model/bloc/Header";

import HeaderView from "../../showcase/header/HeaderView";
import HeaderEdit from "./HeaderEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";
import useUpdateUI from "../../../../hooks/updateByPath/useUpdateUI";

interface HeaderContextEditionProps {
  bloc: HeaderObject;
  onChange: (fieldName: string, newValue: unknown) => void;
}

const HeaderContextEdition: React.FC<HeaderContextEditionProps> = ({
  bloc,
  onChange,
}: HeaderContextEditionProps) => {
  const { handleRemove, handleAdd } = useUpdateUI({ bloc, onChange });

  return (
    <EditionDoubleView
      EditComponent={
        <HeaderEdit
          header={bloc}
          onChange={onChange}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      }
      ViewComponent={<HeaderView header={bloc} />}
    />
  );
};
export default HeaderContextEdition;
