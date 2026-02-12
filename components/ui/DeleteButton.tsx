import { useState } from "react";
import { BlocObject } from "../../database/model/Bloc";

interface DeleteButtonProps {
  bloc: BlocObject;
  onDelete: (bloc: BlocObject) => void;
  size?: "sm" | "md" | "lg";
}

export function DeleteButton({
  bloc,
  onDelete,
  size = "md",
}: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const handleDelete = () => {
    onDelete(bloc);
    setShowConfirm(false);
  };

  return (
    <>
      <button
        onClick={() => {
          setShowConfirm(true);
        }}
        className={
          `block` +
          sizes[size] +
          `absolute border border-red-500 cursor-pointer  mt-4 ml-36 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-red-500 text-slate-600 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md group`
        }
        aria-label="Supprimer"
      >
        <svg
          className={
            iconSizes[size] +
            `transition-transform duration-200 group-hover:scale-110 hover:bg-white`
          }
          fill="none"
          stroke="red"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      {/* Modal de confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Confirmer la suppression
            </h3>
            <p className="text-slate-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cet élément ?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                aria-label="Annuler"
                onClick={() => {
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors duration-200"
              >
                Annuler
              </button>
              <button
                aria-label="Supprimer"
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors duration-200"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
