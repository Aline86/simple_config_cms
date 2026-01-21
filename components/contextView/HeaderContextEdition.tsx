"use client";

import { useEffect, useState } from "react";
import { HeaderObject } from "@/model/bloc/Header";
import { MediaObject } from "@/model/bloc/MediaObject";
import HeaderEdit from "@/components/contextView/edition/header/HeaderEdit";
import { updateObjectBySetter } from "@/lib/utils/functions";
import HeaderView from "@/components/contextView/showcase/header/HeaderView";
import { deleteItemAndReorder } from "@/helpers/changeComponentPosition";

export default function HeaderContextEdition() {
  const [headerData, setHeader] = useState<HeaderObject | null>(null);

  // Initialiser les données côté client uniquement
  useEffect(() => {
    setHeader(
      new HeaderObject({
        id: 1,
        bloc_id: 1,
        nom_site: "test nom site",
        favicon: new MediaObject({
          id: crypto.randomUUID(),
          bloc_id: 1,
          titre: "biche",
          image_lien: "#",
          image_url:
            "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
        }),
        logo: new MediaObject({
          id: crypto.randomUUID(),
          bloc_id: 1,
          titre: "biche",
          image_lien: "#",
          image_url:
            "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
        }),
        description: "",
        reseaux: [
          new MediaObject({
            id: crypto.randomUUID(),
            bloc_id: 1,
            titre: "biche",
            image_lien: "#",
            position_image: 0,
            image_url:
              "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
          }),
          new MediaObject({
            id: crypto.randomUUID(),
            bloc_id: 1,
            titre: "biche",
            image_lien: "#",
            position_image: 1,
            image_url:
              "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
          }),
        ],
      }),
    );
  }, []);
  useEffect(() => {}, [headerData]);
  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!headerData) return;
    const newObj = updateObjectBySetter(headerData, fieldName, newValue);
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

      // S'assurer que res est un tableau d'objets MediaObject valides
      const cleanReseaux = res.map((reseau, index) => {
        // Si ce n'est pas une instance, en créer une nouvelle
        return new MediaObject({
          id: reseau.number_id,
          bloc_id: reseau.number_bloc_id,
          titre: reseau.text_titre ?? undefined,
          image_lien: reseau.text_image_lien ?? undefined,
          position_image: index,
          image_url: reseau.image_image_url ?? undefined,
        });
      });

      const updatedHeader = new HeaderObject({
        id: prev.number_id ?? undefined,
        bloc_id: prev.number_bloc_id ?? undefined,
        nom_site: prev.text_nom_site ?? undefined,
        favicon: prev.image_favicon ?? undefined,
        logo: prev.image_logo ?? undefined,

        background_url: prev.text_background_url ?? undefined,
        reseaux: cleanReseaux,
      });

      return updatedHeader;
    });
  };
  const handleAdd = () => {
    setHeader((prev) => {
      if (!prev) return prev;

      const newMedia = new MediaObject({
        id: crypto.randomUUID(),
        bloc_id: 1,
        titre: "nouveau réseau",
        image_lien: "#",
        position_image: prev.image_reseaux.length,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      });

      const updatedHeader = new HeaderObject({
        id: prev.number_id ?? undefined,
        bloc_id: prev.number_bloc_id ?? undefined,
        nom_site: prev.text_nom_site ?? undefined,
        favicon: prev.image_favicon ?? undefined,
        logo: prev.image_logo ?? undefined,
        background_url: prev.text_background_url ?? undefined,
        reseaux: [...prev.image_reseaux, newMedia],
      });

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
