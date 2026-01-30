import { FooterObject } from "@/model/bloc/Footer";
import { MediaObject } from "@/model/bloc/MediaObject";
import { nanoid } from "nanoid";

export function cloneFooterWithReseaux(
  prev: FooterObject,
  updatedReseaux: MediaObject[],
) {
  return new FooterObject({
    id: prev.id ?? undefined,
    nom_site_adresse: prev.text_nom_site_adresse ?? undefined,
    color_background_color: prev.color_background_color ?? undefined,
    adresse_footer: prev.text_adresse_footer ?? undefined,
    code_postal: prev.text_code_postal ?? undefined,
    reseaux: updatedReseaux,
  });
}

export function cloneFooterWithReseau(prev: FooterObject, reseau: MediaObject) {
  return new FooterObject({
    id: prev.id ?? undefined,
    nom_site_adresse: prev.text_nom_site_adresse ?? undefined,
    color_background_color: prev.color_background_color ?? undefined,
    adresse_footer: prev.text_adresse_footer ?? undefined,
    code_postal: prev.text_code_postal ?? undefined,

    reseaux: [...prev.reseaux, reseau],
  });
}

export function mockFooter(idBloc: string) {
  return new FooterObject({
    id: idBloc,
    color_background_color: "#ffffff",
    nom_site_adresse: "",
    adresse_footer: "",
    code_postal: "",
    reseaux: [
      new MediaObject({
        id: nanoid(),

        text_titre: "paysage",
        text_image_lien: "#",
        number_position_image: 0,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      }),
      new MediaObject({
        id: nanoid(),

        text_titre: "paysage",
        text_image_lien: "#",
        number_position_image: 1,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      }),
    ],
  });
}
