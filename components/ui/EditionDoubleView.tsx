"use client";

import { BlocObject } from "../../database/model/Bloc";
import { MediaObject } from "../../database/model/bloc/MediaObject";
import { ReactElement } from "react";
import { DeleteButton } from "./DeleteButton";

interface EditionDoubleViewProps {
  EditComponent: ReactElement;
  ViewComponent: ReactElement;

  // Props optionnelles
  editTitle?: string;
  viewTitle?: string;
}

const EditionDoubleView: React.FC<EditionDoubleViewProps> = ({
  EditComponent,
  ViewComponent,
  editTitle = "Éditeur",
  viewTitle = "Aperçu",
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">{editTitle}</h2>
        {EditComponent}
      </div>

      <div className="flex-1 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">{viewTitle}</h2>
        {ViewComponent}
      </div>
    </div>
  );
};

export default EditionDoubleView;
