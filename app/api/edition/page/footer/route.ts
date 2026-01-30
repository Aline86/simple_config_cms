import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import { PageObject } from "@/model/Page";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug missing" }, { status: 400 });
    }

    const dbPage = await prisma.page.findFirst({
      where: { text_slug: slug },
    });

    if (!dbPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(dbPage, { status: 200 });
  } catch (err) {
    console.error("GET /api/page error:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "id missing" }, { status: 400 });
    }

    const deletedPage = await prisma.page.delete({
      where: { number_id: Number(id) },
    });

    return NextResponse.json(deletedPage, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/page error:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const rawPage = body.data;
    const w = JSON.stringify(rawPage.blocs);
    rawPage.blocs = w;
    const page = new PageObject(rawPage);

    if (!page.validateAll()) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    await prisma.page.update({
      where: { number_id: Number(rawPage.number_id) },
      data: rawPage,
    });

    return NextResponse.json(
      { message: "Page mise à jour", blocs: rawPage },
      { status: 200 },
    );
  } catch (err) {
    console.error("PUT /api/page error:", err);

    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
