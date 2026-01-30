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
import { nanoid } from "nanoid";

interface HeaderContextEditionProps {
  bloc: HeaderObject;
  onChange: (bloc: HeaderObject) => void;
}

const HeaderContextEdition: React.FC<HeaderContextEditionProps> = ({
  bloc,
  onChange,
}: HeaderContextEditionProps) => {
  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!bloc) return;
    const newObj = updateObjectBySetter(bloc, fieldName, newValue);
    console.log("newObj.data", newObj.data);
    onChange(newObj.data);
  };

  const handleRemove = (model: MediaObject) => {
    const res = deleteItemAndReorder(
      bloc.reseaux,
      model,
      "number_position_image",
    );
    const cleanReseaux = res.map((reseau, index) => {
      return cloneMediaWithPosition(reseau, index);
    });
    const updatedHeader = cloneHeaderWithReseaux(bloc, cleanReseaux);

    onChange(updatedHeader);
  };
  const handleAdd = () => {
    const newMedia = createMedia(bloc.reseaux.length, 1);
    const updatedHeader = cloneHeaderWithReseau(bloc, newMedia);
    onChange(updatedHeader);
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
        <HeaderEdit
          header={bloc}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <HeaderView header={bloc} />
      </div>
    </div>
  );
};
export default HeaderContextEdition;
