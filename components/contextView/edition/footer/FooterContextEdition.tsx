"use client";

import { useState, useEffect, useCallback } from "react";
import { deleteItemAndReorder } from "../../../../lib/helpers/changeComponentPosition";
import {
  cloneFooterWithReseau,
  cloneFooterWithReseaux,
} from "../../../../lib/helpers/footer.helper";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../lib/helpers/media.helper";
import { updateObjectBySetter } from "../../../../lib/helpers/tiptapAndSetterFunctions";
import { FooterObject } from "../../../../database/model/bloc/Footer";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import FooterView from "../../showcase/footer/FooterView";
import FooterEdit from "./FooterEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";
import useUpdateUI from "../../../../hooks/editor/useUpdateUI";

interface FooterContextEditionProps {
  bloc: FooterObject;
  onChange: (fieldName: string, newValue: unknown) => void;
}

const FooterContextEdition: React.FC<FooterContextEditionProps> = ({
  bloc,
  onChange,
}: FooterContextEditionProps) => {
  const { handleRemove, handleAdd } = useUpdateUI({ bloc, onChange });

  return (
    <EditionDoubleView
      EditComponent={
        <FooterEdit
          footer={bloc}
          onChange={onChange}
          addElement={handleAdd}
          removeElement={handleRemove}
        />
      }
      ViewComponent={<FooterView footer={bloc} />}
    />
  );
};
export default FooterContextEdition;
