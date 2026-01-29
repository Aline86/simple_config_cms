"use client";

import { Plus, Save } from "lucide-react";

import { PageObject } from "@/model/Page";
import { useEffect, useState } from "react";
import PageBlocs from "./pageComponent";
import { reorderArray } from "@/helpers/changeComponentPosition";
import { BlocObject } from "@/model/Bloc";
import { cloneBlocWithMedias } from "@/helpers/bloc.helper";
import { clonePageWithBlocs } from "@/helpers/page.helper";
import BlocChoiceModal from "@/components/modals/PageChoiceModal";
import { CreateBlocOptions, createNewBloc } from "@/lib/factories/Bloc.factory";

export default function PageClient({
  initialpage,
}: {
  initialpage: PageObject;
}) {
  const [page, setPage] = useState(new PageObject(initialpage));
  const [dragged, setDragged] = useState<BlocObject | null>(null);
  const [draggableEnabled, setDraggableEnabled] = useState(false);

  const onDragStart = (bloc: BlocObject) => {
    if (bloc !== null) {
      setDragged(bloc);
    }
  };

  const onDrop = (target: BlocObject) => {
    if (!dragged) return;

    setPage((prev) => {
      if (!prev) return prev;

      // Recréer des MediaObject propres avec les bonnes positions
      const reordered = reorderArray(
        prev.blocs,
        dragged,
        target,
        "bloc_position",
      );

      return clonePageWithBlocs(prev, reordered);
    });

    setDragged(null);
  };
  const addBlocToPage = (options: CreateBlocOptions) => {
    const bloc = createNewBloc(options);

    setPage((prevPage) =>
      clonePageWithBlocs(prevPage, [...prevPage.blocs, bloc]),
    );
  };

  const updateBloc = (updatedBloc: BlocObject) => {
    setPage((prevPage) => {
      const newBlocs = prevPage.blocs.map((bloc) =>
        bloc.id === updatedBloc.id ? updatedBloc : bloc,
      );
      const up = clonePageWithBlocs(prevPage, newBlocs);

      return up;
    });
  };
  const handleSavePage = async () => {
    try {
      console.log("pages", page);
      const res = await fetch("/api/edition/page", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: page,
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'enregistrement");
      }

      const result = await res.json();
      console.log("result", result);
      if (result !== undefined) {
        setPage(new PageObject(result.blocs));
      }

      console.log("Page enregistrée :", result);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemove = (model: BlocObject) => {
    setPage((prev) => {
      if (!prev || !prev.blocs?.length) return prev;
      const filteredImages = prev.blocs.filter((img) => img.id !== model.id);

      return clonePageWithBlocs(prev, filteredImages);
    });
  };

  return (
    <div className="p-6 space-y-6">
      {page !== undefined && (
        <div>
          <BlocChoiceModal page={page} addBlocToPage={addBlocToPage} />
          <button
            onClick={() => handleSavePage()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-600 transition"
          >
            <Save size={14} /> Enregistrer les pages
          </button>
        </div>
      )}

      <PageBlocs
        page_data={page}
        updateBloc={updateBloc}
        onDelete={handleRemove}
        onDragStart={onDragStart}
        onDrop={onDrop}
        draggableEnabled={draggableEnabled}
      />
    </div>
  );
}
