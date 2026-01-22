import { HeaderObject } from "@/model/bloc/Header";
import { MediaObject } from "@/model/bloc/MediaObject";

export function cloneHeaderWithReseaux(
  prev: HeaderObject,
  updatedReseaux: MediaObject[],
) {
  return new HeaderObject({
    id: prev.number_id ?? undefined,
    bloc_id: prev.number_bloc_id ?? undefined,
    nom_site: prev.text_nom_site ?? undefined,
    favicon: prev.image_favicon ?? undefined,
    logo: prev.image_logo ?? undefined,

    background_url: prev.text_background_url ?? undefined,
    reseaux: updatedReseaux,
  });
}

export function cloneHeaderWithReseau(prev: HeaderObject, reseau: MediaObject) {
  return new HeaderObject({
    id: prev.number_id ?? undefined,
    bloc_id: prev.number_bloc_id ?? undefined,
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
      id: crypto.randomUUID(),
      bloc_id: idBloc,
      titre: "paysage",
      image_lien: "#",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
    }),
    logo: new MediaObject({
      id: crypto.randomUUID(),
      bloc_id: idBloc,
      titre: "paysage",
      image_lien: "#",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
    }),
    description: "",
    reseaux: [
      new MediaObject({
        id: crypto.randomUUID(),
        bloc_id: idBloc,
        titre: "paysage",
        image_lien: "#",
        position_image: 0,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      }),
      new MediaObject({
        id: crypto.randomUUID(),
        bloc_id: idBloc,
        titre: "paysage",
        image_lien: "#",
        position_image: 1,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      }),
    ],
  });
}
