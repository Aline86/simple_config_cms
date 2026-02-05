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
  onChange: (bloc: BlocObject) => void;
}

const useUpdateUI = ({ bloc, onChange }: ContextEditionProps) => {
  const [dragged, setDragged] = useState<MediaObject | null>(null);
  const [localBloc, setLocalBloc] = useState(bloc);

  // Sync avec le parent uniquement quand l'ID change
  useEffect(() => {
    setLocalBloc(bloc);
  }, [bloc.id]);

  const onDragStart = (media: MediaObject) => {
    setDragged(media);
  };

  const onDrop = useCallback(
    (target: MediaObject) => {
      if (!dragged) return;

      setLocalBloc((prev) => {
        const reordered = reorderArray(
          prev.image_medias, //  Utiliser prev (localBloc)
          dragged,
          target,
          "number_position_image",
        );
        const cleanimage_medias = reordered.map(cloneMediaWithPosition);
        const updatedBloc = cloneBlocWithMedias(prev, cleanimage_medias);

        onChange(updatedBloc);
        return updatedBloc;
      });

      setDragged(null);
    },
    [dragged, onChange],
  );

  const updateField = useCallback((field: string, value: unknown) => {
    setLocalBloc((prev) => updateObjectBySetter(prev, field, value).data);
  }, []);

  useEffect(() => {
    onChange(localBloc);
  }, [localBloc]);

  const handleAdd = useCallback(() => {
    setLocalBloc((prev) => {
      const newMedia = createMedia(prev.image_medias.length, prev.id);
      const updatedBloc = cloneBlocWithMedias(prev, [
        ...prev.image_medias,
        newMedia,
      ]);

      onChange(updatedBloc);
      return updatedBloc;
    });
  }, [onChange]);

  const handleRemove = useCallback(
    (media: MediaObject) => {
      setLocalBloc((prev) => {
        const filteredimage_medias = prev.image_medias.filter(
          (img) => img.id !== media.id,
        );
        const cleanimage_medias = filteredimage_medias.map(
          cloneMediaWithPosition,
        );
        const updatedBloc = cloneBlocWithMedias(prev, cleanimage_medias);

        onChange(updatedBloc);
        return updatedBloc;
      });
    },
    [onChange],
  );
  return {
    dragged,
    localBloc,
    handleRemove,
    handleAdd,
    updateField,
    onDrop,
    onDragStart,
  };
};

export default useUpdateUI;
