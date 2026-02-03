"use client";

import { useState, useEffect, useCallback } from "react";
import { cloneArticleWithImages } from "../../../../helpers/article.helper";
import { updateArticleImages } from "../../../../helpers/article.media.helper";
import { cloneBlocWithArticles } from "../../../../helpers/bloc.helper";
import { reorderArray } from "../../../../helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../../../helpers/media.helper";
import { updateObjectBySetter } from "../../../../lib/utils/functions";
import { BlocObject } from "../../../../model/Bloc";
import { MediaObject } from "../../../../model/bloc/MediaObject";
import TextView from "../../showcase/editor/TextView";
import TextEditor from "./TextEdit";
import EditionDoubleView from "../../../ui/EditionDoubleView";

interface TextPicturesContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const TextPicturesContextEdition: React.FC<TextPicturesContextEditionProps> = ({
  bloc,
  onChange,
}: TextPicturesContextEditionProps) => {
  const [dragged, setDragged] = useState<MediaObject | null>(null);
  const [localBloc, setLocalBloc] = useState(bloc);

  // Sync avec le parent uniquement quand l'ID change
  useEffect(() => {
    setLocalBloc(bloc);
  }, [bloc.id]);

  const onDragStart = (media: MediaObject) => setDragged(media);

  const onDrop = useCallback(
    (target: MediaObject) => {
      if (!dragged) return;

      setLocalBloc((prev) => {
        const article = prev.articles?.[0];
        if (!article) return prev;

        const reordered = reorderArray(
          article.images,
          dragged,
          target,
          "number_position_image",
        );
        const cleanImages = reordered.map(cloneMediaWithPosition);
        const updatedArticles = updateArticleImages(
          prev.articles,
          0,
          cleanImages,
        );
        const updatedBloc = cloneBlocWithArticles(prev, updatedArticles);

        onChange(updatedBloc);
        return updatedBloc;
      });

      setDragged(null);
    },
    [dragged, onChange],
  );

  const updateField = useCallback(
    (field: string, value: any) => {
      setLocalBloc((prev) => {
        const updatedBloc = updateObjectBySetter(prev, field, value);
        onChange(updatedBloc.data);
        return updatedBloc.data;
      });
    },
    [onChange],
  );

  const handleAdd = useCallback(() => {
    setLocalBloc((prev) => {
      const article = prev.articles?.[0];
      if (!article) return prev;

      const newMedia = createMedia(article.images.length, prev.id);
      const updatedArticles = [
        cloneArticleWithImages(article, [...article.images, newMedia]),
      ];
      const updatedBloc = cloneBlocWithArticles(prev, updatedArticles);

      onChange(updatedBloc);
      return updatedBloc;
    });
  }, [onChange]);

  const handleRemove = useCallback(
    (media: MediaObject) => {
      setLocalBloc((prev) => {
        const article = prev.articles?.[0];
        if (!article) return prev;

        const filteredImages = article.images.filter(
          (img) => img.id !== media.id,
        );
        const cleanImages = filteredImages.map(cloneMediaWithPosition);
        const updatedArticles = [cloneArticleWithImages(article, cleanImages)];
        const updatedBloc = cloneBlocWithArticles(prev, updatedArticles);

        onChange(updatedBloc);
        return updatedBloc;
      });
    },
    [onChange],
  );
  useEffect(() => {}, [localBloc]);
  return (
    <EditionDoubleView
      EditComponent={
        <TextEditor
          bloc={bloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
        />
      }
      ViewComponent={<TextView bloc={bloc} />}
    />
  );
};

export default TextPicturesContextEdition;
