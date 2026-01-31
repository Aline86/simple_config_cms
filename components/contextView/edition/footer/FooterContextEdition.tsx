"use client";

import { deleteItemAndReorder } from "../../../../helpers/changeComponentPosition";
import {
  cloneFooterWithReseau,
  cloneFooterWithReseaux,
} from "../../../../helpers/footer.helper";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../helpers/media.helper";
import { updateObjectBySetter } from "../../../../lib/utils/functions";
import { FooterObject } from "../../../../model/bloc/Footer";
import { MediaObject } from "../../../../model/bloc/MediaObject";
import FooterView from "../../showcase/footer/FooterView";
import FooterEdit from "./FooterEdit";

interface FooterContextEditionProps {
  bloc: FooterObject;
  onChange: (bloc: FooterObject) => void;
}

const FooterContextEdition: React.FC<FooterContextEditionProps> = ({
  bloc,
  onChange,
}: FooterContextEditionProps) => {
  const updateMediaObject = (fieldName: string, newValue: any) => {
    if (!bloc) return;
    const newObj = updateObjectBySetter(bloc, fieldName, newValue);
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
    const updatedHeader = cloneFooterWithReseaux(bloc, cleanReseaux);

    onChange(updatedHeader);
  };
  const handleAdd = () => {
    const newMedia = createMedia(bloc.reseaux.length, 1);
    const updatedHeader = cloneFooterWithReseau(bloc, newMedia);
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
        <FooterEdit
          footer={bloc}
          onChange={updateMediaObject}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <FooterView footer={bloc} />
      </div>
    </div>
  );
};
export default FooterContextEdition;
