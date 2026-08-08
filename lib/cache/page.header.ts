import { cacheTag, cacheLife } from "next/cache";
import { prisma } from "../../prisma/prisma";


export async function getPageHeader() {
  "use cache";
  cacheTag("header");
  cacheLife("max");
  return await prisma.header.findFirst({
    orderBy: {
      number_id: "asc",
    },
    include: {
      favicon: true,
      logo: true,
      reseaux: true,
    },
  });
    
    
    
}
