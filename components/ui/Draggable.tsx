import { Lock, Unlock } from "lucide-react";

interface CardProps {
  draggableEnabled: boolean;
  setDraggableEnabled: (value: boolean) => void;
}

export default function Draggable({
  draggableEnabled,
  setDraggableEnabled,
}: CardProps) {
  return (
    <button
      onClick={() => setDraggableEnabled(!draggableEnabled)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition
        ${
          draggableEnabled
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-slate-200 text-slate-700 hover:bg-slate-300"
        }`}
    >
      {draggableEnabled ? <Unlock size={16} /> : <Lock size={16} />}
      {draggableEnabled ? "Déplacer activé" : "Déplacer désactivé"}
    </button>
  );
}
