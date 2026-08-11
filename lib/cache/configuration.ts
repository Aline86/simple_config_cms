import { cacheTag, cacheLife } from "next/cache";
import { prisma } from "../../prisma/prisma";

const CONFIGURATION_ID = 1;

export async function getConfiguration() {
  "use cache";
  cacheTag("configuration");
  cacheLife("max");

  return await prisma.configuration.findUnique({
    where: { number_id: CONFIGURATION_ID },
  });
}
