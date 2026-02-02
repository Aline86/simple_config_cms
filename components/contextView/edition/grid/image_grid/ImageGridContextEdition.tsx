"use client";

import { useCallback, useEffect, useState } from "react";
import { cloneBlocWithMedias } from "../../../../../helpers/bloc.helper";
import { reorderArray } from "../../../../../helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../../helpers/media.helper";
import { updateObjectBySetter } from "../../../../../lib/utils/functions";
import { BlocObject } from "../../../../../model/Bloc";
import { MediaObject } from "../../../../../model/bloc/MediaObject";
import PicturesgridView from "../../../showcase/grid/picturesView/PicturesGridView";
import PicturesLinkEdit from "../image_group/PicturesLinkEdit";

interface ImageGridContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const ImageGridContextEdition: React.FC<ImageGridContextEditionProps> = ({
  bloc,
  onChange,
}: ImageGridContextEditionProps) => {
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
          prev.image_medias, // ✅ Utiliser prev (localBloc)
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
  // Afficher un placeholder pendant le chargement
  if (!bloc) {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 rounded-lg  p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <div className="flex-1 rounded-lg  p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 rounded-lg  p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
        <PicturesLinkEdit
          images_group={bloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      </div>

      <div className="flex-1 rounded-lg  p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <PicturesgridView bloc={bloc} />
      </div>
    </div>
  );
};
export default ImageGridContextEdition;
