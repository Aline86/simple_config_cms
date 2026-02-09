import { useState, useEffect, useCallback } from "react";
import { cloneBlocWithMedias } from "../../lib/helpers/bloc.helper";
import { reorderArray } from "../../lib/helpers/changeComponentPosition";
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

  const onDragStart = (media: MediaObject) => {
    setDragged(media);
  };

  const onDrop = (target: MediaObject) => {
    if (!dragged) return;
    let reordered;
    if (bloc instanceof BlocObject) {
      reordered = reorderArray(
        bloc.image_medias, //  Utiliser prev (localBloc)
        dragged,
        target,
        "number_position_image",
      );
    } else {
      reordered = reorderArray(
        bloc.reseaux, //  Utiliser prev (localBloc)
        dragged,
        target,
        "number_position_image",
      );
    }
    const cleanimage_medias = reordered.map(cloneMediaWithPosition);

    if (bloc instanceof BlocObject) {
      const updatedBloc = cloneBlocWithMedias(bloc, cleanimage_medias);
      onChange("blocs." + bloc.bloc_position, updatedBloc);
    } else if (bloc instanceof HeaderObject) {
      const updatedBloc = cloneHeaderWithReseaux(bloc, cleanimage_medias);
      onChange("reseaux", updatedBloc);
    } else {
      const updatedBloc = cloneFooterWithReseaux(bloc, cleanimage_medias);
      onChange("reseaux", updatedBloc);
    }
  };

  const handleAdd = useCallback(() => {
    if (bloc instanceof BlocObject) {
      const newMedia = createMedia(bloc.image_medias.length, bloc.id);

      const updatedBloc = {
        ...bloc,
        image_medias: [...bloc.image_medias, newMedia],
      };

      onChange(`blocs.${bloc.bloc_position}`, updatedBloc);
    } else {
      const newMedia = createMedia(bloc.reseaux.length, bloc.number_id);

      const updatedBloc = {
        ...bloc,
        reseaux: [...bloc.reseaux, newMedia],
      };
      onChange(`reseaux`, updatedBloc.reseaux);
    }
  }, [onChange]);
  const handleRemove = useCallback(
    (media: MediaObject) => {
      if (bloc instanceof BlocObject) {
        const cleanimage_medias = bloc.image_medias
          .filter((img) => img.id !== media.id)
          .map(cloneMediaWithPosition);

        onChange(`blocs.${bloc.bloc_position}`, {
          ...bloc,
          image_medias: cleanimage_medias,
        });
      } else {
        const cleanimage_medias = bloc.reseaux
          .filter((img) => img.id !== media.id)
          .map(cloneMediaWithPosition);

        onChange(`reseaux`, {
          ...bloc,
          reseaux: cleanimage_medias,
        });
      }
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
