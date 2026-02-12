import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JwtPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export async function requireAuth(request: NextRequest) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("Server configuration error");
  }
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded.sub || !decoded.email) {
      throw new Error("Unauthorized");
    }

    return {
      number_id: decoded.sub,
      text_email: decoded.email,
    };
  } catch {
    throw new Error("Unauthorized");
  }
}
