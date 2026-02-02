import { NextRequest, NextResponse } from "next/server";
import { PageObject } from "../../../../model/Page";
import { prisma } from "./../../../../lib/prisma/prisma";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "id missing" }, { status: 400 });
    }

    // Vérifier que l'id est un nombre valide
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
    }

    // Vérifier l'existence avant de supprimer
    const existingPage = await prisma.page.findUnique({
      where: { number_id: numericId },
    });

    if (!existingPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    const deletedPage = await prisma.page.delete({
      where: { number_id: numericId },
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

    // Vérifier que body.data existe
    if (!body.data) {
      return NextResponse.json({ error: "data missing" }, { status: 400 });
    }

    const rawPage = body.data;

    // Vérifier number_id
    if (!rawPage.number_id) {
      return NextResponse.json({ error: "number_id missing" }, { status: 400 });
    }

    const w = JSON.stringify(rawPage.blocs);
    rawPage.blocs = w;

    const page = new PageObject(rawPage);
    if (!page.validateAll()) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }

    const updatedPage = await prisma.page.update({
      where: { number_id: Number(rawPage.number_id) },
      data: rawPage,
    });

    return NextResponse.json(
      { message: "Page mise à jour", blocs: updatedPage },
      { status: 200 },
    );
  } catch (err) {
    console.error("PUT /api/page error:", err);

    // Gérer spécifiquement l'erreur "enregistrement non trouvé"
    if (
      err instanceof Error &&
      err.message.includes("Record to update not found")
    ) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
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

export async function GET() {
  try {
    const dbPage = await prisma.page.findFirst({
      where: { checkbox_home_page: true },
    });

    if (!dbPage) {
      return NextResponse.json(
        { error: "No home page configured" },
        { status: 404 },
      );
    }

    return NextResponse.json(dbPage, { status: 200 });
  } catch (err) {
    console.error("GET /api/home-page error:", err);

    // Distinguer les types d'erreurs si nécessaire
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
