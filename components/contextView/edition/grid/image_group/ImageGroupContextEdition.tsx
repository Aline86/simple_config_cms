"use client";
import { useCallback, useState, useEffect } from "react";
import PicturesLinkEdit from "./PicturesLinkEdit";
import { cloneBlocWithMedias } from "../../../../../helpers/bloc.helper";
import { reorderArray } from "../../../../../helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../../helpers/media.helper";
import { updateObjectBySetter } from "../../../../../lib/utils/functions";
import { BlocObject } from "../../../../../model/Bloc";
import { MediaObject } from "../../../../../model/bloc/MediaObject";
import PicturesLinkView from "../../../showcase/grid/picturesLink/PicturesLinkView";
import EditionDoubleView from "../../../../ui/EditionDoubleView";
import useUpdateUI from "../../../../../hooks/editor/useUpdateUI";

interface ImageGroupContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const ImageGroupContextEdition: React.FC<ImageGroupContextEditionProps> = ({
  bloc,
  onChange,
}: ImageGroupContextEditionProps) => {
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
          isLink={true}
        />
      }
      ViewComponent={<PicturesLinkView bloc={bloc} />}
    />
  );
};

export default ImageGroupContextEdition;
