"use client";

import { useState, useEffect, useCallback } from "react";
import { deleteItemAndReorder } from "../../../../helpers/changeComponentPosition";
import {
  cloneFooterWithReseau,
  cloneFooterWithReseaux,
} from "../../../../helpers/footer.helper";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../helpers/media.helper";
import { updateObjectBySetter } from "../../../../lib/utils/functions";
import { FooterObject } from "../../../../model/bloc/Footer";
import { MediaObject } from "../../../../model/bloc/MediaObject";
import FooterView from "../../showcase/footer/FooterView";
import FooterEdit from "./FooterEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";

interface FooterContextEditionProps {
  bloc: FooterObject;
  onChange: (bloc: FooterObject) => void;
}

const FooterContextEdition: React.FC<FooterContextEditionProps> = ({
  bloc,
  onChange,
}: FooterContextEditionProps) => {
  const [localBloc, setLocalBloc] = useState(bloc);

  // Sync avec le parent uniquement quand l'ID change
  useEffect(() => {
    setLocalBloc(bloc);
  }, [bloc.number_id]);

  const updateMediaObject = useCallback(
    (fieldName: string, newValue: any) => {
      setLocalBloc((prev) => {
        if (!prev) return prev;
        const newObj = updateObjectBySetter(prev, fieldName, newValue);
        onChange(newObj.data);
        return newObj.data;
      });
    },
    [onChange],
  );

  const handleRemove = useCallback(
    (model: MediaObject) => {
      setLocalBloc((prev) => {
        const res = deleteItemAndReorder(
          prev.reseaux,
          model,
          "number_position_image",
        );
        const cleanReseaux = res.map((reseau, index) => {
          return cloneMediaWithPosition(reseau, index);
        });
        const updatedFooter = cloneFooterWithReseaux(prev, cleanReseaux);

        onChange(updatedFooter);
        return updatedFooter;
      });
    },
    [onChange],
  );

  const handleAdd = useCallback(() => {
    setLocalBloc((prev) => {
      const newMedia = createMedia(prev.reseaux.length, 1);
      const updatedFooter = cloneFooterWithReseau(prev, newMedia);
      onChange(updatedFooter);
      return updatedFooter;
    });
  }, [onChange]);

  return (
    <EditionDoubleView
      EditComponent={
        <FooterEdit
          footer={localBloc}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      }
      ViewComponent={<FooterView footer={localBloc} />}
    />
  );
};
export default FooterContextEdition;
