import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { BlocObject } from "@/model/Bloc";
import { PageObject } from "@/model/Page";

// GET /api/edition/pages?id=123
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const dbPage = await prisma.page.findUnique({
      where: { id: Number(id) },
    });

    if (!dbPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const blocs =
      typeof dbPage.blocs === "string"
        ? JSON.parse(dbPage.blocs).map((b: any) => new BlocObject(b))
        : [];

    const page = new PageObject({
      id: dbPage.id,
      parent_id: dbPage.parent_id,
      published: dbPage.published,
      titre: dbPage.titre,
      slug: dbPage.slug,
      page_position: dbPage.page_position,
      langue: dbPage.langue,
      createdAt: dbPage.createdAt,
      updatedAt: dbPage.updatedAt,
      blocs,
    });

    return NextResponse.json(page);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST /api/edition/pages
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

    for (const p of pagesPayload) {
      const page = new PageObject(p);

      if (!page.validateAll()) {
        return NextResponse.json(
          { error: "Validation failed", page: p },
          { status: 400 },
        );
      }

      const newPage = await prisma.page.create({
        data: {
          parent_id:
            page.number_parent_id === -1 ? null : page.number_parent_id,
          published: page.checkbox_published,
          titre: page.text_titre ?? "",
          slug: page.text_slug ?? "",
          page_position: page.number_page_position ?? 0,
          langue: page.text_langue ?? "fr_FR",
          blocs: JSON.stringify(page.blocs),
          createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
          updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        },
      });

      createdPages.push(newPage);
    }

    return NextResponse.json(createdPages, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT /api/edition/pages
export async function PUT(request: NextRequest) {
  try {
    const pages = await request.json();

    if (!Array.isArray(pages)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const updates = [];

    for (const p of pages) {
      const page = new PageObject(p);

      if (!page.validateAll()) {
        return NextResponse.json(
          {
            error: "Validation failed",
            page: p,
          },
          { status: 400 },
        );
      }

      updates.push(
        prisma.page.update({
          where: { id: Number(page.number_id) },
          data: {
            parent_id: page.number_parent_id,
            published: page.checkbox_published,
            titre: page.text_titre ?? "",
            slug: page.text_slug ?? "",
            page_position: page.number_page_position ?? 0,
            langue: page.text_langue ?? "fr_FR",
            blocs: JSON.stringify(page.blocs),
            updatedAt: new Date(),
          },
        }),
      );
    }

    const result = await prisma.$transaction(updates);

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Bulk update failed" }, { status: 500 });
  }
}
