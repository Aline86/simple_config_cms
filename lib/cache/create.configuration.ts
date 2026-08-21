"use server";

import { revalidateTag } from "next/cache";
import { prisma } from "../../prisma/prisma";

export async function saveConfiguration(data: {
  number_taille?: number | null;
  color_main_color: string;
  text_police: string;
}) {
  const config = await prisma.configuration.upsert({
    where: { number_id: CONFIGURATION_ID },
    update: data,
    create: { number_id: CONFIGURATION_ID, ...CONFIGURATION_DEFAUT, ...data },
  });

  revalidateTag("configuration", { expire: 0 });
  return config;
}
