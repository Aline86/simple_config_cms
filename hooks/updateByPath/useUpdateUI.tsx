import { useState, useCallback } from "react";
import { cloneBlocWithMedias } from "../../lib/helpers/bloc.helper";
import {
  deleteItemAndReorder,
  reorderArray,
} from "../../lib/helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../lib/helpers/media.helper";
import { BlocObject } from "../../database/model/Bloc";
import { MediaObject } from "../../database/model/bloc/MediaObject";
import { HeaderObject } from "../../database/model/bloc/Header";
import { FooterObject } from "../../database/model/bloc/Footer";
import { cloneHeaderWithReseaux } from "../../lib/helpers/header.helper";
import { cloneFooterWithReseaux } from "../../lib/helpers/footer.helper";

interface ContextEditionProps {
  bloc: BlocObject | HeaderObject | FooterObject;
  onChange: (fieldName: string, newValue: unknown) => void;
}

const useUpdateUI = ({ bloc, onChange }: ContextEditionProps) => {
  const [dragged, setDragged] = useState<MediaObject | null>(null);
  // Helper pour obtenir la liste de médias et la propriété appropriée
  const getMediaConfig = useCallback(() => {
    if (bloc instanceof BlocObject) {
      return {
        medias: bloc.image_medias,
        propertyName: `blocs.${bloc.bloc_position}`,
        positionKey: "number_position_image" as const,
        parentId: bloc.id,
      };
    }
    return {
      medias: bloc.reseaux,
      propertyName: "reseaux",
      positionKey: "number_position_image" as const,
      parentId: bloc.number_id,
    };
  }, [bloc]);

  // Helper pour cloner le bloc avec les nouveaux médias
  const cloneBlocWithNewMedias = useCallback(
    (newMedias: MediaObject[]) => {
      if (bloc instanceof BlocObject) {
        return cloneBlocWithMedias(bloc, newMedias);
      }
      if (bloc instanceof HeaderObject) {
        return cloneHeaderWithReseaux(bloc, newMedias).reseaux;
      }
      return cloneFooterWithReseaux(bloc, newMedias).reseaux;
    },
    [bloc],
  );

  const onDragStart = useCallback((media: MediaObject) => {
    setDragged(media);
  }, []);

  const onDrop = useCallback(
    (target: MediaObject) => {
      if (!dragged) return;

      const { medias, propertyName, positionKey } = getMediaConfig();

      const reordered = reorderArray(medias, dragged, target, positionKey);
      const updatedMedias = reordered.map(cloneMediaWithPosition);
      const updatedBloc = cloneBlocWithNewMedias(updatedMedias);

      onChange(propertyName, updatedBloc);
      setDragged(null);
    },
    [dragged, getMediaConfig, cloneBlocWithNewMedias, onChange],
  );

  const handleAdd = useCallback(() => {
    const { medias, propertyName, parentId } = getMediaConfig();
    const newMedia = createMedia(medias.length, parentId);
    const updatedMedias = [...medias, newMedia];
    const updatedBloc = cloneBlocWithNewMedias(updatedMedias);

    onChange(propertyName, updatedBloc);
  }, [getMediaConfig, cloneBlocWithNewMedias, onChange]);

  const handleRemove = useCallback(
    (media: MediaObject) => {
      const { medias, propertyName } = getMediaConfig();
      const updatedMedias = deleteItemAndReorder(
        medias,
        media,
        "number_position_image",
      );
      const updatedBloc = cloneBlocWithNewMedias(updatedMedias);

      onChange(propertyName, updatedBloc);
    },
    [getMediaConfig, cloneBlocWithNewMedias, onChange],
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
