import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { BlocObject } from "@/model/Bloc";
import { PageObject } from "@/model/Page";

export async function GET() {
  try {
    const dbPages = await prisma.page.findMany({
      orderBy: {
        number_page_position: "asc", // ✅ Changé de number_page_position
      },
    });

    const pages = dbPages.map((dbPage) => {
      const blocs =
        typeof dbPage.blocs === "string"
          ? JSON.parse(dbPage.blocs).map((b: any) => new BlocObject(b))
          : [];

      return new PageObject({
        id: dbPage.number_id, // ✅ Changé de id
        parent_id: dbPage.number_parent_id, // ✅ Changé de parent_id
        published: dbPage.checkbox_published, // ✅ Changé de published
        text_titre: dbPage.text_titre, // ✅ Changé de text_titre
        text_description: dbPage.text_description ?? "", // ✅ Changé de text_titre
        slug: dbPage.text_slug, // ✅ Changé de slug
        number_page_position: dbPage.number_page_position, // ✅ Changé de number_page_position
        langue: dbPage.text_langue, // ✅ Changé de langue
        text_createdAt: dbPage.text_createdAt, // ✅ Changé de text_createdAt
        text_updatedAt: dbPage.text_updatedAt, // ✅ Changé de text_updatedAt
        blocs,
      });
    });

    return NextResponse.json(pages);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
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

    const createdPages: any[] = [];
    const updates: Promise<any>[] = [];

    for (const p of pagesPayload) {
      const page = p instanceof PageObject ? p : new PageObject(p);

      console.log("🔍 Processing page:", {
        number_id: page.number_id,
        text_titre: page.text_titre,
        text_slug: page.text_slug,
      });

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
              text_titre: page.text_titre ?? "",
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
              text_titre: page.text_titre ?? "",
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
    console.error("❌ POST /api/edition/pages error:", err);

    // ✅ Gérer l'erreur de slug unique
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Un slug en doublon a été détecté" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
