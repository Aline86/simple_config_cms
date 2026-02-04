import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { verifyUser } from "../../../../repositories/user/user";

export async function POST(req: NextRequest) {
  try {
    //  AJOUT : Vérifier que JWT_SECRET existe au démarrage
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error(
        "CRITICAL: JWT_SECRET is not defined in environment variables",
      );
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { text_email, text_password } = body;

    //  AJOUT : Validation des champs requis
    if (!text_email || !text_password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    //  AJOUT : Validation basique du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text_email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    //  AJOUT : Validation de la longueur du mot de passe
    if (text_password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Vérification de l'utilisateur
    const user = await verifyUser(text_email, text_password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    //  AJOUT : Vérifier que user a les champs attendus
    if (!user.number_id || !user.text_email || !user.text_name) {
      console.error("User object missing required fields:", user);
      return NextResponse.json(
        { error: "Server error: Invalid user data" },
        { status: 500 },
      );
    }

    // Création du token JWT
    const token = jwt.sign(
      {
        sub: user.number_id, // identifiant unique
        email: user.text_email,
      },
      jwtSecret,
      {
        expiresIn: "7d",
      },
    );

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
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return response;
  } catch (err) {
    console.error("POST /api/login error:", err);

    //  AMÉLIORATION : Gestion d'erreur plus spécifique
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 },
      );
    }

    // Erreur générique
    return NextResponse.json(
      {
        error: "Server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
