"use client";

import { useEffect, useState, useCallback } from "react";
import { HeaderObject } from "../../../../database/model/bloc/Header";
import { updateObjectBySetter } from "../../../../lib/helpers/tiptapAndSetterFunctions";
import {
  cloneHeaderWithReseau,
  cloneHeaderWithReseaux,
} from "../../../../lib/helpers/header.helper";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../lib/helpers/media.helper";
import { deleteItemAndReorder } from "../../../../lib/helpers/changeComponentPosition";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import HeaderView from "../../showcase/header/HeaderView";
import HeaderEdit from "./HeaderEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";

interface HeaderContextEditionProps {
  bloc: HeaderObject;
  onChange: (fieldName: string, newValue: unknown) => void;
}

const HeaderContextEdition: React.FC<HeaderContextEditionProps> = ({
  bloc,
  onChange,
}: HeaderContextEditionProps) => {
  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!bloc) return bloc;
    updateObjectBySetter(bloc, fieldName, newValue);
  };

  const handleRemove = (model: MediaObject) => {
    const res = deleteItemAndReorder(
      bloc.reseaux,
      model,
      "number_position_image",
    );
    const cleanReseaux = res.map((reseau, index) => {
      return cloneMediaWithPosition(reseau, index);
    });
    const updatedFooter = cloneHeaderWithReseaux(bloc, cleanReseaux);

    return updatedFooter;
  };

  const handleAdd = () => {
    const newMedia = createMedia(bloc.reseaux.length, 1);
    bloc.addReseau(newMedia);
  };

  return (
    <EditionDoubleView
      EditComponent={
        <HeaderEdit
          header={bloc}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      }
      ViewComponent={<HeaderView header={bloc} />}
    />
  );
};
export default HeaderContextEdition;
