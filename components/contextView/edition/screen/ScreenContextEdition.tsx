"use client";

import { useState } from "react";
import { cloneBlocWithMedias } from "../../../../lib/helpers/bloc.helper";
import { reorderArray } from "../../../../lib/helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../lib/helpers/media.helper";
import { updateObjectBySetter } from "../../../../lib/helpers/tiptapAndSetterFunctions";
import { BlocObject } from "../../../../database/model/Bloc";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import ScreenView from "../../showcase/screen/ScreenView";
import ScreenEdit from "./ScreenEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";
import useUpdateUI from "../../../../hooks/editor/useUpdateUI";

interface ScreenContextEditionProps {
  bloc: BlocObject;
  onChange: (fieldName: string, value: unknown) => void;
}

const ScreenContextEdition: React.FC<ScreenContextEditionProps> = ({
  bloc,
  onChange,
}: ScreenContextEditionProps) => {
  const { handleRemove, handleAdd, onDrop, onDragStart } = useUpdateUI({
    bloc,
    onChange,
  });

  return (
    <EditionDoubleView
      EditComponent={
        <ScreenEdit
          bloc={bloc}
          onChange={onChange}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          isLink={true}
        />
      }
      ViewComponent={<ScreenView bloc={bloc} />}
    />
  );
};
export default ScreenContextEdition;
