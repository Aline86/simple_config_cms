"use client";

import { useEffect, useState, useCallback } from "react";
import { HeaderObject } from "../../../../model/bloc/Header";
import { updateObjectBySetter } from "../../../../lib/utils/functions";
import {
  cloneHeaderWithReseau,
  cloneHeaderWithReseaux,
} from "../../../../helpers/header.helper";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../helpers/media.helper";
import { deleteItemAndReorder } from "../../../../helpers/changeComponentPosition";
import { MediaObject } from "../../../../model/bloc/MediaObject";
import HeaderView from "../../showcase/header/HeaderView";
import HeaderEdit from "./HeaderEdit";

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
    <div className="flex mt-20 flex-col lg:flex-row gap-6">
      <div className="flex-1 rounded-lg  p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
        <HeaderEdit
          header={localBloc}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      </div>

      <div className="flex-1  rounded-lg border  p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <HeaderView header={localBloc} />
      </div>
    </div>
  );
};
export default HeaderContextEdition;
