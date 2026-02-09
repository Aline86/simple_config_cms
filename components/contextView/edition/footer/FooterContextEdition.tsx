"use client";

import { useState, useEffect, useCallback } from "react";
import { deleteItemAndReorder } from "../../../../lib/helpers/changeComponentPosition";
import {
  cloneFooterWithReseau,
  cloneFooterWithReseaux,
} from "../../../../lib/helpers/footer.helper";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../lib/helpers/media.helper";
import { updateObjectBySetter } from "../../../../lib/helpers/tiptapAndSetterFunctions";
import { FooterObject } from "../../../../database/model/bloc/Footer";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import FooterView from "../../showcase/footer/FooterView";
import FooterEdit from "./FooterEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";

interface FooterContextEditionProps {
  bloc: FooterObject;
  onChange: (fieldName: string, newValue: unknown) => void;
}

const FooterContextEdition: React.FC<FooterContextEditionProps> = ({
  bloc,
  onChange,
}: FooterContextEditionProps) => {
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
    const updatedFooter = cloneFooterWithReseaux(bloc, cleanReseaux);

    return updatedFooter;
  };

  const handleAdd = () => {
    const newMedia = createMedia(bloc.reseaux.length, 1);
    bloc.addReseau(newMedia);
  };

  return (
    <EditionDoubleView
      EditComponent={
        <FooterEdit
          footer={bloc}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      }
      ViewComponent={<FooterView footer={bloc} />}
    />
  );
};
export default FooterContextEdition;
