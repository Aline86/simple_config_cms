import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/edition")) {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return redirectToLogin(request);
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch {
      const redirect = redirectToLogin(request);
      redirect.cookies.set("auth_token", "", {
        path: "/",
        maxAge: 0,
      });
      return redirect;
    }

    // Redirection UNIQUEMENT si /edition
    if (pathname === "/edition") {
      const url = request.nextUrl.clone();
      url.pathname = "/edition/pages";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("redirect", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/edition/:path*"],
};
