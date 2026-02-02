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
import CarouselAutoView from "../../../showcase/carousel/automatic/CarouselAutoView";
import CarouselThumbnailsEdit from "../thumbnails/CarouselThumbnailsEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";

interface CarouselsAutoContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const CarouselsAutoContextEdition: React.FC<
  CarouselsAutoContextEditionProps
> = ({ bloc, onChange }: CarouselsAutoContextEditionProps) => {
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
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="w-full lg:w-1/2 rounded-lg border p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
        <CarouselThumbnailsEdit
          bloc={localBloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
          showWidth={false}
        />
      </div>

      <div className="flex-1 rounded-lg  p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <CarouselAutoView bloc={bloc} />
      </div>
    </div>
  );
};
export default CarouselsAutoContextEdition;
