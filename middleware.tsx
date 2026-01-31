// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Lire le cookie theme

  // Créer la réponse
  const res = NextResponse.next();
  const themeCookie = req.cookies.get("theme");
  const theme = themeCookie?.value || "light"; // ✅ .value pour avoir string

  res.cookies.set("theme", theme, { path: "/", maxAge: 60 * 60 * 24 * 365 });

  // Tu peux éventuellement ajouter la classe directement (optionnel)
  // Mais Tailwind préfère qu'on mette la classe sur <html> côté RootLayout
  return res;
}

// Appliquer le middleware à toutes les routes
export const config = {
  matcher: "/", // '/' = toutes les routes
};
