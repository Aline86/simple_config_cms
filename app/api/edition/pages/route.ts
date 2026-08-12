import { NextRequest, NextResponse } from "next/server";
import { PageObject } from "../../../../database/model/Page";
import { prisma } from "../../../../prisma/prisma";
import { ApiResponse } from "../../../../lib/helpers/ApiResponse";
import { requireAuth } from "../requireAuth";
import { BlocObject } from "../../../../database/model/Bloc";
import { revalidateTag } from "next/cache";
import { getPages } from "../../../../lib/cache/pages";
import { getPagesData } from "../../../../lib/helpers/api/pages.data";

export async function GET(request: NextRequest) {
  await requireAuth(request);
  return getPagesData(request);
}
export async function POST(request: NextRequest) {
  await requireAuth(request);
  return ApiResponse.handle(
    async () => {
      const body = await request.json();
      const pagesPayload = Array.isArray(body) ? body : body.data;

      if (!Array.isArray(pagesPayload)) {
        return NextResponse.json(
          { error: "Payload must be an array of pages" },
          { status: 400 },
        );
      }

      for (const p of pagesPayload) {
        const page = p instanceof PageObject ? p : new PageObject(p);

        if (!page.validateAll()) {
          console.error("Validation failed for page:", page);
          return NextResponse.json(
            { error: "Validation failed", page: p },
            { status: 400 },
          );
        }
      }

      const allPages = await Promise.all(
        pagesPayload.map(async (p) => {
          const page = new PageObject(p);

          const isUpdate = page.number_id !== null && page.number_id > 0;

          if (isUpdate) {
            return prisma.page.update({
              where: { number_id: Number(page.number_id) },
              data: {
                number_parent_id:
                  page.number_parent_id === -1 ? null : page.number_parent_id,
                checkbox_published: page.checkbox_published,
                checkbox_home_page: page.checkbox_home_page,
                text_titre: page.text_titre ?? "",
                text_description: page.text_description ?? "",
                text_slug: page.text_slug ?? "",
                number_page_position: page.number_page_position ?? 0,
                text_langue: page.text_langue ?? "fr_FR",
                blocs: JSON.stringify(page.blocs.map((b) => b.toJSON())),
                text_updatedAt: new Date(),
              },
            });
          } else if (page.text_titre.trim() !== "") {
            return prisma.page.create({
              data: {
                number_parent_id:
                  page.number_parent_id === -1 ? null : page.number_parent_id,
                checkbox_published: page.checkbox_published,
                checkbox_home_page: page.checkbox_home_page,
                text_titre: page.text_titre ?? "",
                text_description: page.text_description ?? "",
                text_slug: page.text_slug ?? "",
                number_page_position: page.number_page_position ?? 0,
                text_langue: page.text_langue ?? "fr_FR",
                blocs: JSON.stringify(page.blocs.map((b) => b.toJSON())),
                text_createdAt: new Date(),
                text_updatedAt: new Date(),
              },
            });
          } else {
            return NextResponse.json(
              { error: "Validation failed", page: p },
              { status: 400 },
            );
          }
        }),
      );

      revalidateTag(`pages:${pagesPayload}`, { expire: 0 });

      return {
        message: "Pages got",
        pages: {
          ...allPages,
        },
      };
    },
    {
      errorHandler: (err) => {
        return ApiResponse.handlePrismaError(err);
      },
    },
  );
}
