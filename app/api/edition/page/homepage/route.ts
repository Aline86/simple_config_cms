import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dbPage = await prisma.page.findFirst({
      where: { checkbox_home_page: true },
    });
    //
    if (!dbPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(dbPage, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Page not found" }, { status: 404 });
  }
}
