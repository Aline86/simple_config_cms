import { cacheTag, cacheLife } from "next/cache";
import { prisma } from "../../prisma/prisma";

export async function getPageBySlug(slug: string) {
  "use cache";
  cacheTag(`text_slug:${slug}`);
  cacheLife("max");


  return prisma.page.findFirst({ where: { text_slug: slug } });
}
