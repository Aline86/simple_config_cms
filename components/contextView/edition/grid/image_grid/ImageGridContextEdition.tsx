"use client";

import { BlocObject } from "../../../../../database/model/Bloc";
import PicturesgridView from "../../../showcase/grid/picturesView/PicturesGridView";
import PicturesLinkEdit from "../image_group/PicturesLinkEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";
import EditionDoubleView from "../../../../ui/EditionDoubleView";

interface ImageGridContextEditionProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
}

const ImageGridContextEdition: React.FC<ImageGridContextEditionProps> = ({
  bloc,
  onChange,
}: ImageGridContextEditionProps) => {
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
          isLink={false}
        />
      }
      ViewComponent={<PicturesgridView bloc={bloc} />}
    />
  );
};
export default ImageGridContextEdition;
