"use client";

import { TypeBloc } from "@/model/Page";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";
import { useEffect, useState } from "react";
import { MediaObject } from "@/model/bloc/MediaObject";
import { updateObjectBySetter } from "@/lib/utils/functions";
import {
  deleteItemAndReorder,
  reorderArray,
} from "@/helpers/changeComponentPosition";
import { BlocObject } from "@/model/Bloc";

import { cloneBlocWithMedias } from "@/helpers/bloc.helper";
import { cloneMediaWithPosition, createMedia } from "@/helpers/media.helper";
import { updateBlocImages } from "@/helpers/bloc.media.helper";
import CarouselAutoView from "@/components/contextView/showcase/carousel/automatic/CarouselAutoView";
import PicturesLinkEdit from "../image_group/PicturesLinkEdit";
import PicturesgridView from "@/components/contextView/showcase/grid/picturesView/PicturesGridView";
interface ImageGridContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const ImageGridContextEdition: React.FC<ImageGridContextEditionProps> = ({
  bloc,
  onChange,
}: ImageGridContextEditionProps) => {
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

  // Afficher un placeholder pendant le chargement
  if (!bloc) {
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>

        <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
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
      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
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

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <PicturesgridView bloc={bloc} />
      </div>
    </div>
  );
};
export default ImageGridContextEdition;
