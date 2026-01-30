import { HeaderObject } from "@/model/bloc/Header";
import { MediaObject } from "@/model/bloc/MediaObject";
import { nanoid } from "nanoid";

export function cloneHeaderWithReseaux(
  prev: HeaderObject,
  updatedReseaux: MediaObject[],
) {
  return new HeaderObject({
    number_id: prev.number_id ?? undefined,
    text_nom_site: prev.text_nom_site ?? undefined,
    image_favicon: prev.image_favicon ?? undefined,
    image_logo: prev.image_logo ?? undefined,
    text_background_url: prev.text_background_url ?? undefined,
    reseaux: updatedReseaux,
  });
}

export function cloneHeaderWithReseau(prev: HeaderObject, reseau: MediaObject) {
  return new HeaderObject({
    number_id: prev.number_id ?? undefined,
    text_nom_site: prev.text_nom_site ?? undefined,
    image_favicon: prev.image_favicon ?? undefined,
    image_logo: prev.image_logo ?? undefined,
    text_background_url: prev.text_background_url ?? undefined,
    reseaux: [...prev.reseaux, reseau],
  });
}

export function mockHeader() {
  const headerId = nanoid();

  return new HeaderObject({
    number_id: undefined, // Auto-généré par la DB
    text_nom_site: "test nom site",
    image_favicon: new MediaObject({
      number_id: undefined,
      text_titre: "Favicon",
      text_image_lien: "#",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      color_couleur_bg: "#ffffff",
      number_position_image: 0,
    }),
    image_logo: new MediaObject({
      number_id: undefined,
      text_titre: "Logo",
      text_image_lien: "#",
      image_url:
        "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
      color_couleur_bg: "#ffffff",
      number_position_image: 0,
    }),
    text_background_url: "https://example.com/background.jpg",
    reseaux: [
      new MediaObject({
        number_id: undefined,
        text_titre: "Facebook",
        text_image_lien: "https://facebook.com",
        number_position_image: 0,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
        color_couleur_bg: "#1877f2",
      }),
      new MediaObject({
        number_id: undefined,
        text_titre: "Twitter",
        text_image_lien: "https://twitter.com",
        number_position_image: 1,
        image_url:
          "https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/kitten.jpg",
        color_couleur_bg: "#1da1f2",
      }),
    ],
  });
}
