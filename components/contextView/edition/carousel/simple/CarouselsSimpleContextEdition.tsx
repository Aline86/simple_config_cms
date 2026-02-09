"use client";

import { BlocObject } from "../../../../../database/model/Bloc";
import CarouselSimple from "../../../showcase/carousel/simple/Carousel";
import CarouselThumbnailsEdit from "../thumbnails/CarouselThumbnailsEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";
import EditionDoubleView from "../../../../ui/EditionDoubleView";

interface CarouselsSimpleContextEditionProps {
  bloc: BlocObject;
  onChange: (fieldName: string, value: unknown) => void;
}

const CarouselsSimpleContextEdition: React.FC<
  CarouselsSimpleContextEditionProps
> = ({ bloc, onChange }: CarouselsSimpleContextEditionProps) => {
  const {
    dragged,

    handleRemove,
    handleAdd,

    onDrop,
    onDragStart,
  } = useUpdateUI({ bloc, onChange });

  return (
    <EditionDoubleView
      EditComponent={
        <CarouselThumbnailsEdit
          bloc={bloc}
          onChange={onChange}
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
