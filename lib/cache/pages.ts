import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "../../prisma/prisma";

export async function getPages(parent_id?: string) {
  "use cache";

  let dbPages = [];
  if (parent_id !== undefined && parent_id !== null) {
    cacheTag(`pages:${parent_id}`);
    cacheLife("max");
    dbPages = await prisma.page.findMany({
      where: {
        number_parent_id: Number(parent_id),
      },
      orderBy: {
        number_page_position: "asc",
      },
    });
  } else {
    cacheTag(`pages`);
    cacheLife("max");
    dbPages = await prisma.page.findMany({
      where: {
        number_parent_id: null,
      },
      orderBy: {
        number_page_position: "asc",
      },
    });
  }

  return dbPages;
}
