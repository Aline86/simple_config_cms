
import { cacheTag, cacheLife } from "next/cache";
import { prisma } from "../../prisma/prisma";


export async function getHomePage() {
  "use cache";
  cacheTag("page:home");
  cacheLife("max");

  return prisma.page.findFirst({
    where: { checkbox_home_page: true },
  });
}
