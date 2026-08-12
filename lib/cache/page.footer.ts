import { prisma } from "../../prisma/prisma";

const include = { reseaux: true };

export async function getPageFooter() {
  const existing = await prisma.footer.findFirst({
    orderBy: { number_id: "asc" },
    include,
  });
  if (existing) return existing;

  return await prisma.footer.create({
    data: {
      color_background_color: "",
      text_nom_site_adresse: "",
      text_adresse_footer: "",
      text_code_postal: "",
    },
    include,
  });
}
