import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function GET() {
  try {
    const dbPage = await prisma.page.findFirst({
      where: { checkbox_home_page: true },
    });

    return NextResponse.json(dbPage, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }
}
