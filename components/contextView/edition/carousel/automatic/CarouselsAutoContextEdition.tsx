"use client";

import { BlocObject } from "../../../../../database/model/Bloc";
import CarouselAutoView from "../../../showcase/carousel/automatic/CarouselAutoView";
import CarouselThumbnailsEdit from "../thumbnails/CarouselThumbnailsEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";
import EditionDoubleView from "../../../../ui/EditionDoubleView";

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
    <EditionDoubleView
      EditComponent={
        <CarouselThumbnailsEdit
          bloc={bloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
          showWidth={false}
        />
      }
      ViewComponent={<CarouselAutoView bloc={bloc} />}
    />
  );
};
export default CarouselsAutoContextEdition;
