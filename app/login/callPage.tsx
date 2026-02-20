"use client";

export async function callLogin(text_email: string, text_password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text_email, text_password }),
  });

  return res.ok;
}
