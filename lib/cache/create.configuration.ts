"use server";

import { revalidateTag } from "next/cache";
import { prisma } from "../../prisma/prisma";
const CONFIGURATION_ID = 1;

export const CONFIGURATION_DEFAUT = {
  number_id: CONFIGURATION_ID,
  number_taille: 16,
  color_main_color: "#000000",
  text_police: "Inter, sans-serif",
};

export async function saveConfiguration(data: {
  number_taille?: number | null;
  color_main_color: string;
  text_police: string;
}) {
  const config = await prisma.configuration.upsert({
    where: { number_id: CONFIGURATION_ID },
    update: data,
    create: { ...CONFIGURATION_DEFAUT, ...data },
  });

    revalidateTag("configuration", { expire: 0 });
    return config;
}
