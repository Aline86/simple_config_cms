"use client";

import { useState } from "react";
import { cloneBlocWithMedias } from "../../../../lib/helpers/bloc.helper";
import { reorderArray } from "../../../../lib/helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../lib/helpers/media.helper";
import { updateObjectBySetter } from "../../../../lib/helpers/functions";
import { BlocObject } from "../../../../database/model/Bloc";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import ScreenView from "../../showcase/screen/ScreenView";
import ScreenEdit from "./ScreenEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";

interface ScreenContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const ScreenContextEdition: React.FC<ScreenContextEditionProps> = ({
  bloc,
  onChange,
}: ScreenContextEditionProps) => {
  const [dragged, setDragged] = useState<MediaObject | null>(null);

  const onDragStart = (media: MediaObject) => {
    setDragged(media);
  };

  const onDrop = (target: MediaObject) => {
    if (!dragged) return;

    const reordered = reorderArray(
      bloc.image_medias,
      dragged,
      target,
      "number_position_image",
    );
    const cleanimage_medias = reordered.map(cloneMediaWithPosition);
    const updatedBloc = cloneBlocWithMedias(
      bloc,

      cleanimage_medias,
    );

    onChange(updatedBloc); // <-- remonte le bloc mis à jour dans la page
    setDragged(null);
  };

  const updateField = (field: string, value: any) => {
    const updatedBloc = updateObjectBySetter(bloc, field, value);
    onChange(updatedBloc.data);
  };

  const handleAdd = () => {
    const newMedia = createMedia(bloc.image_medias.length, bloc.id);
    const updatedBloc = cloneBlocWithMedias(bloc, [
      ...bloc.image_medias,
      newMedia,
    ]);

    onChange(updatedBloc);
  };

  const handleRemove = (media: MediaObject) => {
    const filteredimage_medias = bloc.image_medias.filter(
      (img) => img.id !== media.id,
    );
    const cleanimage_medias = filteredimage_medias.map(cloneMediaWithPosition);
    const updatedBloc = cloneBlocWithMedias(bloc, cleanimage_medias);

    onChange(updatedBloc);
  };

  return (
    <EditionDoubleView
      EditComponent={
        <ScreenEdit
          bloc={bloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      }
      ViewComponent={<ScreenView bloc={bloc} />}
    />
  );
};
export default ScreenContextEdition;
