"use client";

import { BlocObject } from "../../../../../model/Bloc";
import CarouselThumbnailsView from "../../../showcase/carousel/thumbnails/CarouselThumbnailsView";
import CarouselThumbnailsEdit from "./CarouselThumbnailsEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";

interface CarouselThumbnailsContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const CarouselThumbnailsContextEdition: React.FC<
  CarouselThumbnailsContextEditionProps
> = ({ bloc, onChange }: CarouselThumbnailsContextEditionProps) => {
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
          bloc={bloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          showWidth={true}
        />
      </div>

      <div className="flex-1 rounded-lg  p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        {bloc !== undefined && <CarouselThumbnailsView bloc={bloc} />}
      </div>
    </div>
  );
};
export default CarouselThumbnailsContextEdition;
