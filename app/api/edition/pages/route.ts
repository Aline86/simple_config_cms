import { NextRequest, NextResponse } from "next/server";
import { BlocObject } from "../../../../database/model/Bloc";
import { PageObject } from "../../../../database/model/Page";
import { prisma } from "../../../../prisma/prisma";
import { ApiResponse } from "../../../../lib/helpers/ApiResponse";
import { requireAuth } from "../requireAuth";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  return ApiResponse.handle(
    async () => {
      const { searchParams } = new URL(request.url);
      const parent_id = searchParams.get("parent_id");
      console.log("inside", parent_id);
      let dbPages = [];
      if (parent_id !== null) {
        dbPages = dbPages = await prisma.page.findMany({
          where: {
            number_parent_id: Number(parent_id),
          },
          orderBy: {
            number_page_position: "asc",
          },
        });
      } else {
        dbPages = await prisma.page.findMany({
          where: {
            number_parent_id: null,
          },
          orderBy: {
            number_page_position: "asc",
          },
        });
      }
      const pages = dbPages.map((dbPage) => {
        const blocs =
          typeof dbPage.blocs === "string"
            ? JSON.parse(dbPage.blocs).map((b: BlocObject) => new BlocObject(b))
            : [];

        return new PageObject({
          id: dbPage.number_id,
          parent_id: dbPage.number_parent_id,
          published: dbPage.checkbox_published,
          checkbox_home_page: dbPage.checkbox_home_page,
          text_titre: dbPage.text_titre,
          text_description: dbPage.text_description ?? "",
          slug: dbPage.text_slug,
          number_page_position: dbPage.number_page_position,
          langue: dbPage.text_langue,
          text_createdAt: dbPage.text_createdAt,
          text_updatedAt: dbPage.text_updatedAt,
          blocs,
        });
      });

      return {
        message: "Pages got",
        pages: {
          ...pages,
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

export async function POST(request: NextRequest) {
  await requireAuth(request);
  return ApiResponse.handle(
    async () => {
      await requireAuth(request);
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
