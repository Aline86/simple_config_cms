// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [text_email, setEmail] = useState("");
  const [text_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call your API route to authenticate
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text_email, text_password }),
    });

    if (res !== undefined) {
      if (res.ok) {
        // Redirect to protected page
        router.push("/edition");
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    }
  };

  return (
    <body className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="p-8  rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full  p-2 rounded mb-4"
          value={text_email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="w-full  p-2 rounded mb-4"
          value={text_password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
    </body>
  );
}
