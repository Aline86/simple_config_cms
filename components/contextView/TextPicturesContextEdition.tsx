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

export default function Page() {
  const options_text: CreateBlocOptions = {
    page_id: crypto.randomUUID(),
    bloc_position: 0,
    nom_bloc: "texte",
    type: TypeBloc.TEXTE,
    articleCount: 1,
    mediaPerArticle: 4,
  };
  const bloc = createNewBloc(options_text);
  const [text, setText] = useState<BlocObject | null>(null);
  const [dragged, setDragged] = useState<MediaObject | null>(null);
  const debug = false;
  const onDragStart = (media: MediaObject) => {
    setDragged(media);
  };

  const onDrop = (target: MediaObject) => {
    if (!dragged) return;

    setText((prev) => {
      if (!prev || !prev.articles?.length) return prev;
      const article = prev.articles[0];
      const reordered = reorderArray(article.images, dragged, target);
      const cleanImages = reordered.map(cloneMediaWithPosition);
      const updatedArticles = updateArticleImages(
        prev.articles,
        0,
        cleanImages,
      );

      return cloneBlocWithArticles(prev, updatedArticles);
    });

    setDragged(null);
  };

  const updateObject = (fieldName: string, newValue: any) => {
    if (!text) return;
    const newObj = updateObjectBySetter(text, fieldName, newValue);
    setText(newObj.data);
  };
  const handleAdd = () => {
    setText((prev) => {
      if (!prev || !prev.articles?.length) return prev;
      const article = prev.articles[0];
      const newMedia = createMedia(article.images.length, prev.number_id);
      const updatedArticles = [
        cloneArticleWithImages(article, [...article.images, newMedia]),
      ];

      return cloneBlocWithArticles(prev, updatedArticles);
    });
  };

  const handleRemove = (model: MediaObject) => {
    setText((prev) => {
      if (!prev || !prev.articles?.length) return prev;
      const updatedArticles = prev.articles.map((article, articleIndex) => {
        if (articleIndex !== 0) return article;
        const filteredImages = article.images.filter(
          (img) => img.number_id !== model.number_id,
        );
        const cleanImages = filteredImages.map(cloneMediaWithPosition);

        return cloneArticleWithImages(article, cleanImages);
      });

      return cloneBlocWithArticles(prev, updatedArticles);
    });
  };

  useEffect(() => {
    setText(bloc);
  }, []);

  if (!text) {
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
      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm max-w-[48vw]">
        <h2 className="text-lg font-semibold mb-4">Éditeur</h2>
        <TextEditor
          text={text}
          onChange={updateObject}
          addElement={handleAdd}
          removeElement={handleRemove}
          onDrop={onDrop}
          onDragStart={onDragStart}
          debug={debug}
        />
      </div>

      <div className="flex-1 rounded-lg border p-4 bg-background shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Aperçu</h2>
        <TextView index={0} bloc={text} />
      </div>
    </div>
  );
}
