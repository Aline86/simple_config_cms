import { FooterObject } from "../../database/model/bloc/Footer";
import { MediaObject } from "../../database/model/bloc/MediaObject";

export function cloneFooterWithReseaux(
  prev: FooterObject,
  updatedReseaux: MediaObject[],
) {
  return new FooterObject(
    {
      number_id: prev.number_id ?? undefined,
      text_nom_site_adresse: prev.text_nom_site_adresse ?? undefined,
      color_background_color: prev.color_background_color ?? undefined,
      text_adresse_footer: prev.text_adresse_footer ?? undefined,
      text_code_postal: prev.text_code_postal ?? undefined,
      reseaux: updatedReseaux,
    },
    "edition",
  );
}

export function cloneFooterWithReseau(prev: FooterObject, reseau: MediaObject) {
  return new FooterObject(
    {
      number_id: prev.number_id ?? undefined,
      text_nom_site_adresse: prev.text_nom_site_adresse ?? undefined,
      color_background_color: prev.color_background_color ?? undefined,
      text_adresse_footer: prev.text_adresse_footer ?? undefined,
      text_code_postal: prev.text_code_postal ?? undefined,

      reseaux: [...prev.reseaux, reseau],
    },
    "edition",
  );
}
