"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cloneArticleWithImages } from "../../../../lib/helpers/article.helper";
import { updateArticleImages } from "../../../../lib/helpers/article.media.helper";
import { cloneBlocWithArticles } from "../../../../lib/helpers/bloc.helper";
import {
  deleteItemAndReorder,
  reorderArray,
} from "../../../../lib/helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../lib/helpers/media.helper";
import { BlocObject } from "../../../../database/model/Bloc";
import { MediaObject } from "../../../../database/model/bloc/MediaObject";
import TextView from "../../showcase/editor/TextView";
import TextEditor from "./TextEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";

interface TextPicturesContextEditionProps {
  bloc: BlocObject;
  onChange: (fieldName: string, newValue: unknown) => void;
  addElement: () => void;
  removeElement: (media: MediaObject) => void;
  onDragStart: (page: MediaObject) => void;
  onDrop: (page: MediaObject) => void;
  debug?: boolean;
  onDelete?: (bloc: BlocObject) => void;
}

const TextPicturesContextEdition: React.FC<TextPicturesContextEditionProps> = ({
  bloc,
  onChange,
  addElement,
  removeElement,
  onDragStart,
  onDrop,
  debug = false,
}: TextPicturesContextEditionProps) => {
  return (
    <EditionDoubleView
      EditComponent={
        <TextEditor
          bloc={bloc}
          onChange={onChange}
          addElement={addElement}
          removeElement={removeElement}
          onDrop={onDrop}
          onDragStart={onDragStart}
        />
      }
      ViewComponent={<TextView bloc={bloc} />}
    />
  );
};

export default TextPicturesContextEdition;
