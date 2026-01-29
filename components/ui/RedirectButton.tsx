"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LucidButtonProps {
  slug: string;
  label?: string;
  className?: string;
}

export const RedirectButton: React.FC<LucidButtonProps> = ({
  slug,
  label = "Aller à la page",
  className = "",
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/edition/page/${slug}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors duration-200 ${className}`}
    >
      {label}
    </button>
  );
};
