import { prisma } from "../../prisma/prisma";

const include = { favicon: true, logo: true, reseaux: true };

const IMAGE_DEFAUT = {
  text_titre: "",
  image_url: "",
  color_couleur_bg: "",
  text_image_lien: "",
  number_position_image: 0,
};

export async function getPageHeader() {
  const existing = await prisma.header.findFirst({
    orderBy: { number_id: "asc" },
    include,
  });
  if (existing) return existing;

  return await prisma.header.create({
    data: {
      text_nom_site: "",
      text_background_url: "",
      favicon: { create: IMAGE_DEFAUT },
      logo: { create: IMAGE_DEFAUT },
    },
    include,
  });
}
