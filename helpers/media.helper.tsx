import { MediaObject } from "@/model/bloc/MediaObject";

export function cloneMediaWithPosition(media: MediaObject, position: number) {
  return new MediaObject({
    id: media.number_id,
    bloc_id: media.number_bloc_id,
    titre: media.text_titre ?? undefined,
    image_lien: media.text_image_lien ?? undefined,
    image_url: media.image_image_url ?? undefined,
    position_image: position,
  });
}

export function createMedia(position: number, bloc_id: string | null) {
  const minW = 200;
  const maxW = 600;
  const minH = 150;
  const maxH = 400;

  const width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
  const height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
  const image_url = `https://picsum.photos/${width}/${height}?random=${Date.now()}-${position}`;
  return new MediaObject({
    id: crypto.randomUUID(),
    bloc_id: bloc_id,
    titre: "",
    image_lien: "#",
    image_url: image_url,
    position_image: position,
  });
}
