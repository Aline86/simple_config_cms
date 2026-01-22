"use client";

import { useEffect, useState } from "react";
import { HeaderObject } from "@/model/bloc/Header";
import { MediaObject } from "@/model/bloc/MediaObject";
import HeaderEdit from "@/components/contextView/edition/header/HeaderEdit";
import { updateObjectBySetter } from "@/lib/utils/functions";
import HeaderView from "@/components/contextView/showcase/header/HeaderView";
import { deleteItemAndReorder } from "@/helpers/changeComponentPosition";
import { cloneMediaWithPosition, createMedia } from "@/helpers/media.helper";
import {
  cloneHeaderWithReseau,
  cloneHeaderWithReseaux,
  mockHeader,
} from "@/helpers/header.helper";

export default function HeaderContextEdition() {
  const [headerData, setHeader] = useState<HeaderObject | null>(null);
  const idBloc = crypto.randomUUID();
  // Initialiser les données côté client uniquement
  useEffect(() => {
    setHeader(mockHeader(idBloc));
  }, []);
  useEffect(() => {}, [headerData]);
  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!headerData) return;
    const newObj = updateObjectBySetter(headerData, fieldName, newValue);
    console.log("newObj.data", newObj.data);
    setHeader(newObj.data);
  };

  const handleRemove = (model: MediaObject) => {
    setHeader((prev) => {
      if (!prev) return prev;
      const res = deleteItemAndReorder(
        prev.image_reseaux,
        model,
        "number_position_image",
      );
      const cleanReseaux = res.map((reseau, index) => {
        return cloneMediaWithPosition(reseau, index);
      });
      const updatedHeader = cloneHeaderWithReseaux(prev, cleanReseaux);

      return updatedHeader;
    });
  };
  const handleAdd = () => {
    setHeader((prev) => {
      if (!prev) return prev;
      const newMedia = createMedia(prev.image_reseaux.length, prev.number_id);
      const updatedHeader = cloneHeaderWithReseau(prev, newMedia);

      return updatedHeader;
    });
  };

  // Afficher un placeholder pendant le chargement
  if (!headerData) {
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
        <HeaderEdit
          header={headerData}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <HeaderView header={headerData} />
      </div>
    </div>
  );
}
