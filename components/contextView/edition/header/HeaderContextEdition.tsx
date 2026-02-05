"use client";

import { useEffect, useState, useCallback } from "react";
import { HeaderObject } from "../../../../database/model/bloc/Header";
import { updateObjectBySetter } from "../../../../lib/helpers/functions";
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
  onChange: (bloc: HeaderObject) => void;
}

const HeaderContextEdition: React.FC<HeaderContextEditionProps> = ({
  bloc,
  onChange,
}: HeaderContextEditionProps) => {
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
        const updatedHeader = cloneHeaderWithReseaux(prev, cleanReseaux);

        onChange(updatedHeader);
        return updatedHeader;
      });
    },
    [onChange],
  );

  const handleAdd = useCallback(() => {
    setLocalBloc((prev) => {
      const newMedia = createMedia(prev.reseaux.length, 1);
      const updatedHeader = cloneHeaderWithReseau(prev, newMedia);
      onChange(updatedHeader);
      return updatedHeader;
    });
  }, [onChange]);

  return (
    <EditionDoubleView
      EditComponent={
        <HeaderEdit
          header={localBloc}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      }
      ViewComponent={<HeaderView header={localBloc} />}
    />
  );
};
export default HeaderContextEdition;
