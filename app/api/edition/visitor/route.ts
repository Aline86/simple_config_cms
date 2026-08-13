import { NextRequest, NextResponse } from "next/server";
import { getVisitors } from "../../../../lib/helpers/visitors";
import { requireAuth } from "../requireAuth";

const ALLOWED = [1, 7, 30, 90, 365] as const;

export async function GET(request: NextRequest) {
  await requireAuth(request);
  const raw = Number(new URL(request.url).searchParams.get("days"));
  const days = (ALLOWED as readonly number[]).includes(raw) ? raw : 30;

  try {
    const stats = await getVisitors(days);
    return NextResponse.json({ ...stats, days });
  } catch (err) {
    console.error("[visitors]", err);
    return NextResponse.json(
      { error: "Impossible de récupérer les visites." },
      { status: 502 },
    );
  }
}
