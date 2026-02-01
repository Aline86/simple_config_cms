"use server"; // server action

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
export async function signin(formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const errors: Record<string, string | string[]> = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = ["Password is required"];

  if (Object.keys(errors).length) return { errors };

  // Find user in DB
  const user = await prisma.user.findUnique({
    where: { text_email: email },
  });

  if (!user) return { errors: { email: "User not found" } };

  const isValid = await bcrypt.compare(password, user.text_password);
  if (!isValid) return { errors: { password: ["Incorrect password"] } };

  // Create JWT session
  const token = jwt.sign({ userId: user.number_id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  const response = NextResponse.json({ ok: true });

  response.cookies.set("token", "123", {
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return response;

  // Redirect or return success
  return {
    success: true,
    user: { id: user.number_id, email: user.text_email },
  };
}
