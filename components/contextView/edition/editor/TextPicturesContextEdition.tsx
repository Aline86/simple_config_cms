"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cloneArticleWithImages } from "../../../../lib/helpers/article.helper";
import { updateArticleImages } from "../../../../lib/helpers/article.media.helper";
import { cloneBlocWithArticles } from "../../../../lib/helpers/bloc.helper";
import { reorderArray } from "../../../../lib/helpers/changeComponentPosition";
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
  onDelete?: (bloc: BlocObject) => void;
}

const TextPicturesContextEdition: React.FC<TextPicturesContextEditionProps> = ({
  bloc,
  onChange,
  onDelete,
}: TextPicturesContextEditionProps) => {
  const [dragged, setDragged] = useState<MediaObject | null>(null);

  const onDragStart = (media: MediaObject) => {
    setDragged(media);
  };

  const onDrop = useCallback(
    (target: MediaObject) => {
      if (!dragged) return;

      const article = bloc.articles[0];

      const reordered = reorderArray(
        article.images,
        dragged,
        target,
        "number_position_image",
      );
      const cleanImages = reordered.map(cloneMediaWithPosition);
      const updatedArticles = updateArticleImages(
        bloc.articles,
        0,
        cleanImages,
      );
      const updatedBloc = cloneBlocWithArticles(bloc, updatedArticles);

      onChange("blocs." + bloc.bloc_position, updatedBloc);
      return updatedBloc;

      setDragged(null);
    },
    [dragged, onChange],
  );

  const handleAdd = useCallback(() => {
    const article = bloc.articles[0];
    if (!article) return bloc;

    const newMedia = createMedia(article.images.length, bloc.id);
    const updatedArticles = [
      cloneArticleWithImages(article, [...article.images, newMedia]),
    ];
    const updatedBloc = cloneBlocWithArticles(bloc, updatedArticles);

    onChange("blocs." + bloc.bloc_position, updatedBloc);
  }, [onChange]);

  const handleRemove = useCallback(
    (media: MediaObject) => {
      const article = bloc.articles?.[0];
      if (!article) return bloc;

      const filteredImages = article.images.filter(
        (img) => img.id !== media.id,
      );
      const cleanImages = filteredImages.map(cloneMediaWithPosition);
      const updatedArticles = [cloneArticleWithImages(article, cleanImages)];
      const updatedBloc = cloneBlocWithArticles(bloc, updatedArticles);

      onChange("blocs." + bloc.bloc_position, updatedBloc);
    },
    [onChange],
  );

  return (
    <EditionDoubleView
      EditComponent={
        <TextEditor
          bloc={bloc}
          onChange={onChange}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          onDelete={onDelete}
        />
      }
      ViewComponent={<TextView bloc={bloc} />}
    />
  );
};

export default TextPicturesContextEdition;
