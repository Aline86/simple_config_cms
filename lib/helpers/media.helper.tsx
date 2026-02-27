import { nanoid } from "nanoid";
import { MediaObject } from "../../database/model/bloc/MediaObject";
import { stripImmerable } from "./stripImmarable";

export function cloneMediaWithPosition(media: MediaObject, position: number) {
  return new MediaObject({
    ...stripImmerable(media),
    number_position_image: position,
  });
}

export function createMedia(position: number, bloc_id: string | number | null) {
  const minW = 200;
  const maxW = 600;
  const minH = 150;
  const maxH = 400;

  const width = Math.floor(Math.random() * (maxW - minW + 1)) + minW;
  const height = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
  const image_url = `https://picsum.photos/${width}/${height}?random=${Date.now()}-${position}`;

  return new MediaObject({
    id: nanoid(),
    text_bloc_id: bloc_id,
    text_titre: "",
    text_image_lien: "#",
    image_url: image_url,
    number_position_image: position,
  });
}
