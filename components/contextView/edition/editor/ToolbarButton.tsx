// ============================================
// components/editor/ToolbarButton.tsx (VERSION MISE À JOUR)
// ============================================
import { ReactNode } from "react";

interface ToolbarButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  icon: ReactNode;
  alt: string;
  label?: string;
}

export const ToolbarButton = ({
  onClick,
  disabled = false,
  isActive = false,
  icon,
  alt,
  label,
}: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center gap-1 p-2 rounded hover:bg-gray-100 transition-colors ${
      isActive ? "bg-blue-100 text-blue-600" : ""
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    title={alt}
  >
    {icon}
    {label && <span className="text-sm">{label}</span>}
  </button>
);
