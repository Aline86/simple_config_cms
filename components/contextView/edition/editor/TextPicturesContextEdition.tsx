"use client";

import { TypeBloc } from "@/model/Page";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";
import { useEffect, useState } from "react";
import { MediaObject } from "@/model/bloc/MediaObject";
import { updateObjectBySetter } from "@/lib/utils/functions";
import { reorderArray } from "@/helpers/changeComponentPosition";
import { BlocObject } from "@/model/Bloc";
import TextEditor from "@/components/contextView/edition/editor/TextEdit";
import TextView from "@/components/contextView/showcase/editor/TextView";
import { cloneMediaWithPosition, createMedia } from "@/helpers/media.helper";
import { updateArticleImages } from "@/helpers/article.media.helper";
import { cloneBlocWithArticles } from "@/helpers/bloc.helper";
import { cloneArticleWithImages } from "@/helpers/article.helper";
interface TextPicturesContextEditionProps {
  bloc: BlocObject;
  onChange: (bloc: BlocObject) => void;
}

const TextPicturesContextEdition: React.FC<TextPicturesContextEditionProps> = ({
  bloc,
  onChange,
}: TextPicturesContextEditionProps) => {
  const [dragged, setDragged] = useState<MediaObject | null>(null);
  console.log("onChange", onChange);
  const onDragStart = (media: MediaObject) => setDragged(media);

  const onDrop = (target: MediaObject) => {
    if (!dragged) return;

    const article = bloc.articles?.[0];
    if (!article) return;

    const reordered = reorderArray(
      article.images,
      dragged,
      target,
      "number_position_image",
    );
    const cleanImages = reordered.map(cloneMediaWithPosition);
    const updatedArticles = updateArticleImages(bloc.articles, 0, cleanImages);
    const updatedBloc = cloneBlocWithArticles(bloc, updatedArticles);

    onChange(updatedBloc); // <-- remonte le bloc mis à jour dans la page
    setDragged(null);
  };

  const updateField = (field: string, value: any) => {
    const updatedBloc = updateObjectBySetter(bloc, field, value);
    onChange(updatedBloc.data);
  };

  const handleAdd = () => {
    const article = bloc.articles?.[0];
    if (!article) return;

    const newMedia = createMedia(article.images.length, bloc.id);
    const updatedArticles = [
      cloneArticleWithImages(article, [...article.images, newMedia]),
    ];
    const updatedBloc = cloneBlocWithArticles(bloc, updatedArticles);

    onChange(updatedBloc);
  };

  const handleRemove = (media: MediaObject) => {
    const article = bloc.articles?.[0];
    if (!article) return;

    const filteredImages = article.images.filter((img) => img.id !== media.id);
    const cleanImages = filteredImages.map(cloneMediaWithPosition);
    const updatedArticles = [cloneArticleWithImages(article, cleanImages)];
    const updatedBloc = cloneBlocWithArticles(bloc, updatedArticles);

    onChange(updatedBloc);
  };

  if (!bloc) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm max-w-[48vw]">
        <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
        <TextEditor
          bloc={bloc}
          onChange={updateField}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <TextView index={0} bloc={bloc} />
      </div>
    </div>
  );
};

export default TextPicturesContextEdition;
