"use server"; // server action

import bcrypt from "bcryptjs";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type SignInData = {
  email: string;
  password: string;
};

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

  // Set httpOnly cookie
  cookies().set("session", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  // Redirect or return success
  return {
    success: true,
    user: { id: user.number_id, email: user.text_email },
  };
}
