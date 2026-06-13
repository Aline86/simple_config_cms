import { Plus, Save } from "lucide-react";
import Draggable from "./Draggable";
import LogoutButton from "./LogoutButton";
import BlocChoiceModal from "../modals/PageChoiceModal";
import { PageObject } from "../../database/model/Page";
import { CreateBlocOptions } from "../../lib/factories/Bloc.factory";
import { usePathname } from "next/navigation";
import { HeaderObject } from "../../database/model/bloc/Header";

interface NavBarEditionProps {
  logout: () => void;
  labelAdd: string;
  handleAdd: (options?: CreateBlocOptions) => void; // optionnel, si tu veux un bouton "Ajouter une page"
  setDraggableEnabled: (value: boolean) => void;
  handleSavePages: () => void;
  draggableEnabled: boolean;
  model?: PageObject;
}

export default function NavBarEdition<T>({
  logout,
  handleSavePages,
  setDraggableEnabled,
  handleAdd,
  draggableEnabled,
  labelAdd,
  model,
}: NavBarEditionProps) {
  const pathname = usePathname();
  return (
    <div className="flex justify-end items-center gap-4 fixed top-0 left-0 right-0 z-70 nav-edition p-4 shadow-lg">
      {handleAdd !== undefined && model !== undefined ? (
        <BlocChoiceModal page={model as PageObject} addBlocToPage={handleAdd} />
      ) : (
        <button
          aria-label={labelAdd}
          onClick={() => {
            handleAdd();
          }}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-700 transition"
        >
          <Plus size={16} /> {labelAdd}
        </button>
      )}
      {model !== undefined && (
        <>
          <a
            href={`${pathname}/mobile`}
            title="Voir la version mobile"
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-600 transition"
          >
            Voir la version mobile
          </a>
          <a
            title="Voir le rendu actuel"
            href={`${pathname}/preview`}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-600 transition"
          >
            Voir le rendu actuel
          </a>
          <a
            title="Pages"
            href={`/edition/pages`}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-600 transition"
          >
            Pages
          </a>
        </>
      )}
      <Draggable
        draggableEnabled={draggableEnabled}
        setDraggableEnabled={setDraggableEnabled}
      />
      <button
        onClick={handleSavePages}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-600 transition"
      >
        <Save size={14} /> Enregistrer tout le contenu
      </button>
      <LogoutButton handleOnClick={logout} />
    </div>
  );
}
