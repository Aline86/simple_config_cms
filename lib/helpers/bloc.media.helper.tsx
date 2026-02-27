import { immerable } from "immer";
import { BlocObject } from "../../database/model/Bloc";
import { MediaObject } from "../../database/model/bloc/MediaObject";

export function updateBlocImages(
  bloc: BlocObject,
  index: number,
  image: MediaObject,
) {
  const { mode, articles, image_medias, [immerable]: _, ...rest } = bloc as any;
  const newImageMedias = [...image_medias];
  newImageMedias[index] = image;

  return new BlocObject(
    {
      ...rest,
      image_medias: newImageMedias,
      articles,
      text_updatedAt: new Date(),
    },
    mode,
  );
}
