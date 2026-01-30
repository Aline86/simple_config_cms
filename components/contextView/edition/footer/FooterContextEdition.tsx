"use client";

import { useEffect, useState } from "react";

import { MediaObject } from "@/model/bloc/MediaObject";

import { updateObjectBySetter } from "@/lib/utils/functions";

import { deleteItemAndReorder } from "@/helpers/changeComponentPosition";
import { cloneMediaWithPosition, createMedia } from "@/helpers/media.helper";

import { FooterObject } from "@/model/bloc/Footer";
import {
  cloneFooterWithReseau,
  cloneFooterWithReseaux,
  mockFooter,
} from "@/helpers/footer.helper";
import FooterEdit from "@/components/contextView/edition/footer/FooterEdit";
import FooterView from "@/components/contextView/showcase/footer/FooterView";

export default function FooterContextEdition() {
  const [FooterData, setFooter] = useState<FooterObject | null>(null);
  const idBloc = nanoid();
  // Initialiser les données côté client uniquement
  useEffect(() => {
    setFooter(mockFooter(idBloc));
  }, []);
  useEffect(() => {}, [FooterData]);
  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!FooterData) return;
    const newObj = updateObjectBySetter(FooterData, fieldName, newValue);
    console.log("newObj.data", newObj.data);
    setFooter(newObj.data);
  };

  const handleRemove = (model: MediaObject) => {
    setFooter((prev) => {
      if (!prev) return prev;
      const res = deleteItemAndReorder(
        prev.reseaux,
        model,
        "number_position_image",
      );
      const cleanReseaux = res.map((reseau, index) => {
        return cloneMediaWithPosition(reseau, index);
      });
      const updatedFooter = cloneFooterWithReseaux(prev, cleanReseaux);

      return updatedFooter;
    });
  };
  const handleAdd = () => {
    setFooter((prev) => {
      if (!prev) return prev;
      const newMedia = createMedia(prev.reseaux.length, prev.id);
      const updatedFooter = cloneFooterWithReseau(prev, newMedia);

      return updatedFooter;
    });
  };

  // Afficher un placeholder pendant le chargement
  if (!FooterData) {
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
        <FooterEdit
          footer={FooterData}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <FooterView footer={FooterData} />
      </div>
    </div>
  );
}
