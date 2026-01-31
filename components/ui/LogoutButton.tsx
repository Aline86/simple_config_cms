import { LogOut } from "lucide-react";
interface PageCrudProps {
  handleOnClick: () => void; // optionnel, si tu veux un bouton "Ajouter une page"
}

export default function LogoutButton({ handleOnClick }: PageCrudProps) {
  return (
    <button
      onClick={handleOnClick}
      className="cursor-pointer flex items-center gap-2 text-red-600 hover:text-red-700"
    >
      <LogOut size={18} />
      Déconnexion
    </button>
  );
}
