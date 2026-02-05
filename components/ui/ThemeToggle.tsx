"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark";
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove(
      theme === "dark" ? "light" : "dark",
    );
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      aria-label={theme === "dark" ? "mode nuit" : "mode jour"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer fixed  top-[70px] right-0 z-10 p-2 rounded"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
