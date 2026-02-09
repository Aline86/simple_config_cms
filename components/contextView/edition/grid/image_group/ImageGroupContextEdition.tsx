"use client";
import PicturesLinkEdit from "./PicturesLinkEdit";
import { BlocObject } from "../../../../../database/model/Bloc";
import PicturesLinkView from "../../../showcase/grid/picturesLink/PicturesLinkView";
import EditionDoubleView from "../../../../ui/EditionDoubleView";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";

interface ImageGroupContextEditionProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
}

const ImageGroupContextEdition: React.FC<ImageGroupContextEditionProps> = ({
  bloc,
  onChange,
}: ImageGroupContextEditionProps) => {
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
        <PicturesLinkEdit
          images_group={bloc} //  Passer localBloc
          onChange={onChange}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      }
      ViewComponent={<PicturesLinkView bloc={bloc} />}
    />
  );
};

export default ImageGroupContextEdition;
