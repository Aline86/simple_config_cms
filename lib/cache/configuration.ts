import { cacheTag, cacheLife } from "next/cache";
import { prisma } from "../../prisma/prisma";


async function readConfiguration() {
  "use cache";
  cacheTag("configuration");

  const config = await prisma.configuration.findUnique({
    where: { number_id: CONFIGURATION_ID },
  });

  if (!config) {
    cacheLife("seconds");
    return null;
  }

  cacheLife("max");
  return config;
}

export async function getConfiguration() {
  const existing = await readConfiguration();
  if (existing) return existing;

  return await prisma.configuration.create({
    data: { number_id: CONFIGURATION_ID, ...CONFIGURATION_DEFAUT },
  });
}
