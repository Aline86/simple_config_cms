import { useState, useCallback, useMemo } from "react";
import {
  cloneBlocWithMedias,
  cloneBlocWithArticles,
} from "../../lib/helpers/bloc.helper";
import { cloneArticleWithImages } from "../../lib/helpers/article.helper";
import {
  deleteItemAndReorder,
  reorderArray,
} from "../../lib/helpers/changeComponentPosition";
import {
  cloneMediaWithPosition,
  createMedia,
} from "../../lib/helpers/media.helper";
import { BlocObject } from "../../database/model/Bloc";
import { MediaObject } from "../../database/model/bloc/MediaObject";
import { HeaderObject } from "../../database/model/bloc/Header";
import { FooterObject } from "../../database/model/bloc/Footer";
import { cloneHeaderWithReseaux } from "../../lib/helpers/header.helper";
import { cloneFooterWithReseaux } from "../../lib/helpers/footer.helper";
import { collectionForBlocType } from "../../lib/config/blocMediaSource";

type Container = BlocObject | HeaderObject | FooterObject;

interface UseUpdateUIProps {
  bloc: Container;
  onChange: (fieldName: string, newValue: unknown) => void;
}

interface ResolvedCollection {
  medias: MediaObject[];
  propertyName: string;
  parentId: string | number | null;
  apply: (medias: MediaObject[]) => unknown;
}

const POSITION_KEY = "number_position_image" as const;

function resolveCollection(bloc: Container): ResolvedCollection {
  if (bloc instanceof BlocObject) {
    const propertyName = `blocs.${bloc.bloc_position}`;
    const collection = collectionForBlocType(bloc.type as string);

    if (collection.kind === "articleImages") {
      const { index } = collection;
      const article = bloc.articles[index];

      return {
        medias: article?.images ?? [],
        propertyName,
        parentId: bloc.id,
        apply: (medias) => {
          if (!article) return bloc;
          const updatedArticles = bloc.articles.map((a, i) =>
            i === index ? cloneArticleWithImages(a, medias) : a,
          );
          return cloneBlocWithArticles(bloc, updatedArticles);
        },
      };
    }

    return {
      medias: bloc.image_medias,
      propertyName,
      parentId: bloc.id,
      apply: (medias) => cloneBlocWithMedias(bloc, medias),
    };
  }

  return {
    medias: bloc.reseaux,
    propertyName: "reseaux",
    parentId: bloc.number_id,
    apply: (medias) =>
      bloc instanceof HeaderObject
        ? cloneHeaderWithReseaux(bloc, medias).reseaux
        : cloneFooterWithReseaux(bloc, medias).reseaux,
  };
}

const useUpdateUI = ({ bloc, onChange }: UseUpdateUIProps) => {
  const [dragged, setDragged] = useState<MediaObject | null>(null);

  const target = useMemo(() => resolveCollection(bloc), [bloc]);

  const commit = useCallback(
    (updatedMedias: MediaObject[]) => {
      onChange(target.propertyName, target.apply(updatedMedias));
    },
    [target, onChange],
  );

  const onDragStart = useCallback((media: MediaObject) => {
    setDragged(media);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragged(null);
  }, []);

  const onDrop = useCallback(
    (dropTarget: MediaObject) => {
      if (!dragged) return;

      const reordered = reorderArray(
        target.medias,
        dragged,
        dropTarget,
        POSITION_KEY,
      );

      commit(reordered.map((m, i) => cloneMediaWithPosition(m, i)));
      setDragged(null);
    },
    [dragged, target, commit],
  );

  const handleAdd = useCallback(() => {
    const newMedia = createMedia(target.medias.length, target.parentId);
    commit([...target.medias, newMedia]);
  }, [target, commit]);

  const handleRemove = useCallback(
    (media: MediaObject) => {
      commit(deleteItemAndReorder(target.medias, media, POSITION_KEY));
    },
    [target, commit],
  );

  return {
    dragged,
    medias: target.medias,
    handleAdd,
    handleRemove,
    onDrop,
    onDragStart,
    onDragEnd,
  };
};

export default useUpdateUI;
