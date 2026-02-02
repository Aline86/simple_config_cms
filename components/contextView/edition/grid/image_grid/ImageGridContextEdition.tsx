"use client";

import { useCallback, useEffect, useState } from "react";
import { cloneBlocWithMedias } from "../../../../../helpers/bloc.helper";
import { reorderArray } from "../../../../../helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../../helpers/media.helper";
import { updateObjectBySetter } from "../../../../../lib/utils/functions";
import { BlocObject } from "../../../../../model/Bloc";
import { MediaObject } from "../../../../../model/bloc/MediaObject";
import PicturesgridView from "../../../showcase/grid/picturesView/PicturesGridView";
import PicturesLinkEdit from "../image_group/PicturesLinkEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";

interface ImageGridContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const ImageGridContextEdition: React.FC<ImageGridContextEditionProps> = ({
  bloc,
  onChange,
}: ImageGridContextEditionProps) => {
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
        <PicturesLinkEdit
          images_group={localBloc}
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
        <PicturesgridView bloc={bloc} />
      </div>
    </div>
  );
};
export default ImageGridContextEdition;
