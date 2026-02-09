import { useState, useEffect, useCallback } from "react";
import { cloneBlocWithMedias } from "../../lib/helpers/bloc.helper";
import { reorderArray } from "../../lib/helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../lib/helpers/media.helper";
import { updateObjectBySetter } from "../../lib/helpers/tiptapAndSetterFunctions";
import { BlocObject } from "../../database/model/Bloc";
import { MediaObject } from "../../database/model/bloc/MediaObject";

interface ContextEditionProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
}

const useUpdateUI = ({ bloc, onChange }: ContextEditionProps) => {
  const [dragged, setDragged] = useState<MediaObject | null>(null);

  const onDragStart = (media: MediaObject) => {
    setDragged(media);
  };

  const onDrop = (target: MediaObject) => {
    if (!dragged) return;

    const reordered = reorderArray(
      bloc.image_medias, //  Utiliser prev (localBloc)
      dragged,
      target,
      "number_position_image",
    );
    const cleanimage_medias = reordered.map(cloneMediaWithPosition);
    const updatedBloc = cloneBlocWithMedias(bloc, cleanimage_medias);

    onChange("blocs." + bloc.bloc_position, updatedBloc);
    return updatedBloc;
  };

  const handleAdd = useCallback(() => {
    const newMedia = createMedia(bloc.image_medias.length, bloc.id);

    const updatedBloc = {
      ...bloc,
      image_medias: [...bloc.image_medias, newMedia],
    };

    onChange(`blocs.${bloc.bloc_position}`, updatedBloc);
  }, [onChange]);
  const handleRemove = useCallback(
    (media: MediaObject) => {
      const cleanimage_medias = bloc.image_medias
        .filter((img) => img.id !== media.id)
        .map(cloneMediaWithPosition);

      onChange(`blocs.${bloc.bloc_position}`, {
        ...bloc,
        image_medias: cleanimage_medias,
      });
    },
    [bloc, onChange],
  );

  return {
    dragged,

    handleAdd,
    handleRemove,
    onDrop,
    onDragStart,
  };
};

export default useUpdateUI;
