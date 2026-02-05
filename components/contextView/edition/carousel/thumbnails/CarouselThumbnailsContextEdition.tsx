"use client";

import { BlocObject } from "../../../../../database/model/Bloc";
import CarouselThumbnailsView from "../../../showcase/carousel/thumbnails/CarouselThumbnailsView";
import CarouselThumbnailsEdit from "./CarouselThumbnailsEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";
import EditionDoubleView from "../../../../ui/EditionDoubleView";

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
    <EditionDoubleView
      EditComponent={
        <CarouselThumbnailsEdit
          bloc={localBloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      }
      ViewComponent={<CarouselThumbnailsView bloc={bloc} />}
    />
  );
};
export default CarouselThumbnailsContextEdition;
