import { NextResponse } from "next/server";
import { prisma } from "./../../../../../lib/prisma/prisma";

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
