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

interface ImageGroupContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const ImageGroupContextEdition: React.FC<ImageGroupContextEditionProps> = ({
  bloc,
  onChange,
}: ImageGroupContextEditionProps) => {
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

  const updateField = useCallback(
    (field: string, value: any) => {
      setLocalBloc((prev) => {
        const updatedBloc = updateObjectBySetter(prev, field, value);
        onChange(updatedBloc.data);
        return updatedBloc.data;
      });
    },
    [onChange],
  );

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

  return (
    <EditionDoubleView
      EditComponent={
        <PicturesLinkEdit
          images_group={localBloc} //  Passer localBloc
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      }
      ViewComponent={<PicturesLinkView bloc={localBloc} />}
    />
  );
};

export default ImageGroupContextEdition;
