import { HeaderObject } from "@/model/bloc/Header";
import { MediaObject } from "@/model/bloc/MediaObject";
import { nanoid } from "nanoid";
export function cloneHeaderWithReseaux(
  prev: HeaderObject,
  updatedReseaux: MediaObject[],
) {
  return new HeaderObject({
    id: prev.id ?? undefined,

    nom_site: prev.text_nom_site ?? undefined,
    favicon: prev.image_favicon ?? undefined,
    logo: prev.image_logo ?? undefined,

    background_url: prev.text_background_url ?? undefined,
    reseaux: updatedReseaux,
  });
}

export function cloneHeaderWithReseau(prev: HeaderObject, reseau: MediaObject) {
  return new HeaderObject({
    id: prev.id ?? undefined,
    bloc_id: prev.text_bloc_id ?? undefined,
    nom_site: prev.text_nom_site ?? undefined,
    favicon: prev.image_favicon ?? undefined,
    logo: prev.image_logo ?? undefined,
    background_url: prev.text_background_url ?? undefined,
    reseaux: [...prev.image_reseaux, reseau],
  });
}

export function mockHeader(idBloc: string) {
  return new HeaderObject({
    id: idBloc,

    nom_site: "test nom site",
    favicon: new MediaObject({
      id: nanoid(),
      bloc_id: idBloc,
      text_titre: "paysage",
      image_lien: "#",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
    }),
    logo: new MediaObject({
      id: nanoid(),
      bloc_id: idBloc,
      text_titre: "paysage",
      image_lien: "#",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
    }),
    text_description: "",
    reseaux: [
      new MediaObject({
        id: nanoid(),
        bloc_id: idBloc,
        text_titre: "paysage",
        image_lien: "#",
        number_position_image: 0,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      }),
      new MediaObject({
        id: nanoid(),
        bloc_id: idBloc,
        text_titre: "paysage",
        image_lien: "#",
        number_position_image: 1,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      }),
    ],
  });
}
