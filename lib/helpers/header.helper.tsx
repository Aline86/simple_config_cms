import { nanoid } from "nanoid";
import { HeaderObject } from "../../database/model/bloc/Header";
import { MediaObject } from "../../database/model/bloc/MediaObject";

export function cloneHeaderWithReseaux(
  prev: HeaderObject,
  updatedReseaux: MediaObject[],
) {
  return new HeaderObject(
    {
      number_id: prev.number_id ?? undefined,
      text_nom_site: prev.text_nom_site ?? undefined,
      favicon: prev.favicon ?? undefined,
      logo: prev.logo ?? undefined,
      text_background_url: prev.text_background_url ?? undefined,
      reseaux: updatedReseaux,
    },
    "edition",
  );
}

export function cloneHeaderWithReseau(prev: HeaderObject, reseau: MediaObject) {
  return new HeaderObject(
    {
      number_id: prev.number_id ?? undefined,
      text_nom_site: prev.text_nom_site ?? undefined,
      favicon: prev.favicon ?? undefined,
      logo: prev.logo ?? undefined,
      text_background_url: prev.text_background_url ?? undefined,
      reseaux: [...prev.reseaux, reseau],
    },
    "edition",
  );
}
