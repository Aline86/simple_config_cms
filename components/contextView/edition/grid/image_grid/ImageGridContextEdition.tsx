"use client";

import { BlocObject } from "../../../../../model/Bloc";
import PicturesgridView from "../../../showcase/grid/picturesView/PicturesGridView";
import PicturesLinkEdit from "../image_group/PicturesLinkEdit";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";
import EditionDoubleView from "../../../../ui/EditionDoubleView";

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
    <EditionDoubleView
      EditComponent={
        <PicturesLinkEdit
          images_group={bloc} //  Passer localBloc
          onChange={updateField}
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
