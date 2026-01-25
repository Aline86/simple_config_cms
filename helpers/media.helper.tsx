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
  return new MediaObject({
    id: crypto.randomUUID(),
    bloc_id: bloc_id,
    titre: "",
    image_lien: "#",
    image_url: `https://picsum.photos/300/200?random=${Date.now()}-${position}`,
    position_image: position,
  });
}
