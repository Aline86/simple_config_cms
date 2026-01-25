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
import PicturesGridView from "@/components/contextView/showcase/grid/picturesView/PicturesGridView";
import PicturesLinkEdit from "./edition/grid/PicturesLinkEdit";

export default function Page() {
  const options_image_group: CreateBlocOptions = {
    page_id: crypto.randomUUID(),
    bloc_position: 0,
    nom_bloc: "image_group",
    type: TypeBloc.IMAGE_GROUPE,
    mediaCount: 5,
  };
  const bloc = createNewBloc(options_image_group);
  const [imageGroupData, setImageGroupData] = useState<BlocObject | null>(null);
  const [dragged, setDragged] = useState<MediaObject | null>(null);

  const onDragStart = (media: MediaObject) => {
    setDragged(media);
  };

  const onDrop = (target: MediaObject) => {
    if (!dragged) return;

    setImageGroupData((prev) => {
      if (!prev) return prev;

      // Recréer des MediaObject propres avec les bonnes positions
      const reordered = reorderArray(prev.image_medias, dragged, target);

      return cloneBlocWithMedias(prev, reordered.map(cloneMediaWithPosition));
    });

    setDragged(null);
  };

  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!imageGroupData) return;
    const newObj = updateObjectBySetter(imageGroupData, fieldName, newValue);
    setImageGroupData(newObj.data);
  };
  const handleAdd = () => {
    setImageGroupData((prev) => {
      if (!prev) return prev;

      const newMedia = createMedia(prev.image_medias.length, prev.number_id);

      const updatedBloc = updateBlocImages(
        prev,
        prev.image_medias.length,
        newMedia,
      );

      return updatedBloc;
    });
  };

  const handleRemove = (model: MediaObject) => {
    setImageGroupData((prev) => {
      if (!prev || !prev.image_medias?.length) return prev;
      const filteredImages = prev.image_medias.filter(
        (img) => img.number_id !== model.number_id,
      );

      return cloneBlocWithMedias(
        prev,
        filteredImages.map(cloneMediaWithPosition),
      );
    });
  };
  // Initialiser les données côté client uniquement
  useEffect(() => {
    setImageGroupData(bloc);
  }, []);
  useEffect(() => {}, [imageGroupData]);
  // Afficher un placeholder pendant le chargement
  if (!imageGroupData) {
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
          images_group={imageGroupData}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <PicturesGridView imageGroupData={imageGroupData} />
      </div>
    </div>
  );
}
