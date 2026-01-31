import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "../../user/route";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { text_email, text_password } = await req.json();

    const user = await verifyUser(text_email, text_password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Création de la réponse
    const response = NextResponse.json(
      {
        user: {
          number_id: user.number_id,
          text_email: user.text_email,
          text_name: user.text_name,
        },
      },
      { status: 200 },
    );

    // Création / édition du cookie
    response.cookies.set({
      name: "auth_token",
      value: jwt.sign({ userId: user.text_email }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      }), // ou un token
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
