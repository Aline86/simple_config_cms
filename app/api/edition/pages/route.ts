import { NextRequest, NextResponse } from "next/server";
import { BlocObject } from "../../../../model/Bloc";
import { PageObject } from "../../../../model/Page";
import { prisma } from "./../../../../lib/prisma/prisma";
import { ApiResponse } from "../../../../helpers/errorHandling";

export async function GET(request: NextRequest) {
  return ApiResponse.handle(async () => {
    const { searchParams } = new URL(request.url);
    const with_homepage = searchParams.get("with_homepage");

    let dbPages = [];
    if (with_homepage === "without_homepage") {
      dbPages = await prisma.page.findMany({
        where: {
          checkbox_home_page: false,
        },
        orderBy: {
          number_page_position: "asc",
        },
      });
    } else {
      dbPages = await prisma.page.findMany({
        orderBy: {
          number_page_position: "asc",
        },
      });
    }

    return dbPages.map((dbPage) => ({
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
      blocs: typeof dbPage.blocs === "string" ? JSON.parse(dbPage.blocs) : [],
    }));
  });
}

export async function POST(request: NextRequest) {
  try {
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
        console.error("❌ Validation failed for page:", page);
        return NextResponse.json(
          { error: "Validation failed", page: p },
          { status: 400 },
        );
      }
    }

    const allPages = await Promise.all(
      pagesPayload.map(async (p) => {
        const page = new PageObject(p);

        if (!page.validateAll()) {
          throw new Error(`Validation failed for page ${page.text_titre}`);
        }

        const isUpdate =
          page.number_id !== null &&
          page.number_id !== undefined &&
          page.number_id > 0;

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
        } else {
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
        }
      }),
    );

    return NextResponse.json(allPages, {
      status: 201,
    });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Un slug en doublon a été détecté" },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: "Pages non trouvée" }, { status: 404 });
  }
}
