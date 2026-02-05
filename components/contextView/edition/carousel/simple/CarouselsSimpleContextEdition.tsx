"use client";

import { BlocObject } from "../../../../../database/model/Bloc";
import CarouselSimple from "../../../showcase/carousel/simple/Carousel";
import CarouselThumbnailsEdit from "../thumbnails/CarouselThumbnailsEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";
import EditionDoubleView from "../../../../ui/EditionDoubleView";

interface CarouselsSimpleContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const CarouselsSimpleContextEdition: React.FC<
  CarouselsSimpleContextEditionProps
> = ({ bloc, onChange }: CarouselsSimpleContextEditionProps) => {
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
          showWidth={false}
        />
      }
      ViewComponent={<CarouselSimple bloc={bloc} />}
    />
  );
};
export default CarouselsSimpleContextEdition;
