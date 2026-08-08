import { cacheTag, cacheLife } from "next/cache";
import { prisma } from "../../prisma/prisma";

export async function getPageFooter() {
  "use cache";
  cacheTag("footer");
  cacheLife("max");

  return await prisma.footer.findFirst({
    orderBy: {
      number_id: "asc",
    },
    include: {
      reseaux: true,
    },
  });
}
