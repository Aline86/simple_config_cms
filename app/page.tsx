"use client";

import * as React from "react";
import { PageObject, TypeBloc } from "@/model/Page";
import { Modal } from "@/components/modals/Modal";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";
import PageComponent from "./pageComponent";
import { useEffect, useState } from "react";
import PageCrud from "./pageComponent";
import { HeaderObject } from "@/model/bloc/Header";
import { MediaObject } from "@/model/bloc/MediaObject";
import HeaderEdit from "@/components/contextView/edition/header/HeaderEdit";
import { updateObjectBySetter } from "@/lib/utils/functions";
import HeaderView from "@/components/contextView/showcase/header/HeaderView";
import { deleteItemAndReorder } from "@/helpers/changeComponentPosition";
import { BlocObject } from "@/model/Bloc";
import PicturesLinkEdit from "@/components/contextView/edition/grid/picturesLink/PicturesLinkEdit";
import PicturesLinkView from "@/components/contextView/showcase/grid/picturesLink/PicturesLinkView";

export default function Page() {
  const options_image_group: CreateBlocOptions = {
    page_id: crypto.randomUUID(),
    bloc_position: 0,
    nom_bloc: "image_group",
    type: TypeBloc.IMAGE_GROUPE,
    mediaCount: 2,
  };
  const bloc = createNewBloc(options_image_group);
  const [imageGroupData, setImageGroupData] = useState<BlocObject | null>(null);

  // Initialiser les données côté client uniquement
  useEffect(() => {
    setImageGroupData(bloc);
  }, []);
  useEffect(() => {}, [imageGroupData]);
  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!imageGroupData) return;
    const newObj = updateObjectBySetter(imageGroupData, fieldName, newValue);
    setImageGroupData(newObj.data);
  };
  const handleAdd = () => {
    setImageGroupData((prev) => {
      if (!prev) return prev;

      const newMedia = new MediaObject({
        id: crypto.randomUUID(),
        bloc_id: prev.number_id ?? undefined,
        titre: "nouveau média",
        image_lien: "#",
        position_image: prev.image_medias.length,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      });

      const updatedBloc = new BlocObject(
        {
          id: prev.number_id ?? undefined,
          nom_bloc: prev.text_nom_bloc ?? undefined,
          page_id: prev.number_page_id ?? undefined,
          titre: prev.text_titre ?? undefined,
          type: prev.text_type ?? undefined,
          bloc_position: prev.number_bloc_position ?? undefined,
          langue_bloc: prev.text_langue_bloc ?? undefined,
          is_full_width: prev.number_is_full_width,
          width: prev.number_width ?? undefined,
          height: prev.number_height ?? undefined,
          gap: prev.number_gap ?? undefined,
          createdAt: prev.number_createdAt ?? undefined,
          updatedAt: new Date(),
          image_medias: [...prev.image_medias, newMedia],
          articles: prev.articles,
        },
        prev.mode,
      );

      return updatedBloc;
    });
  };

  const handleRemove = (model: MediaObject) => {
    setImageGroupData((prev) => {
      if (!prev) return prev;

      const res = deleteItemAndReorder(
        prev.image_medias,
        model,
        "number_position_image",
      );

      // Recréer des MediaObject propres et réordonner
      const cleanMedias = res.map((media, index) => {
        return new MediaObject({
          id: media.number_id,
          bloc_id: media.number_bloc_id,
          titre: media.text_titre ?? undefined,
          image_lien: media.text_image_lien ?? undefined,
          image_url: media.image_image_url ?? undefined,
          position_image: index,
        });
      });

      const updatedBloc = new BlocObject(
        {
          id: prev.number_id ?? undefined,
          nom_bloc: prev.text_nom_bloc ?? undefined,
          page_id: prev.number_page_id ?? undefined,
          titre: prev.text_titre ?? undefined,
          type: prev.text_type ?? undefined,
          bloc_position: prev.number_bloc_position ?? undefined,
          langue_bloc: prev.text_langue_bloc ?? undefined,
          is_full_width: prev.number_is_full_width,
          width: prev.number_width ?? undefined,
          height: prev.number_height ?? undefined,
          gap: prev.number_gap ?? undefined,
          createdAt: prev.number_createdAt ?? undefined,
          updatedAt: new Date(),
          image_medias: cleanMedias,
          articles: prev.articles,
        },
        prev.mode,
      );

      return updatedBloc;
    });
  };

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
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <PicturesLinkView imageGroupData={imageGroupData} />
      </div>
    </div>
  );
}
