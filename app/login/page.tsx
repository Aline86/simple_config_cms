"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { callLogin } from "./callPage";

export default function Page() {
  const [text_email, setEmail] = useState("");
  const [text_password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call your API route to authenticate
    const res = await callLogin(text_email, text_password);

    if (res) {
      // Redirect to protected page
      router.push("/edition/pages");
    } else {
      setError("Connexion impossible");
    }
  };

  return (
    <body className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="p-8  rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Se connecter</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">E-mail</label>
        <input
          type="email"
          className="w-full  p-2 rounded mb-4"
          value={text_email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <label className="block mb-2">Mot de passe</label>
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
          aria-label="Se connecter"
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Se connecter
        </button>
      </form>
    </body>
  );
}
