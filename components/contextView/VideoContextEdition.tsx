"use client";

import { TypeBloc } from "@/model/Page";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";
import { useEffect, useState } from "react";
import { MediaObject } from "@/model/bloc/MediaObject";
import { updateObjectBySetter } from "@/lib/utils/functions";
import { reorderArray } from "@/helpers/changeComponentPosition";
import { BlocObject } from "@/model/Bloc";
import { cloneBlocWithMedias } from "@/helpers/bloc.helper";
import { cloneMediaWithPosition, createMedia } from "@/helpers/media.helper";
import { updateBlocImages } from "@/helpers/bloc.media.helper";
import VideoEdit from "@/components/contextView/edition/video/VideoEdit";
import VideoView from "@/components/contextView/showcase/video/VideoView";

export default function Page() {
  const options_video: CreateBlocOptions = {
    page_id: crypto.randomUUID(),
    bloc_position: 0,
    nom_bloc: "video",
    type: TypeBloc.VIDEO,
    mediaCount: 1,
  };

  const bloc = createNewBloc(options_video);
  const [video, setvideo] = useState<BlocObject | null>(null);
  const [dragged, setDragged] = useState<MediaObject | null>(null);

  const onDragStart = (media: MediaObject) => {
    setDragged(media);
  };

  const onDrop = (target: MediaObject) => {
    if (!dragged) return;

    setvideo((prev) => {
      if (!prev) return prev;

      // Recréer des MediaObject propres avec les bonnes positions
      const reordered = reorderArray(prev.image_medias, dragged, target);

      return cloneBlocWithMedias(prev, reordered.map(cloneMediaWithPosition));
    });

    setDragged(null);
  };
  function createNewBloc(options: CreateBlocOptions): BlocObject {
    const id = crypto.randomUUID();
    const {
      page_id,
      bloc_position,
      type,
      nom_bloc,
      color_background_color = "#ffffff",
      description,
      langue_bloc = "fr",
      mediaCount = 0,
      articleCount = 0,
      mediaPerArticle = 0,
      is_full_width = false,
      width = 100,
      height = 100,
      gap = 30,
      columns = 4,
    } = options;

    // Créer les médias niveau 1 (attachés directement au bloc)
    const image_medias: MediaObject[] = [];
    for (let i = 0; i < mediaCount; i++) {
      image_medias.push(createEmptyMedia(i, id));
    }

    return new BlocObject(
      {
        id: id, // toujours null à la création
        nom_bloc: nom_bloc,
        page_id,
        titre: "",
        description,
        type,
        color_background_color,
        bloc_position,
        langue_bloc,
        is_full_width,
        width,
        height,
        gap,
        columns,
        createdAt: new Date(),
        updatedAt: new Date(),
        image_medias,
      },
      "edition", // mode fixe
    );
  }

  function createEmptyMedia(position: number, id_bloc: string): MediaObject {
    const image_url = `https://www.youtube.com/watch?v=vt0i6nuqNEo`;
    return new MediaObject({
      id: crypto.randomUUID(),
      bloc_id: id_bloc,
      titre: "test",
      image_lien: "",
      position_image: position,
      image_url: image_url,
    });
  }
  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!video) return;
    const newObj = updateObjectBySetter(video, fieldName, newValue);
    setvideo(newObj.data);
  };
  const handleAdd = () => {
    setvideo((prev) => {
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
    setvideo((prev) => {
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
    setvideo(bloc);
  }, []);
  useEffect(() => {}, [video]);
  // Afficher un placeholder pendant le chargement
  if (!video) {
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
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
        <VideoEdit
          bloc={video}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm pb-16">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <VideoView bloc={video} />
      </div>
    </div>
  );
}
